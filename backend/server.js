require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { createClient } = require("@supabase/supabase-js");
const askAI = require("./services/ai");

const app = express();

app.use(cors());
app.use(express.json());

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

const upload = multer({
    storage: multer.memoryStorage()
});


// HOME
app.get("/", (req, res) => {
    res.json({
        message: "Memory Agent backend is working!"
    });
});


// TEST DATABASE
app.get("/test-database", async (req, res) => {

    const { data, error } = await supabase
        .from("documents")
        .select("*")
        .limit(5);

    if (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }

    res.json({
        success: true,
        documents: data
    });

});


// UPLOAD PDF
app.post("/upload", upload.single("file"), async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        console.log("Received:", req.file.originalname);

        const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");

        const pdf = await pdfjsLib.getDocument({
             data: new Uint8Array(req.file.buffer)
        }).promise;

        let text = "";

        for (let i = 1; i <= pdf.numPages; i++) {

            const page = await pdf.getPage(i);

            const content = await page.getTextContent();

            text += content.items
                .map(item => item.str)
                .join(" ") + "\n";
        }

        console.log("Extracted text length:", text.length);

        const { data, error } = await supabase
            .from("documents")
            .insert([
                {
                    user_id: "demo-user",
                    filename: req.file.originalname,
                    file_type: "pdf",
                    content: text
                }
            ])
            .select();

        if (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }

        res.json({
            success: true,
            message: "PDF uploaded and saved!",
            document: data[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            error: error.message
        });

    }

});


// ASK AI
app.post("/ask", async (req, res) => {

    try {

        const question = req.body.question;

        if (!question) {
            return res.status(400).json({
                success: false,
                message: "Question is required"
            });
        }

        console.log("Question:", question);

        const { data, error } = await supabase
            .from("documents")
            .select("filename, content");

        if (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }

        // Search for documents containing words from the question

        const words = question
            .toLowerCase()
            .replace(/[?.,!]/g, "")
            .split(" ")
            .filter(word => word.length > 3);

        const matchingDocuments = data.filter(document => {

            const text = document.content.toLowerCase();

            return words.some(word => text.includes(word));

        });


        // Nothing found

        if (matchingDocuments.length === 0) {

            return res.json({
                success: true,
                answer: "I couldn't find this information in your memory.",
                sources: []
            });

        }


        // Prepare information for Gemini

        let context = "";

        matchingDocuments.forEach(document => {

            context += `
SOURCE: ${document.filename}

${document.content}

--------------------
`;

        });


        // Ask Gemini

        const answer = await askAI(question, context);


        // Send answer back

        res.json({
            success: true,
            answer: answer,
            sources: matchingDocuments.map(
                document => document.filename
            )
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            error: error.message
        });

    }

});


// START SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});