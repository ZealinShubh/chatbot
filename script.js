// const chatbotToggler = document.querySelector(".chatbot-toggler");
// const closeBtn = document.querySelector(".close-btn");
// const chatbox = document.querySelector(".chatbox");
// const chatInput = document.querySelector(".chat-input textarea");
// const sendChatBtn = document.querySelector(".chat-input span");

// let userMessage = null; // Variable to store user's message
// const inputInitHeight = chatInput.scrollHeight;

// const createChatLi = (message, className) => {
//     // Create a chat <li> element with passed message and className
//     const chatLi = document.createElement("li");
//     chatLi.classList.add("chat", `${className}`);
//     let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
//     chatLi.innerHTML = chatContent;
//     chatLi.querySelector("p").textContent = message;
//     return chatLi; // return chat <li> element
// }


// const handleChat = () => {
//     userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
//     if(!userMessage) return;

//     // Clear the input textarea and set its height to default
//     chatInput.value = "";
//     chatInput.style.height = `${inputInitHeight}px`;

//     // Append the user's message to the chatbox
//     chatbox.appendChild(createChatLi(userMessage, "outgoing"));
//     chatbox.scrollTo(0, chatbox.scrollHeight);

//     // Display "Thinking..." message while waiting for the response
//     const incomingChatLi = createChatLi("Thinking...", "incoming");
//     chatbox.appendChild(incomingChatLi);
//     chatbox.scrollTo(0, chatbox.scrollHeight);

//     // Use requestAnimationFrame to execute the code before the next repaint
//     requestAnimationFrame(() => {
//         generateResponse(incomingChatLi);
//     });

// }

// chatInput.addEventListener("input", () => {
//     // Adjust the height of the input textarea based on its content
//     chatInput.style.height = `${inputInitHeight}px`;
//     chatInput.style.height = `${chatInput.scrollHeight}px`;
// });

// chatInput.addEventListener("keydown", (e) => {
//     // If Enter key is pressed without Shift key and the window 
//     // width is greater than 800px, handle the chat
//     if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
//         e.preventDefault();
//         handleChat();
//     }
// });

// sendChatBtn.addEventListener("click", handleChat);
// closeBtn.addEventListener("click", () => {document.body.classList.remove("show-chatbot");
// console.log("hello")});
// chatbotToggler.addEventListener("click", () => {document.body.classList.toggle("show-chatbot");
// console.log("Mohit")});

// const chatbot = document.querySelector(".chatbot");
// const startChatBtn = document.getElementById("startChatBtn");
// const usernameInput = document.getElementById("username");

// let username = ""; // Variable to store the username

// const handleStartChat = () => {
//     username = usernameInput.value.trim(); // Get the entered username
//     if (!username) return;

//     chatbox.scrollTo(0, chatbox.scrollHeight);

//     // Hide user info section and show the chat input
//     document.querySelector(".user-info").style.display = "none";
//     document.querySelector(".chat-input").style.display = "flex";

// };

// startChatBtn.addEventListener("click", handleStartChat);

// const generateResponse = (chatElement) => {
//     const API_URL = "https://api.openai.com/v1/chat/completions";
//     const messageElement = chatElement.querySelector("p");
  
//     const requestOptions = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${API_KEY}`
//       },
//       body: JSON.stringify({
//         model: "gpt-3.5-turbo",
//         messages: [
//           { role: "system", content: "You are a helpful assistant." },
//           { role: "user", content: userMessage }
//         ],
//       }),
//     };
  
//     fetch(API_URL, requestOptions)
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then((data) => {
//         if (data && data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content) {
//           messageElement.textContent = data.choices[0].message.content.trim();
//         } else {
//           throw new Error("Invalid response format from the API");
//         }
//       })
//       .catch((error) => {
//         console.error("API Error:", error);
//         messageElement.classList.add("error");
//         messageElement.textContent = "Oops! Something went wrong. Please try again.";
//       })
//       .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
//   };

//   var currentUrl = window.location.href;
//   var domain = new URL(currentUrl).hostname;
//   document.getElementById('url').value = domain;


//M Y CODE HERE
const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const backBtn = document.querySelector(".back-btn");

let userMessage = null;
const API_KEY = "";
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

const showUserInfo = () => {
    document.querySelector(".user-info").style.display = "flex";
    document.querySelector(".chat-input").style.display = "none";
    backBtn.style.display = "none";
};

const showChatInput = () => {
    document.querySelector(".user-info").style.display = "none";
    document.querySelector(".chat-input").style.display = "flex";
    backBtn.style.display = "inline";
};

backBtn.style.display = "none"; // Initially hide the back button

backBtn.addEventListener("click", showUserInfo);

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    const incomingChatLi = createChatLi("Thinking...", "incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);

    requestAnimationFrame(() => {
        generateResponse(incomingChatLi);
    });
}

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => {
    document.body.classList.remove("show-chatbot");
    showUserInfo();
});

chatbotToggler.addEventListener("click", () => {
    document.body.classList.toggle("show-chatbot");
    console.log("Mohit");
});

const chatbot = document.querySelector(".chatbot");
const startChatBtn = document.getElementById("startChatBtn");
const usernameInput = document.getElementById("username");

let username = "";

const handleStartChat = () => {
    username = usernameInput.value.trim();
    if (!username) return;

    chatbox.scrollTo(0, chatbox.scrollHeight);

    showChatInput();
};

startChatBtn.addEventListener("click", handleStartChat);

const generateResponse = (chatElement) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = chatElement.querySelector("p");

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: userMessage }
            ],
        }),
    };

    fetch(API_URL, requestOptions)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            if (data && data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content) {
                messageElement.textContent = data.choices[0].message.content.trim();
            } else {
                throw new Error("Invalid response format from the API");
            }
        })
        .catch((error) => {
            console.error("API Error:", error);
            messageElement.classList.add("error");
            messageElement.textContent = "Oops! Something went wrong. Please try again.";
        })
        .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
};

var currentUrl = window.location.href;
var domain = new URL(currentUrl).hostname;
document.getElementById('url').value = domain;
