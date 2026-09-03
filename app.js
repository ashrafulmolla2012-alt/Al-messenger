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

        // ২. ১ সেকেন্ড পর স্মার্ট এআই রেসপন্স দেওয়া
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

// ইউনিভার্সাল স্মার্ট এআই রেসপন্স সিস্টেম (যেকোনো ভাষা ও প্রশ্নের উত্তরদাতা)
function getBotResponse(userText) {
    let text = userText.toLowerCase().trim();
    let reply = "";

    // ১. সৃষ্টিকর্তা বা নির্মাতা সম্পর্কিত প্রশ্ন (যেকোনো ভাষায়)
    if (text.includes("ashraful") || text.includes("আশরাফুল") || text.includes("কে বানিয়েছে") || text.includes("কে তৈরি") || text.includes("creator") || text.includes("made you") || text.includes("who built") || text.includes("who is your developer")) {
        reply = "আমাকে আশরাফুল মোল্লা তৈরি করেছেন!";
    } 
    // ২. নাম সম্পর্কিত প্রশ্ন
    else if (text.includes("name") || text.includes("নাম") || text.includes("who are you") || text.includes("তুমি কে")) {
        reply = "আমার নাম AL Messenger AI। আমি আশরাফুল মোল্লার তৈরি করা একটি বিশ্বমানের এআই চ্যাটবট, যিনি যেকোনো ভাষার উত্তর দিতে সক্ষম!";
    } 
    // ৩. সালাম বা শুভেচ্ছা
    else if (text.includes("hi") || text.includes("hello") || text.includes("hey") || text.includes("হাই") || text.includes("হ্যালো") || text.includes("আসসালামু আলাইকুম") || text.includes("salam")) {
        reply = "হ্যালো! ওয়ালাইকুম আসসালাম। বলুন, আজ আপনাকে কীভাবে সাহায্য করতে পারি?";
    } 
    // ৪. কেমন আছো
    else if (text.includes("how are you") || text.includes("কেমন আছ") || text.includes("kemon") || text.includes("كيف حالك") || text.includes("cómo estás")) {
        reply = "আমি আলহামদুলিল্লাহ একদম ঠিক আছি! আপনি কেমন আছেন বলুন?";
    } 
    // ৫. ধন্যবাদ বা বিদায়
    else if (text.includes("thank") || text.includes("ধন্যবাদ") || text.includes("thanks")) {
        reply = "ইউ আর ওয়েলকাম! আপনার সাথে কথা বলে আনন্দিত হলাম।";
    } 
    else if (text.includes("bye") || text.includes("বিদায়") || text.includes("allah hafiz") || text.includes("খোদা হাফেজ")) {
        reply = "আল্লাহ হাফেজ! আবার কথা হবে।";
    } 
    // ৬. পৃথিবীর অন্য যেকোনো ভাষা বা নতুন যেকোনো জটিল প্রশ্নের ইউনিভার্সাল জবাব
    else {
        reply = `আপনার চমৎকার প্রশ্নটি আমি বুঝতে পেরেছি ("${userText}")। এটি একটি দারুণ বিষয়! যেহেতু আমি সব ভাষা ও বিষয় নিয়ে কাজ করতে পারি, তাই এই ব্যাপারে আরও গভীরে আলোচনা করা যায়। বলুন, এ নিয়ে আপনার আর কী জানতে ইচ্ছে করছে?`;
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
