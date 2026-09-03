// পেজ লোড হলে সেভ থাকা মেসেজগুলো দেখানো
document.addEventListener("DOMContentLoaded", loadMessages);

function sendMsg() {
    let input = document.getElementById("msgInput");
    let messageText = input.value.trim();
    
    if (messageText !== "") {
        displayMessage(messageText, "user");
        saveMessage(messageText, "user");
        input.value = "";

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

// একদম নিখুঁত ও স্মার্ট উত্তর দেওয়ার ইঞ্জিন
function getBotResponse(userText) {
    let text = userText.toLowerCase().trim();
    let reply = "";

    // ১. নির্মাতা সম্পর্কিত প্রশ্ন
    if (text.includes("ashraful") || text.includes("আশরাফুল") || text.includes("কে বানিয়েছে") || text.includes("কে তৈরি") || text.includes("maker") || text.includes("creator") || text.includes("made you")) {
        reply = "আমাকে আশরাফুল মোল্লা তৈরি করেছেন!";
    } 
    // ২. নাম সম্পর্কিত প্রশ্ন (বাংলা ও বাংলিশ)
    else if (text.includes("nam ki") || text.includes("name") || text.includes("নাম কি") || text.includes("তোমার নাম") || text.includes("who are you") || text.includes("তুমি কে")) {
        reply = "আমার নাম AL Messenger AI।";
    } 
    // ৩. বয়স বা জন্ম সম্পর্কিত প্রশ্ন
    else if (text.includes("বয়স") || text.includes("boyos") || text.includes("age") || text.includes("কবে তৈরি") || text.includes("জন্ম")) {
        reply = "আমি সবেমাত্র আপনার তৈরি করা একটি নতুন এআই। আমার নির্দিষ্ট কোনো বয়স নেই!";
    }
    // ৪. কেমন আছ
    else if (text.includes("kemon") || text.includes("कैसा है") || text.includes("how are you") || text.includes("কেমন আছো") || text.includes("কেমন আছেন")) {
        reply = "আমি আলহামদুলিল্লাহ খুব ভালো আছি! আপনি কেমন আছেন?";
    } 
    // ৫. সালাম বা শুভেচ্ছা
    else if (text.includes("hi") || text.includes("hello") || text.includes("hey") || text.includes("হাই") || text.includes("হ্যালো") || text.includes("আসসালামু আলাইকুম") || text.includes("salam")) {
        reply = "ওয়ালাইকুম আসসালাম! বলুন, আপনাকে কীভাবে সাহায্য করতে পারি?";
    } 
    // ৬. কেমন চলছে / কী করো
    else if (text.includes("ki koro") || text.includes("কী করো") || text.includes("what are you doing")) {
        reply = "এই তো আপনার সাথে কথা বলছি এবং আপনার মেসেজ নিয়ে ভাবছি!";
    }
    // ৭. ধন্যবাদ বা বিদায়
    else if (text.includes("thank") || text.includes("ধন্যবাদ") || text.includes("thanks")) {
        reply = "ইউ আর ওয়েলকাম!";
    } 
    else if (text.includes("bye") || text.includes("বিদায়") || text.includes("allah hafiz") || text.includes("খোদা হাফেজ")) {
        reply = "আল্লাহ হাফেজ! আবার কথা হবে।";
    } 
    // ৮. যদি কোনো সাধারণ শব্দ বা ছোট অক্ষর দেন (যেমন আগের স্ক্রিনশটে 'To', 'Ti' দেখা গেছে)
    else if (text.length <= 3) {
        reply = "বুঝেছি! আরও কিছু বলতে পারেন?";
    }
    // ৯. একদম অজানা কিছু হলে সাধারণ একটি ছোট উত্তর
    else {
        reply = "আপনার এই কথাটি এই মুহূর্তে আমার ডেটাবেজে নেই, তবে আমি এটি শেখার চেষ্টা করব!";
    }

    displayMessage(reply, "bot");
    saveMessage(reply, "bot");
}

// মেসেজ সেভ করে রাখার ফাংশন
function saveMessage(text, sender) {
    let messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    messages.push({ text, sender });
    localStorage.setItem("JSON.stringify(messages)", JSON.stringify(messages)); // safe format
    localStorage.setItem("chatMessages", JSON.stringify(messages));
}

// আগে সেভ হওয়া মেসেজ লোড করা
function loadMessages() {
    let messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    messages.forEach(msg => displayMessage(msg.text, msg.sender));
}
