// ============================================================
// MEMORY AI — COMPLETE FUNCTIONAL JAVASCRIPT
// ============================================================


// ============================================================
// MAIN PAGE SETUP
// ============================================================

const main = document.querySelector(".main");

const originalMainContent = main.innerHTML;


// ============================================================
// SIDEBAR
// ============================================================

const sidebarItems =
  document.querySelectorAll(".sidebar-item");

const newMemoryBtn =
  document.querySelector(".new-btn");


// ============================================================
// FILE STORAGE
// ============================================================

let savedFiles =
  JSON.parse(
    localStorage.getItem("memoryAI_files")
  ) || [

    {
      name: "College Notice",
      type: "PDF",
      size: "2.4 MB"
    },

    {
      name: "Project Notes",
      type: "DOCX",
      size: "840 KB"
    },

    {
      name: "WhatsApp Screenshot",
      type: "IMG",
      size: "1.1 MB"
    }

  ];


let currentFile = 0;


// ============================================================
// LANGUAGE SYSTEM
// ============================================================

let currentLanguage =
  localStorage.getItem("memoryAI_language") || "en";

let isTranslating = false;


// ============================================================
// HINDI TRANSLATIONS
// ============================================================

const translations = {

  // SIDEBAR

  "New Memory":
    "नई मेमोरी",

  "Workspace":
    "वर्कस्पेस",

  "Memory Chat":
    "मेमोरी चैट",

  "My Files":
    "मेरी फाइलें",

  "Saved Answers":
    "सहेजे गए उत्तर",

  "Collections":
    "कलेक्शन",

  "College":
    "कॉलेज",

  "Projects":
    "प्रोजेक्ट्स",

  "Personal":
    "व्यक्तिगत",

  "My Workspace":
    "मेरा वर्कस्पेस",

  "Personal Memory":
    "व्यक्तिगत मेमोरी",


  // TOP BAR

  "Upgrade":
    "अपग्रेड",

  "Get Started":
    "शुरू करें",


  // HERO

  "✦ YOUR PERSONAL KNOWLEDGE ASSISTANT":
    "✦ आपका व्यक्तिगत ज्ञान सहायक",

  "YOUR PERSONAL KNOWLEDGE ASSISTANT":
    "आपका व्यक्तिगत ज्ञान सहायक",

  "Everything you know,":
    "आप जो कुछ भी जानते हैं,",

  "in one place.":
    "एक ही जगह पर।",

  "Upload your documents, notes and screenshots.":
    "अपने दस्तावेज़, नोट्स और स्क्रीनशॉट अपलोड करें।",

  "Ask questions and find the information you need":
    "सवाल पूछें और अपनी ज़रूरत की जानकारी खोजें",

  "without searching through everything yourself.":
    "बिना हर चीज़ को खुद खोजे।",


  // MEMORY CARD

  "Chat":
    "चैट",

  "Summary":
    "सारांश",

  "Files":
    "फाइलें",

  "Insights":
    "जानकारियां",

  "Ask your memory anything":
    "अपनी मेमोरी से कुछ भी पूछें",

  "Drop your files here":
    "अपनी फाइलें यहां डालें",

  "upload":
    "अपलोड करें",

  "documents":
    "दस्तावेज़",

  "PDF · DOCX · TXT · Images":
    "PDF · DOCX · TXT · इमेज",

  "Ask something about your information...":
    "अपनी जानकारी के बारे में पूछें...",

  "✦ Source-backed answers":
    "✦ स्रोत-आधारित उत्तर",

  "Source-backed answers":
    "स्रोत-आधारित उत्तर",

  "Ask Memory →":
    "मेमोरी से पूछें →",


  // INFO CARDS

  "Search everything":
    "सब कुछ खोजें",

  "Find information instantly":
    "जानकारी तुरंत खोजें",

  "Source backed":
    "स्रोत आधारित",

  "Know where every answer came from":
    "जानें हर उत्तर कहां से आया",

  "Smart memory":
    "स्मार्ट मेमोरी",

  "Understand context across files":
    "फाइलों के बीच संदर्भ समझें",


  // RECENT FILES

  "Recently added":
    "हाल ही में जोड़ी गई फाइलें",

  "Your information at a glance.":
    "आपकी जानकारी एक नज़र में।",

  "View all →":
    "सभी देखें →",


  // SAMPLE ANSWER

  "SOURCE-BACKED MEMORY":
    "स्रोत-आधारित मेमोरी",

  "Example answer":
    "उदाहरण उत्तर",

  "✓ Verified":
    "✓ सत्यापित",

  "Verified":
    "सत्यापित",

  "Your first semester payment deadline is":
    "आपके पहले सेमेस्टर की फीस भुगतान की अंतिम तारीख है",

  "Page 2 · Payment Information":
    "पेज 2 · भुगतान जानकारी",


  // FILES PAGE

  "← Back to Memory Chat":
    "← मेमोरी चैट पर वापस जाएं",

  "Back to Memory Chat":
    "मेमोरी चैट पर वापस जाएं",

  "My Files":
    "मेरी फाइलें",

  "Your saved documents and files":
    "आपके सहेजे गए दस्तावेज़ और फाइलें",

  "All Files":
    "सभी फाइलें",

  "Open File":
    "फाइल खोलें",

  "Delete File":
    "फाइल हटाएं",

  "Delete":
    "हटाएं",

  "Cancel":
    "रद्द करें",

  "Are you sure?":
    "क्या आप सुनिश्चित हैं?",

  "Are you sure you want to delete this file?":
    "क्या आप वाकई इस फाइल को हटाना चाहते हैं?",

  "This action cannot be undone.":
    "इस कार्रवाई को वापस नहीं किया जा सकता।",

  "No files yet":
    "अभी कोई फाइल नहीं है",

  "Upload a document from Memory Chat.":
    "मेमोरी चैट से कोई दस्तावेज़ अपलोड करें।",


  // SAVED ANSWERS

  "Your important answers in one place":
    "आपके महत्वपूर्ण उत्तर एक ही जगह पर",

  "Your saved answer will appear here.":
    "आपका सहेजा गया उत्तर यहां दिखाई देगा।",

  "Important Notes":
    "महत्वपूर्ण नोट्स",

  "Useful information that you want to remember later.":
    "उपयोगी जानकारी जिसे आप बाद में याद रखना चाहते हैं।",

  "View Answer →":
    "उत्तर देखें →",

  "Important answers saved from Memory Chat conversations.":
    "मेमोरी चैट की बातचीत से सहेजे गए महत्वपूर्ण उत्तर।",


  // COLLEGE

  "Your college documents and study materials.":
    "आपके कॉलेज के दस्तावेज़ और अध्ययन सामग्री।",

  "Important college announcements and notices.":
    "महत्वपूर्ण कॉलेज घोषणाएं और नोटिस।",

  "Your study notes and academic information.":
    "आपके अध्ययन नोट्स और शैक्षणिक जानकारी।",

  "Useful resources for your college work.":
    "आपके कॉलेज के काम के लिए उपयोगी संसाधन।",


  // PROJECTS

  "Your projects, ideas and development work.":
    "आपके प्रोजेक्ट, विचार और विकास कार्य।",

  "Your MemoryAI hackathon project.":
    "आपका MemoryAI हैकाथॉन प्रोजेक्ट।",

  "Ideas, tasks and development notes.":
    "विचार, कार्य और विकास नोट्स।",

  "Project tasks and things to complete.":
    "प्रोजेक्ट के कार्य और पूरी की जाने वाली चीज़ें।",


  // PERSONAL

  "Your personal notes and information.":
    "आपके व्यक्तिगत नोट्स और जानकारी।",

  "Information you want to keep safe.":
    "वह जानकारी जिसे आप सुरक्षित रखना चाहते हैं।",

  "Things you want MemoryAI to remember.":
    "वे चीज़ें जिन्हें आप MemoryAI से याद रखना चाहते हैं।",


  // GENERAL

  "Open →":
    "खोलें →",

  "Select Language":
    "भाषा चुनें",

  "English":
    "अंग्रेज़ी",

  "हिन्दी":
    "हिन्दी"

};


// ============================================================
// TEXT TRANSLATION ENGINE
// ============================================================

function translateTextNode(node, language) {

  const original =
    node.nodeValue.trim();

  if (!original) {
    return;
  }


  // Don't translate language menu

  if (
    node.parentElement &&
    node.parentElement.closest(
      "#languageDropdown"
    )
  ) {

    return;

  }


  // Don't translate custom delete modal automatically
  // because its text is controlled separately.

  if (
    node.parentElement &&
    node.parentElement.closest(
      "#deleteConfirmModal"
    )
  ) {

    return;

  }


  if (language === "hi") {

    if (translations[original]) {

      const leading =
        node.nodeValue.match(/^\s*/)?.[0] || "";

      const trailing =
        node.nodeValue.match(/\s*$/)?.[0] || "";

      node.nodeValue =
        leading +
        translations[original] +
        trailing;

    }

  }

}


// ============================================================
// STORE ORIGINAL TEXT
// ============================================================

function storeOriginalText() {

  document
    .querySelectorAll("body *")
    .forEach(element => {

      if (
        !element.dataset.originalText &&
        element.children.length === 0
      ) {

        const text =
          element.textContent.trim();

        if (text) {

          element.dataset.originalText =
            text;

        }

      }

    });

}


// ============================================================
// TRANSLATE ENTIRE WEBSITE
// ============================================================

function translateEntirePage(language) {

  if (isTranslating) {
    return;
  }


  isTranslating = true;

  currentLanguage =
    language;


  localStorage.setItem(
    "memoryAI_language",
    language
  );


  // --------------------------------------------------------
  // ENGLISH
  // --------------------------------------------------------

  if (language === "en") {

    restoreEnglishPage();

  }


  // --------------------------------------------------------
  // HINDI
  // --------------------------------------------------------

  else {

    storeOriginalText();


    const walker =
      document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT
      );


    const nodes = [];

    let node;


    while (
      node = walker.nextNode()
    ) {

      nodes.push(node);

    }


    nodes.forEach(
      textNode => {

        translateTextNode(
          textNode,
          "hi"
        );

      }
    );


    // Translate placeholders

    document
      .querySelectorAll(
        "textarea, input"
      )
      .forEach(
        element => {

          if (
            !element.dataset.originalPlaceholder
          ) {

            element.dataset.originalPlaceholder =
              element.placeholder;

          }


          const original =
            element.dataset.originalPlaceholder;


          if (
            translations[original]
          ) {

            element.placeholder =
              translations[original];

          }

        }
      );

  }


  updateLanguageButton();


  // Update custom delete modal if it is open

  if (
    document.getElementById(
      "deleteConfirmModal"
    )
  ) {

    updateDeleteModalLanguage();

  }


  setTimeout(
    () => {

      isTranslating = false;

    },
    100
  );

}


// ============================================================
// RESTORE ENGLISH
// ============================================================

function restoreEnglishPage() {

  document
    .querySelectorAll(
      "[data-originalText]"
    )
    .forEach(
      element => {

        if (
          element.children.length === 0
        ) {

          element.textContent =
            element.dataset.originalText;

        }

      }
    );


  document
    .querySelectorAll(
      "textarea, input"
    )
    .forEach(
      element => {

        if (
          element.dataset.originalPlaceholder
        ) {

          element.placeholder =
            element.dataset.originalPlaceholder;

        }

      }
    );

}


// ============================================================
// LANGUAGE BUTTON
// ============================================================

function updateLanguageButton() {

  const button =
    document.querySelector(
      ".language"
    );


  if (!button) {
    return;
  }


  button.textContent =
    currentLanguage === "hi"
      ? "HI⌄"
      : "EN⌄";

}


// ============================================================
// LANGUAGE DROPDOWN
// ============================================================

function openLanguageDropdown() {

  const oldMenu =
    document.getElementById(
      "languageDropdown"
    );


  if (oldMenu) {

    oldMenu.remove();

    return;

  }


  const menu =
    document.createElement(
      "div"
    );


  menu.id =
    "languageDropdown";


  menu.innerHTML = `

    <div class="language-heading">
      भाषा चुनें
    </div>

    <button id="englishLanguage">

      <span>
        🇬🇧 English
      </span>

      <span class="language-check">
        ${
          currentLanguage === "en"
            ? "✓"
            : ""
        }
      </span>

    </button>


    <button id="hindiLanguage">

      <span>
        🇮🇳 हिन्दी
      </span>

      <span class="language-check">
        ${
          currentLanguage === "hi"
            ? "✓"
            : ""
        }
      </span>

    </button>

  `;


  document.body.appendChild(
    menu
  );


  // ENGLISH

  document
    .getElementById(
      "englishLanguage"
    )
    .addEventListener(
      "click",
      () => {

        translateEntirePage(
          "en"
        );

        menu.remove();

      }
    );


  // HINDI

  document
    .getElementById(
      "hindiLanguage"
    )
    .addEventListener(
      "click",
      () => {

        translateEntirePage(
          "hi"
        );

        menu.remove();

      }
    );

}


// ============================================================
// CONNECT EN BUTTON
// ============================================================

const languageButton =
  document.querySelector(
    ".language"
  );


if (languageButton) {

  languageButton.addEventListener(
    "click",
    openLanguageDropdown
  );

}


// ============================================================
// LANGUAGE DROPDOWN CSS
// ============================================================

const languageStyle =
  document.createElement(
    "style"
  );


languageStyle.textContent = `

  #languageDropdown {

    position: fixed;

    top: 78px;

    right: 125px;

    width: 220px;

    background: #ffffff;

    border: 1px solid #ead9d7;

    border-radius: 15px;

    padding: 9px;

    box-shadow:
      0 15px 40px
      rgba(37, 9, 2, 0.18);

    z-index: 999999;

    transform-origin: top center;

    animation:
      languageDrop
      0.28s
      ease-out;

  }


  @keyframes languageDrop {

    0% {

      opacity: 0;

      transform:
        translateY(-18px)
        scaleY(0.85);

    }

    100% {

      opacity: 1;

      transform:
        translateY(0)
        scaleY(1);

    }

  }


  .language-heading {

    padding:
      10px 12px;

    color: #806c6c;

    font-size: 11px;

    font-weight: 700;

    text-transform:
      uppercase;

  }


  #languageDropdown button {

    width: 100%;

    border: none;

    background: #ffffff;

    padding:
      13px 12px;

    border-radius: 9px;

    display: flex;

    align-items: center;

    justify-content:
      space-between;

    cursor: pointer;

    font-size: 15px;

    text-align: left;

  }


  #languageDropdown button:hover {

    background: #f8eeee;

    color: #800e13;

  }


  .language-check {

    color: #800e13;

    font-weight: 700;

  }


  @media (max-width: 700px) {

    #languageDropdown {

      right: 20px;

      top: 70px;

    }

  }

`;


document.head.appendChild(
  languageStyle
);


// ============================================================
// SIDEBAR FUNCTIONALITY
// ============================================================

sidebarItems.forEach(
  item => {

    item.addEventListener(
      "click",
      () => {

        sidebarItems.forEach(
          i => {

            i.classList.remove(
              "active"
            );

          }
        );


        item.classList.add(
          "active"
        );


        const name =
          item.textContent.trim();


        // MEMORY CHAT

        if (
          name.includes("Memory Chat") ||
          name.includes("मेमोरी चैट")
        ) {

          backToChat();

        }


        // MY FILES

        else if (
          name.includes("My Files") ||
          name.includes("मेरी फाइलें")
        ) {

          openMyFiles();

        }


        // SAVED ANSWERS

        else if (
          name.includes("Saved Answers") ||
          name.includes("सहेजे गए उत्तर")
        ) {

          openSavedAnswers();

        }


        // COLLEGE

        else if (
          name.includes("College") ||
          name.includes("कॉलेज")
        ) {

          openCollection(
            "College"
          );

        }


        // PROJECTS

        else if (
          name.includes("Projects") ||
          name.includes("प्रोजेक्ट्स")
        ) {

          openCollection(
            "Projects"
          );

        }


        // PERSONAL

        else if (
          name.includes("Personal") ||
          name.includes("व्यक्तिगत")
        ) {

          openCollection(
            "Personal"
          );

        }

      }
    );

  }
);


// ============================================================
// NEW MEMORY BUTTON
// ============================================================

if (newMemoryBtn) {

  newMemoryBtn.addEventListener(
    "click",
    () => {

      backToChat();

    }
  );

}


// ============================================================
// MAIN CHAT FUNCTIONALITY
// ============================================================

// Convert source names returned by backend into a small display string.
function sourcesForDisplay(sources) {

  if (!Array.isArray(sources) || sources.length === 0) {
    return "No source available";
  }

  const uniqueSources = [
    ...new Set(sources)
  ];

  return uniqueSources.length === 1
    ? "Source document"
    : `${uniqueSources.length} source documents`;

}


function setupMainButtons() {

  const tabs =
    document.querySelectorAll(
      ".memory-tab"
    );


  const fileInput =
    document.querySelector(
      'input[type="file"]'
    );


  const askBtn =
    document.querySelector(
      ".ask-btn"
    );


  const chatInput =
    document.querySelector(
      "textarea"
    );


  // TABS

  tabs.forEach(
    tab => {

      tab.addEventListener(
        "click",
        () => {

          tabs.forEach(
            t => {

              t.classList.remove(
                "active"
              );

            }
          );


          tab.classList.add(
            "active"
          );

        }
      );

    }
  );


  // FILE UPLOAD — CONNECTED TO BACKEND

  if (fileInput) {

    fileInput.addEventListener(
      "change",
      async () => {

        if (fileInput.files.length === 0) {
          return;
        }

        const files = Array.from(fileInput.files);

        for (const file of files) {

          // Backend currently supports PDF uploads.
          if (!file.name.toLowerCase().endsWith(".pdf")) {
            alert(
              currentLanguage === "hi"
                ? "अभी केवल PDF फाइलें अपलोड की जा सकती हैं।"
                : "Currently, only PDF files can be uploaded."
            );
            continue;
          }

          try {

            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch(
              "http://localhost:5000/upload",
              {
                method: "POST",
                body: formData
              }
            );

            const result = await response.json();

            if (!response.ok || !result.success) {
              throw new Error(
                result.error ||
                result.message ||
                "Upload failed"
              );
            }

            // Keep the frontend file list updated.
            let size;

            if (file.size < 1024 * 1024) {
              size =
                Math.max(
                  1,
                  Math.round(file.size / 1024)
                ) + " KB";
            } else {
              size =
                (file.size / (1024 * 1024)).toFixed(1) +
                " MB";
            }

            savedFiles.push({
              name: file.name,
              type: "PDF",
              size: size
            });

            localStorage.setItem(
              "memoryAI_files",
              JSON.stringify(savedFiles)
            );

            alert(
              currentLanguage === "hi"
                ? `${file.name} सफलतापूर्वक अपलोड हो गई!`
                : `${file.name} uploaded successfully!`
            );

          } catch (error) {

            console.error("Upload error:", error);

            alert(
              currentLanguage === "hi"
                ? `अपलोड असफल: ${error.message}`
                : `Upload failed: ${error.message}`
            );

          }

        }

        fileInput.value = "";

      }
    );

  }


  // ASK MEMORY — CONNECTED TO BACKEND

  if (
    askBtn &&
    chatInput
  ) {

    askBtn.addEventListener(
      "click",
      async () => {

        const question =
          chatInput.value.trim();

        if (!question) {

          alert(
            currentLanguage === "hi"
              ? "कृपया पहले एक सवाल लिखें।"
              : "Please enter a question first."
          );

          return;
        }

        // Prevent double-clicks while AI is answering.
        askBtn.disabled = true;
        const originalButtonText = askBtn.textContent;
        askBtn.textContent =
          currentLanguage === "hi"
            ? "सोच रहा है..."
            : "Thinking...";

        try {

          const response = await fetch(
            "http://localhost:5000/ask",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                question: question
              })
            }
          );

          const result = await response.json();

          if (!response.ok || !result.success) {
            throw new Error(
              result.error ||
              result.message ||
              "AI request failed"
            );
          }

          // Put the real AI answer into the existing answer section.
          const answerSection =
            document.querySelector(".answer-section");

          if (answerSection) {

            const answerHeading =
              answerSection.querySelector(
                ".answer-content h3"
              );

            const answerParagraph =
              answerSection.querySelector(
                ".answer-content p"
              );

            const sourceCard =
              answerSection.querySelector(
                ".source-card"
              );

            const sourceName =
              sourceCard?.querySelector(
                "strong"
              );

            const sourceDetails =
              sourceCard?.querySelector(
                "span"
              );

            if (answerHeading) {
              answerHeading.textContent =
                "MemoryAI Answer";
            }

            if (answerParagraph) {
              answerParagraph.textContent =
                result.answer || "No answer returned.";
            }

            if (sourceName) {
              const sources =
                Array.isArray(result.sources)
                  ? [...new Set(result.sources)]
                  : [];

              sourceName.textContent =
                sources.length
                  ? sources.join(", ")
                  : "No source";
            }

            if (sourceDetails) {
              sourceDetails.textContent =
                sourcesForDisplay(result.sources);
            }

            answerSection.scrollIntoView({
              behavior: "smooth",
              block: "center"
            });

          } else {

            // Fallback if the answer section is not present.
            alert(result.answer);

          }

        } catch (error) {

          console.error("Ask error:", error);

          alert(
            currentLanguage === "hi"
              ? `AI से जवाब नहीं मिला: ${error.message}`
              : `Could not get AI answer: ${error.message}`
          );

        } finally {

          askBtn.disabled = false;
          askBtn.textContent = originalButtonText;

        }

      }
    );

  }


}


// ============================================================
// MY FILES PAGE
// ============================================================

function openMyFiles() {

  main.innerHTML = `

    <div class="files-page">

      <div class="files-header">

        <button id="backBtn">
          ← Back to Memory Chat
        </button>

        <h1>
          My Files
        </h1>

        <p>
          Your saved documents and files
        </p>

      </div>


      <div class="file-slider">

        <button
          class="slide-btn"
          id="previousBtn"
          title="Previous file"
        >
          ←
        </button>


        <div
          class="file-display"
          id="fileDisplay"
        ></div>


        <button
          class="slide-btn"
          id="nextBtn"
          title="Next file"
        >
          →
        </button>

      </div>


      <div
        class="file-counter"
        id="fileCounter"
      ></div>


      <div class="all-files">

        <h2>
          All Files
        </h2>

        <div id="fileList"></div>

      </div>

    </div>

  `;


  addPageStyles();


  // If current index is too large

  if (
    currentFile >= savedFiles.length
  ) {

    currentFile =
      Math.max(
        0,
        savedFiles.length - 1
      );

  }


  showFile(
    currentFile
  );


  document
    .getElementById("backBtn")
    .addEventListener(
      "click",
      backToChat
    );


  document
    .getElementById("previousBtn")
    .addEventListener(
      "click",
      () => {

        if (
          savedFiles.length === 0
        ) {

          return;

        }


        currentFile--;


        if (
          currentFile < 0
        ) {

          currentFile =
            savedFiles.length - 1;

        }


        showFile(
          currentFile
        );

      }
    );


  document
    .getElementById("nextBtn")
    .addEventListener(
      "click",
      () => {

        if (
          savedFiles.length === 0
        ) {

          return;

        }


        currentFile++;


        if (
          currentFile >=
          savedFiles.length
        ) {

          currentFile = 0;

        }


        showFile(
          currentFile
        );

      }
    );


  applyCurrentLanguage();

}


// ============================================================
// CUSTOM DELETE CONFIRMATION MODAL
// ============================================================

function showDeleteConfirmation(
  fileName,
  onConfirm
) {

  // Remove existing modal if one somehow exists

  const existingModal =
    document.getElementById(
      "deleteConfirmModal"
    );


  if (existingModal) {

    existingModal.remove();

  }


  // ----------------------------------------------------------
  // CREATE MODAL
  // ----------------------------------------------------------

  const modal =
    document.createElement(
      "div"
    );


  modal.id =
    "deleteConfirmModal";


  modal.innerHTML = `

    <div
      class="delete-modal-overlay"
      id="deleteModalOverlay"
    >

      <div
        class="delete-modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="deleteModalTitle"
      >

        <div class="delete-modal-icon">
          🗑
        </div>


        <h2 id="deleteModalTitle">
          Are you sure?
        </h2>


        <p class="delete-modal-file">
          ${escapeHTML(fileName)}
        </p>


        <p class="delete-modal-description">
          Are you sure you want to delete this file?
        </p>


        <p class="delete-modal-warning">
          This action cannot be undone.
        </p>


        <div class="delete-modal-actions">

          <button
            class="delete-cancel-btn"
            id="deleteCancelBtn"
          >
            Cancel
          </button>


          <button
            class="delete-confirm-btn"
            id="deleteConfirmBtn"
          >
            🗑 Delete File
          </button>

        </div>

      </div>

    </div>

  `;


  document.body.appendChild(
    modal
  );


  // ----------------------------------------------------------
  // ELEMENTS
  // ----------------------------------------------------------

  const overlay =
    document.getElementById(
      "deleteModalOverlay"
    );


  const cancelButton =
    document.getElementById(
      "deleteCancelBtn"
    );


  const confirmButton =
    document.getElementById(
      "deleteConfirmBtn"
    );


  // ----------------------------------------------------------
  // CLOSE MODAL
  // ----------------------------------------------------------

  function closeModal() {

    modal.classList.add(
      "closing"
    );


    setTimeout(
      () => {

        modal.remove();

      },
      180
    );

  }


  // ----------------------------------------------------------
  // CANCEL
  // ----------------------------------------------------------

  cancelButton.addEventListener(
    "click",
    () => {

      closeModal();

    }
  );


  // ----------------------------------------------------------
  // CONFIRM DELETE
  // ----------------------------------------------------------

  confirmButton.addEventListener(
    "click",
    () => {

      closeModal();

      setTimeout(
        () => {

          onConfirm();

        },
        180
      );

    }
  );


  // ----------------------------------------------------------
  // CLICK OUTSIDE
  // ----------------------------------------------------------

  overlay.addEventListener(
    "click",
    event => {

      if (
        event.target === overlay
      ) {

        closeModal();

      }

    }
  );


  // ----------------------------------------------------------
  // ESCAPE KEY
  // ----------------------------------------------------------

  function escapeHandler(event) {

    if (
      event.key === "Escape"
    ) {

      closeModal();

      document.removeEventListener(
        "keydown",
        escapeHandler
      );

    }

  }


  document.addEventListener(
    "keydown",
    escapeHandler
  );


  // ----------------------------------------------------------
  // LANGUAGE
  // ----------------------------------------------------------

  updateDeleteModalLanguage();

}


// ============================================================
// ESCAPE HTML
// ============================================================

function escapeHTML(value) {

  const div =
    document.createElement(
      "div"
    );


  div.textContent =
    value;


  return div.innerHTML;

}


// ============================================================
// UPDATE DELETE MODAL LANGUAGE
// ============================================================

function updateDeleteModalLanguage() {

  const modal =
    document.getElementById(
      "deleteConfirmModal"
    );


  if (!modal) {

    return;

  }


  const title =
    document.getElementById(
      "deleteModalTitle"
    );


  const description =
    modal.querySelector(
      ".delete-modal-description"
    );


  const warning =
    modal.querySelector(
      ".delete-modal-warning"
    );


  const cancel =
    document.getElementById(
      "deleteCancelBtn"
    );


  const confirm =
    document.getElementById(
      "deleteConfirmBtn"
    );


  if (
    currentLanguage === "hi"
  ) {

    if (title) {

      title.textContent =
        "क्या आप सुनिश्चित हैं?";

    }


    if (description) {

      description.textContent =
        "क्या आप वाकई इस फाइल को हटाना चाहते हैं?";

    }


    if (warning) {

      warning.textContent =
        "इस कार्रवाई को वापस नहीं किया जा सकता।";

    }


    if (cancel) {

      cancel.textContent =
        "रद्द करें";

    }


    if (confirm) {

      confirm.textContent =
        "🗑 फाइल हटाएं";

    }

  }

  else {

    if (title) {

      title.textContent =
        "Are you sure?";

    }


    if (description) {

      description.textContent =
        "Are you sure you want to delete this file?";

    }


    if (warning) {

      warning.textContent =
        "This action cannot be undone.";

    }


    if (cancel) {

      cancel.textContent =
        "Cancel";

    }


    if (confirm) {

      confirm.textContent =
        "🗑 Delete File";

    }

  }

}


// ============================================================
// DELETE FILE FUNCTION
// ============================================================

function deleteFile(index) {

  if (
    index < 0 ||
    index >= savedFiles.length
  ) {

    return;

  }


  const file =
    savedFiles[index];


  // ----------------------------------------------------------
  // CUSTOM WEBSITE MODAL
  // ----------------------------------------------------------

  showDeleteConfirmation(
    file.name,
    () => {

      // ------------------------------------------------------
      // REMOVE FILE
      // ------------------------------------------------------

      savedFiles.splice(
        index,
        1
      );


      // ------------------------------------------------------
      // SAVE UPDATED FILES
      // ------------------------------------------------------

      localStorage.setItem(
        "memoryAI_files",
        JSON.stringify(
          savedFiles
        )
      );


      // ------------------------------------------------------
      // FIX CURRENT SLIDESHOW INDEX
      // ------------------------------------------------------

      if (
        savedFiles.length === 0
      ) {

        currentFile = 0;

      }

      else if (
        index < currentFile
      ) {

        currentFile--;

      }

      else if (
        currentFile >=
        savedFiles.length
      ) {

        currentFile =
          savedFiles.length - 1;

      }


      // ------------------------------------------------------
      // REFRESH FILE DISPLAY
      // ------------------------------------------------------

      showFile(
        currentFile
      );

    }
  );

}


// ============================================================
// SHOW CURRENT FILE
// ============================================================

function showFile(index) {

  const display =
    document.getElementById(
      "fileDisplay"
    );


  if (!display) {
    return;
  }


  // ==========================================================
  // EMPTY STATE
  // ==========================================================

  if (
    savedFiles.length === 0
  ) {

    display.innerHTML = `

      <div class="empty-files">

        <div>
          📁
        </div>

        <h2>
          No files yet
        </h2>

        <p>
          Upload a document from Memory Chat.
        </p>

      </div>

    `;


    const counter =
      document.getElementById(
        "fileCounter"
      );


    if (counter) {

      counter.textContent =
        "0 / 0";

    }


    const list =
      document.getElementById(
        "fileList"
      );


    if (list) {

      list.innerHTML = "";

    }


    applyCurrentLanguage();

    return;

  }


  // ==========================================================
  // SAFETY CHECK
  // ==========================================================

  if (
    index < 0 ||
    index >= savedFiles.length
  ) {

    index = 0;

    currentFile = 0;

  }


  const file =
    savedFiles[index];


  // ==========================================================
  // MAIN FILE CARD
  // ==========================================================

  display.innerHTML = `

    <div class="big-file-icon">
      ${escapeHTML(file.type)}
    </div>

    <h2>
      ${escapeHTML(file.name)}
    </h2>

    <p>
      ${escapeHTML(file.type)} · ${escapeHTML(file.size)}
    </p>


    <div class="file-action-buttons">

      <button
        class="open-file-btn"
        id="openCurrentFile"
      >
        Open File
      </button>


      <button
        class="delete-file-btn"
        id="deleteCurrentFile"
        title="Delete File"
        aria-label="Delete File"
      >
        🗑
      </button>

    </div>

  `;


  // ==========================================================
  // COUNTER
  // ==========================================================

  const counter =
    document.getElementById(
      "fileCounter"
    );


  if (counter) {

    counter.textContent =
      `${index + 1} / ${savedFiles.length}`;

  }


  // ==========================================================
  // OPEN FILE
  // ==========================================================

  const openButton =
    document.getElementById(
      "openCurrentFile"
    );


  if (openButton) {

    openButton.addEventListener(
      "click",
      event => {

        event.stopPropagation();


        alert(
          currentLanguage === "hi"
            ? `यह डेमो फाइल है:\n${file.name}`
            : `This is a demo file:\n${file.name}`
        );

      }
    );

  }


  // ==========================================================
  // DELETE CURRENT FILE
  // ==========================================================

  const deleteCurrentButton =
    document.getElementById(
      "deleteCurrentFile"
    );


  if (deleteCurrentButton) {

    deleteCurrentButton.addEventListener(
      "click",
      event => {

        event.stopPropagation();


        deleteFile(
          index
        );

      }
    );

  }


  // ==========================================================
  // FILE LIST
  // ==========================================================

  const list =
    document.getElementById(
      "fileList"
    );


  if (!list) {
    return;
  }


  list.innerHTML = "";


  savedFiles.forEach(
    (item, i) => {

      const card =
        document.createElement(
          "div"
        );


      card.className =
        "small-file-card";


      card.innerHTML = `

        <div class="small-file-icon">
          ${escapeHTML(item.type)}
        </div>


        <div class="small-file-info">

          <strong>
            ${escapeHTML(item.name)}
          </strong>

          <span>
            ${escapeHTML(item.size)}
          </span>

        </div>


        <button
          class="small-delete-btn"
          title="Delete File"
          aria-label="Delete File"
        >
          🗑
        </button>

      `;


      // ------------------------------------------------------
      // CLICK CARD = SHOW FILE
      // ------------------------------------------------------

      card.addEventListener(
        "click",
        () => {

          currentFile = i;

          showFile(
            i
          );

          applyCurrentLanguage();

        }
      );


      // ------------------------------------------------------
      // DELETE BUTTON
      // ------------------------------------------------------

      const deleteButton =
        card.querySelector(
          ".small-delete-btn"
        );


      deleteButton.addEventListener(
        "click",
        event => {

          event.stopPropagation();


          deleteFile(
            i
          );

        }
      );


      list.appendChild(
        card
      );

    }
  );


  applyCurrentLanguage();

}


// ============================================================
// SAVED ANSWERS
// ============================================================

function openSavedAnswers() {

  main.innerHTML = `

    <div class="files-page">

      <div class="files-header">

        <button id="savedBackBtn">
          ← Back to Memory Chat
        </button>

        <h1>
          Saved Answers
        </h1>

        <p>
          Your important answers in one place
        </p>

      </div>


      <div class="answer-cards">

        <div class="answer-card">

          <div class="answer-icon">
            ✦
          </div>

          <div>

            <h2>
              Example answer
            </h2>

            <p>
              Your saved answer will appear here.
            </p>

            <button class="view-btn">
              View Answer →
            </button>

          </div>

        </div>


        <div class="answer-card">

          <div class="answer-icon">
            ✓
          </div>

          <div>

            <h2>
              Important Notes
            </h2>

            <p>
              Useful information that you want to remember later.
            </p>

            <button class="view-btn">
              View Answer →
            </button>

          </div>

        </div>

      </div>

    </div>

  `;


  addPageStyles();


  document
    .getElementById(
      "savedBackBtn"
    )
    .addEventListener(
      "click",
      backToChat
    );


  applyCurrentLanguage();

}


// ============================================================
// COLLECTION PAGES
// ============================================================

function openCollection(
  collectionName
) {

  let description = "";

  let items = [];


  // ==========================================================
  // COLLEGE
  // ==========================================================

  if (
    collectionName === "College"
  ) {

    description =
      "Your college documents and study materials.";


    items = [

      {
        icon: "PDF",

        title:
          "College Notice",

        text:
          "Important college announcements and notices."
      },

      {
        icon: "DOC",

        title:
          "Semester Notes",

        text:
          "Your study notes and academic information."
      },

      {
        icon: "📚",

        title:
          "Study Material",

        text:
          "Useful resources for your college work."
      }

    ];

  }


  // ==========================================================
  // PROJECTS
  // ==========================================================

  if (
    collectionName === "Projects"
  ) {

    description =
      "Your projects, ideas and development work.";


    items = [

      {
        icon: "PRO",

        title:
          "Hackathon Project",

        text:
          "Your MemoryAI hackathon project."
      },

      {
        icon: "DOC",

        title:
          "Project Notes",

        text:
          "Ideas, tasks and development notes."
      },

      {
        icon: "✓",

        title:
          "Tasks",

        text:
          "Project tasks and things to complete."
      }

    ];

  }


  // ==========================================================
  // PERSONAL
  // ==========================================================

  if (
    collectionName === "Personal"
  ) {

    description =
      "Your personal notes and information.";


    items = [

      {
        icon: "TXT",

        title:
          "Personal Notes",

        text:
          "Your personal notes and information."
      },

      {
        icon: "★",

        title:
          "Important",

        text:
          "Information you want to keep safe."
      },

      {
        icon: "✓",

        title:
          "To Remember",

        text:
          "Things you want MemoryAI to remember."
      }

    ];

  }


  // ==========================================================
  // CREATE PAGE
  // ==========================================================

  main.innerHTML = `

    <div class="files-page">

      <div class="files-header">

        <button id="collectionBackBtn">
          ← Back to Memory Chat
        </button>

        <h1>
          ${collectionName}
        </h1>

        <p>
          ${description}
        </p>

      </div>


      <div class="collection-cards">

        ${items.map(
          item => `

          <div class="collection-card">

            <div class="collection-icon">
              ${item.icon}
            </div>

            <div>

              <h2>
                ${item.title}
              </h2>

              <p>
                ${item.text}
              </p>

              <button class="view-btn">
                Open →
              </button>

            </div>

          </div>

        `
        ).join("")}

      </div>

    </div>

  `;


  addPageStyles();


  document
    .getElementById(
      "collectionBackBtn"
    )
    .addEventListener(
      "click",
      backToChat
    );


  applyCurrentLanguage();

}


// ============================================================
// BACK TO MEMORY CHAT
// ============================================================

function backToChat() {

  // Close modal if somehow still open

  const modal =
    document.getElementById(
      "deleteConfirmModal"
    );


  if (modal) {

    modal.remove();

  }


  main.innerHTML =
    originalMainContent;


  sidebarItems.forEach(
    item => {

      item.classList.remove(
        "active"
      );

    }
  );


  if (sidebarItems[0]) {

    sidebarItems[0]
      .classList.add(
        "active"
      );

  }


  setupMainButtons();

  applyCurrentLanguage();

}


// ============================================================
// APPLY CURRENT LANGUAGE TO NEW PAGE
// ============================================================

function applyCurrentLanguage() {

  setTimeout(
    () => {

      if (
        currentLanguage === "hi"
      ) {

        translateEntirePage(
          "hi"
        );

      }

      else {

        updateLanguageButton();

      }

    },
    30
  );

}


// ============================================================
// OBSERVE NEW CONTENT
// ============================================================

const languageObserver =
  new MutationObserver(
    () => {

      if (
        currentLanguage === "hi" &&
        !isTranslating
      ) {

        setTimeout(
          () => {

            translateEntirePage(
              "hi"
            );

          },
          30
        );

      }

    }
  );


languageObserver.observe(
  document.body,
  {
    childList: true,
    subtree: true
  }
);


// ============================================================
// PAGE DESIGN
// ============================================================

function addPageStyles() {

  if (
    document.getElementById(
      "memoryFunctionalStyles"
    )
  ) {

    return;

  }


  const style =
    document.createElement(
      "style"
    );


  style.id =
    "memoryFunctionalStyles";


  style.textContent = `

    /* =========================================
       GENERAL PAGE
       ========================================= */

    .files-page {

      min-height: 100vh;

      padding: 50px;

      background: #fffaf9;

    }


    .files-header {

      text-align: center;

      margin-bottom: 40px;

    }


    .files-header h1 {

      font-size: 48px;

      margin:
        20px 0 10px;

    }


    .files-header p {

      color: #806c6c;

      font-size: 16px;

    }


    /* =========================================
       BACK BUTTON
       ========================================= */

    #backBtn,
    #savedBackBtn,
    #collectionBackBtn {

      border:
        1px solid #ead9d7;

      background: white;

      padding:
        12px 20px;

      border-radius: 10px;

      cursor: pointer;

      font-size: 14px;

      transition:
        0.2s;

    }


    #backBtn:hover,
    #savedBackBtn:hover,
    #collectionBackBtn:hover {

      background: #800e13;

      color: white;

    }


    /* =========================================
       FILE SLIDESHOW
       ========================================= */

    .file-slider {

      display: flex;

      align-items: center;

      justify-content: center;

      gap: 30px;

      max-width: 900px;

      margin: auto;

    }


    .file-display {

      width: 600px;

      min-height: 350px;

      background: white;

      border:
        1px solid #ead9d7;

      border-radius: 20px;

      box-shadow:
        0 15px 40px
        rgba(
          37,
          9,
          2,
          0.08
        );

      display: flex;

      flex-direction: column;

      align-items: center;

      justify-content: center;

      text-align: center;

      padding: 40px;

      animation:
        fileSlide
        0.3s ease;

    }


    @keyframes fileSlide {

      from {

        opacity: 0;

        transform:
          translateX(20px);

      }

      to {

        opacity: 1;

        transform:
          translateX(0);

      }

    }


    /* =========================================
       FILE ICON
       ========================================= */

    .big-file-icon {

      background: #800e13;

      color: white;

      padding: 25px;

      border-radius: 15px;

      font-weight: bold;

      font-size: 20px;

      margin-bottom: 20px;

    }


    .file-display h2 {

      margin:
        10px;

      word-break:
        break-word;

    }


    .file-display p {

      color: #806c6c;

    }


    /* =========================================
       FILE ACTION BUTTONS
       ========================================= */

    .file-action-buttons {

      display: flex;

      align-items: center;

      justify-content: center;

      gap: 12px;

      margin-top: 15px;

    }


    /* =========================================
       OPEN FILE
       ========================================= */

    .open-file-btn {

      background: #800e13;

      color: white;

      border: none;

      padding:
        12px 25px;

      border-radius: 10px;

      cursor: pointer;

      transition:
        0.2s;

    }


    .open-file-btn:hover {

      background: #640d14;

      transform:
        translateY(-2px);

    }


    /* =========================================
       MAIN DELETE BUTTON
       ========================================= */

    .delete-file-btn {

      width: 46px;

      height: 46px;

      border: none;

      border-radius: 10px;

      background: #f8eeee;

      color: #800e13;

      font-size: 20px;

      cursor: pointer;

      display: flex;

      align-items: center;

      justify-content: center;

      transition:
        0.2s;

    }


    .delete-file-btn:hover {

      background: #800e13;

      color: white;

      transform:
        scale(1.08);

    }


    /* =========================================
       SLIDER BUTTONS
       ========================================= */

    .slide-btn {

      width: 55px;

      height: 55px;

      border-radius: 50%;

      border:
        1px solid #ead9d7;

      background: white;

      cursor: pointer;

      font-size: 25px;

      transition:
        0.2s;

    }


    .slide-btn:hover {

      background: #800e13;

      color: white;

      transform:
        scale(1.08);

    }


    /* =========================================
       FILE COUNTER
       ========================================= */

    .file-counter {

      text-align: center;

      margin: 20px;

      color: #806c6c;

    }


    /* =========================================
       ALL FILES
       ========================================= */

    .all-files {

      max-width: 900px;

      margin: 60px auto;

    }


    .all-files h2 {

      margin-bottom: 20px;

    }


    #fileList {

      display: grid;

      grid-template-columns:
        repeat(
          auto-fit,
          minmax(
            250px,
            1fr
          )
        );

      gap: 15px;

    }


    /* =========================================
       SMALL FILE CARD
       ========================================= */

    .small-file-card {

      background: white;

      border:
        1px solid #ead9d7;

      border-radius: 12px;

      padding: 18px;

      display: flex;

      align-items: center;

      gap: 15px;

      cursor: pointer;

      transition:
        0.2s;

    }


    .small-file-card:hover {

      transform:
        translateY(-3px);

      box-shadow:
        0 8px 20px
        rgba(
          37,
          9,
          2,
          0.07
        );

    }


    .small-file-card strong {

      display: block;

      margin-bottom: 5px;

      word-break:
        break-word;

    }


    .small-file-card span {

      color: #806c6c;

      font-size: 13px;

    }


    .small-file-info {

      flex: 1;

      min-width: 0;

    }


    .small-file-icon {

      background: #f8eeee;

      color: #800e13;

      padding:
        12px 8px;

      border-radius: 8px;

      font-size: 11px;

      font-weight: bold;

      flex-shrink: 0;

    }


    /* =========================================
       SMALL DELETE BUTTON
       ========================================= */

    .small-delete-btn {

      width: 38px;

      height: 38px;

      border: none;

      border-radius: 9px;

      background: #f8eeee;

      color: #800e13;

      cursor: pointer;

      font-size: 17px;

      display: flex;

      align-items: center;

      justify-content: center;

      flex-shrink: 0;

      transition:
        0.2s;

    }


    .small-delete-btn:hover {

      background: #800e13;

      color: white;

      transform:
        scale(1.08);

    }


    /* =========================================
       DELETE CONFIRMATION MODAL
       ========================================= */

    #deleteConfirmModal {

      position: fixed;

      inset: 0;

      z-index: 9999999;

      display: flex;

      align-items: center;

      justify-content: center;

      pointer-events: auto;

    }


    /* DARK TRANSPARENT BACKGROUND */

    .delete-modal-overlay {

      position: fixed;

      inset: 0;

      background:
        rgba(
          37,
          9,
          2,
          0.58
        );

      backdrop-filter:
        blur(5px);

      -webkit-backdrop-filter:
        blur(5px);

      display: flex;

      align-items: center;

      justify-content: center;

      padding: 20px;

      animation:
        deleteOverlayIn
        0.2s
        ease-out;

    }


    /* MODAL CARD */

    .delete-modal-card {

      width: 100%;

      max-width: 430px;

      background: #fffaf9;

      border:
        1px solid #ead9d7;

      border-radius: 22px;

      padding: 32px;

      text-align: center;

      box-shadow:
        0 25px 80px
        rgba(
          37,
          9,
          2,
          0.30
        );

      animation:
        deleteModalIn
        0.25s
        cubic-bezier(
          0.2,
          0.8,
          0.2,
          1.2
        );

    }


    /* MODAL ICON */

    .delete-modal-icon {

      width: 64px;

      height: 64px;

      margin:
        0 auto 18px;

      border-radius: 18px;

      background: #f8eeee;

      color: #800e13;

      display: flex;

      align-items: center;

      justify-content: center;

      font-size: 28px;

      box-shadow:
        inset 0 0 0 1px
        #ead9d7;

    }


    /* MODAL TITLE */

    .delete-modal-card h2 {

      margin:
        0 0 12px;

      color: #250902;

      font-size: 25px;

      font-weight: 800;

    }


    /* FILE NAME */

    .delete-modal-file {

      display: inline-block;

      max-width: 100%;

      margin:
        0 auto 16px;

      padding:
        9px 14px;

      border-radius: 10px;

      background: #f8eeee;

      color: #800e13;

      font-size: 14px;

      font-weight: 700;

      word-break:
        break-word;

    }


    /* DESCRIPTION */

    .delete-modal-description {

      color: #38040e;

      font-size: 15px;

      line-height: 1.5;

      margin:
        4px 0 7px;

    }


    /* WARNING */

    .delete-modal-warning {

      color: #806c6c;

      font-size: 13px;

      margin:
        0 0 25px;

    }


    /* MODAL BUTTONS */

    .delete-modal-actions {

      display: flex;

      justify-content: center;

      align-items: center;

      gap: 12px;

    }


    .delete-cancel-btn,
    .delete-confirm-btn {

      min-height: 46px;

      border-radius: 11px;

      padding:
        11px 20px;

      font-size: 14px;

      font-weight: 700;

      cursor: pointer;

      transition:
        0.2s ease;

    }


    /* CANCEL */

    .delete-cancel-btn {

      background: white;

      color: #38040e;

      border:
        1px solid #ead9d7;

    }


    .delete-cancel-btn:hover {

      background: #f8eeee;

      border-color:
        #d9bdb9;

      transform:
        translateY(-2px);

    }


    /* DELETE */

    .delete-confirm-btn {

      background: #800e13;

      color: white;

      border:
        1px solid #800e13;

      box-shadow:
        0 8px 20px
        rgba(
          128,
          14,
          19,
          0.20
        );

    }


    .delete-confirm-btn:hover {

      background: #640d14;

      border-color:
        #640d14;

      transform:
        translateY(-2px);

      box-shadow:
        0 10px 25px
        rgba(
          128,
          14,
          19,
          0.28
        );

    }


    /* =========================================
       DELETE MODAL ANIMATIONS
       ========================================= */

    @keyframes deleteOverlayIn {

      from {

        opacity: 0;

      }

      to {

        opacity: 1;

      }

    }


    @keyframes deleteModalIn {

      from {

        opacity: 0;

        transform:
          translateY(25px)
          scale(0.94);

      }

      to {

        opacity: 1;

        transform:
          translateY(0)
          scale(1);

      }

    }


    #deleteConfirmModal.closing
    .delete-modal-overlay {

      animation:
        deleteOverlayOut
        0.18s
        ease-in
        forwards;

    }


    #deleteConfirmModal.closing
    .delete-modal-card {

      animation:
        deleteModalOut
        0.18s
        ease-in
        forwards;

    }


    @keyframes deleteOverlayOut {

      from {

        opacity: 1;

      }

      to {

        opacity: 0;

      }

    }


    @keyframes deleteModalOut {

      from {

        opacity: 1;

        transform:
          translateY(0)
          scale(1);

      }

      to {

        opacity: 0;

        transform:
          translateY(15px)
          scale(0.96);

      }

    }


    /* =========================================
       ANSWERS + COLLECTIONS
       ========================================= */

    .answer-cards,
    .collection-cards {

      max-width: 850px;

      margin: 40px auto;

      display: grid;

      grid-template-columns:
        repeat(
          auto-fit,
          minmax(
            320px,
            1fr
          )
        );

      gap: 20px;

    }


    .answer-card,
    .collection-card {

      background: white;

      border:
        1px solid #ead9d7;

      border-radius: 18px;

      padding: 25px;

      display: flex;

      gap: 20px;

      align-items:
        flex-start;

      box-shadow:
        0 10px 30px
        rgba(
          37,
          9,
          2,
          0.06
        );

      transition:
        0.2s;

    }


    .answer-card:hover,
    .collection-card:hover {

      transform:
        translateY(-4px);

    }


    .answer-icon,
    .collection-icon {

      min-width: 55px;

      height: 55px;

      border-radius: 12px;

      background: #800e13;

      color: white;

      display: flex;

      align-items: center;

      justify-content: center;

      font-weight: bold;

      font-size: 15px;

    }


    .answer-card h2,
    .collection-card h2 {

      margin:
        0 0 8px;

      font-size: 20px;

    }


    .answer-card p,
    .collection-card p {

      color: #806c6c;

      line-height: 1.5;

      margin:
        0 0 12px;

    }


    .view-btn {

      background: #800e13;

      color: white;

      border: none;

      padding:
        10px 18px;

      border-radius: 9px;

      cursor: pointer;

      margin-top: 5px;

    }


    /* =========================================
       EMPTY FILES
       ========================================= */

    .empty-files {

      text-align: center;

    }


    .empty-files div {

      font-size: 60px;

    }


    /* =========================================
       MOBILE
       ========================================= */

    @media (
      max-width: 700px
    ) {

      .files-page {

        padding: 25px;

      }


      .files-header h1 {

        font-size: 36px;

      }


      .file-slider {

        gap: 10px;

      }


      .file-display {

        width: 100%;

        min-height: 300px;

        padding: 25px;

      }


      .slide-btn {

        width: 45px;

        height: 45px;

        font-size: 20px;

      }


      .answer-cards,
      .collection-cards {

        grid-template-columns:
          1fr;

      }


      .small-file-card {

        padding: 14px;

        gap: 10px;

      }


      .small-delete-btn {

        width: 34px;

        height: 34px;

      }


      /* MOBILE DELETE MODAL */

      .delete-modal-card {

        max-width: 370px;

        padding: 25px 20px;

        border-radius: 19px;

      }


      .delete-modal-icon {

        width: 56px;

        height: 56px;

        font-size: 24px;

      }


      .delete-modal-card h2 {

        font-size: 22px;

      }


      .delete-modal-actions {

        flex-direction: column-reverse;

        width: 100%;

      }


      .delete-cancel-btn,
      .delete-confirm-btn {

        width: 100%;

      }

    }

  `;


  document.head.appendChild(
    style
  );

}


// ============================================================
// START
// ============================================================

setupMainButtons();


// ============================================================
// RESTORE HINDI IF IT WAS SELECTED EARLIER
// ============================================================

if (
  currentLanguage === "hi"
) {

  setTimeout(
    () => {

      translateEntirePage(
        "hi"
      );

    },
    300
  );

}