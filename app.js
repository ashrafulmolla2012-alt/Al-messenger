// পেজ লোড হলে সেভ থাকা মেসেজগুলো দেখানো
document.addEventListener("DOMContentLoaded", loadMessages);

function sendMsg() {
    let input = document.getElementById("msgInput");
    let messageText = input.value.trim();
    
    if (messageText !== "") {
        // ১. মেসেজ স্ক্রিনে দেখানো ও সেভ করা
        displayMessage(messageText, "user");
        saveMessage(messageText, "user");
        input.value = "";

        // ২. ১ সেকেন্ড পর অটো-রিপ্লাই দেওয়া
        setTimeout(() => {
            getBotResponse(messageText);
        }, 1000);
    }
}

function displayMessage(text, sender) {
    let chatBox = document.getElementById("chatBox");
    let messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.innerText = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// অটো-রিপ্লাই সেট করা
function getBotResponse(userText) {
    let text = userText.toLowerCase();
    let reply = "আমি আপনার কথাটি বুঝতে পারিনি।";

    if (text.includes("hi") || text.includes("হাই") || text.includes("হ্যালো")) {
        reply = "হ্যালো! AL Messenger-এ আপনাকে স্বাগতম। কেমন আছেন?";
    } else if (text.includes("কেমন আছো") || text.includes("কেমন আছেন")) {
        reply = "আমি ভালো আছি! আপনি কেমন আছেন?";
    } else if (text.includes("নাম কি")) {
        reply = "আমার নাম AL Messenger AI!";
    }

    displayMessage(reply, "bot");
    saveMessage(reply, "bot");
}

// মেসেজ সেভ করে রাখার ফাংশন
function saveMessage(text, sender) {
    let messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    messages.push({ text, sender });
    localStorage.setItem("chatMessages", JSON.stringify(messages));
}

// আগে সেভ হওয়া মেসেজ লোড করা
function loadMessages() {
    let messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    messages.forEach(msg => displayMessage(msg.text, msg.sender));
}
