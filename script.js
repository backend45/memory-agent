const API = "http://localhost:5000";

const fileInput = document.getElementById("fileInput");
const uploadButton = document.getElementById("uploadButton");
const uploadStatus = document.getElementById("uploadStatus");

const question = document.getElementById("question");
const askButton = document.getElementById("askButton");
const answer = document.getElementById("answer");


// ============================
// UPLOAD PDF
// ============================

uploadButton.addEventListener("click", async () => {

    const file = fileInput.files[0];

    if (!file) {
        uploadStatus.textContent = "Please select a PDF first.";
        return;
    }

    if (file.type !== "application/pdf") {
        uploadStatus.textContent = "Only PDF files are supported.";
        return;
    }

    const formData = new FormData();

    formData.append("file", file);

    uploadButton.disabled = true;
    uploadButton.textContent = "Uploading...";
    uploadStatus.textContent = "";

    try {

        const response = await fetch(`${API}/upload`, {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {

            uploadStatus.textContent =
                `Uploaded successfully: ${data.document.filename}`;

            fileInput.value = "";

        } else {

            uploadStatus.textContent =
                `Error: ${data.error || data.message}`;

        }

    } catch (error) {

        console.error(error);

        uploadStatus.textContent =
            "Could not connect to the backend.";

    }

    uploadButton.disabled = false;
    uploadButton.textContent = "Upload PDF";
});


// ============================
// ASK AI
// ============================

askButton.addEventListener("click", async () => {

    const userQuestion = question.value.trim();

    if (!userQuestion) {
        answer.style.display = "block";
        answer.textContent = "Please enter a question.";
        return;
    }

    askButton.disabled = true;
    askButton.textContent = "Thinking...";

    answer.style.display = "block";
    answer.textContent = "Searching your memory...";

    try {

        const response = await fetch(`${API}/ask`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                question: userQuestion
            })

        });

        const data = await response.json();

        if (!data.success) {

            answer.textContent =
                `Error: ${data.error || data.message}`;

            return;
        }


        // Sources
        let sourcesHTML = "";

        if (data.sources && data.sources.length > 0) {

            sourcesHTML = `
                <div class="sources">
                    <strong>Sources:</strong><br>
                    ${data.sources
                        .map(source => `<span class="source">${source}</span>`)
                        .join("")}
                </div>
            `;

        }


        answer.innerHTML = `
            <div class="answer-title">Answer</div>

            <div>
                ${data.answer}
            </div>

            ${sourcesHTML}
        `;

    } catch (error) {

        console.error(error);

        answer.textContent =
            "Could not connect to the backend.";

    }

    askButton.disabled = false;
    askButton.textContent = "Ask AI";
});