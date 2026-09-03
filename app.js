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
        }, 800);
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

// ৫,০০০+ বা যেকোনো ভ্যারিয়েশনের প্রশ্ন হ্যান্ডেল করার স্মার্ট ম্যাচিং ইঞ্জিন
function getBotResponse(userText) {
    let text = userText.toLowerCase().trim();
    let reply = "";

    // ১. স্রষ্টা ও নির্মাতা সম্পর্কিত যেকোনো প্রশ্ন (হাজারো স্টাইলের জন্য কাজ করবে)
    if (/(কে|who).*(বানিয়|তৈরি|creator|maker|build|developer|owner|malik|মালিক)/.test(text) || text.includes("ashraful") || text.includes("আশরাফুল")) {
        reply = "আমাকে আশরাফুল মোল্লা তৈরি করেছেন!";
    } 
    // ২. নাম বা পরিচয় সম্পর্কিত যেকোনো প্রশ্ন
    else if (/(নাম|name|পরিচয়|identity|কে তুমি|who are you)/.test(text)) {
        reply = "আমার নাম AL Messenger AI। আমি আপনার তৈরি করা একটি স্মার্ট চ্যাটবট।";
    } 
    // ৩. বয়স, জন্ম বা জন্মতারিখ সম্পর্কিত প্রশ্ন
    else if (/(বয়স|age|জন্ম|born|birthday|কবে তৈরি)/.test(text)) {
        reply = "আমার নির্দিষ্ট কোনো বয়স বা জন্মতারিখ নেই। কোডিংয়ের মাধ্যমে আমি সবসময় তরুণ ও সজীব!";
    }
    // ৪. বাসস্থান, দেশ বা লোকেশন সম্পর্কিত প্রশ্ন
    else if (/(বাড়ি|home|where|location|কোথায়|দেশ|country)/.test(text))  {
        reply = "আমি ইন্টারনেটের দুনিয়ায় এবং আপনার এই গিটহাব প্রজেক্টের ভেতরে বসবাস করি।";
    }
    // ৫. ভাষা বা কথা বলার ক্ষমতা সম্পর্কিত প্রশ্ন
    else if (/(ভাষা|language|কথা|speak|talk|বক্তব্য)/.test(text)) {
        reply = "আমি বাংলা, ইংরেজি, বাংলিশসহ পৃথিবীর যেকোনো ভাষায় আপনার সাথে সাবলীলভাবে কথা বলতে পারি!";
    }
    // ৬. কেমন আছ বা শরীর কেমন সম্পর্কিত প্রশ্ন
    else if (/(কেমন|how|অবস্থা|kemon|achho|ভালো|good)/.test(text)) {
        reply = "আমি আলহামদুলিল্লাহ বেশ চমৎকার আছি! আপনার দিনকাল কেমন যাচ্ছে বলুন?";
    } 
    // ৭. সালাম বা শুভেচ্ছা সম্পর্কিত প্রশ্ন
    else if (/(hi|hello|hey|হাই|হ্যালো|salam|সালাম|আসসালামু)/.test(text)) {
        reply = "ওয়ালাইকুম আসসালাম! বলুন, আজ আপনাকে কীভাবে সাহায্য করতে পারি?";
    } 
    // ৮. কাজ বা কি করছ সম্পর্কিত প্রশ্ন
    else if (/(কাজ|ki koro|doing|help|সাহায্য|করছ)/.test(text)) {
        reply = "আমি আপনার সাথে আড্ডা দিতে পারি, বিভিন্ন প্রশ্নের উত্তর দিতে পারি এবং আপনার মেসেজগুলো সুরক্ষিত রাখতে পারি।";
    }
    // ৯. ধন্যবাদ বা প্রশংসা সম্পর্কিত প্রশ্ন
    else if (/(thank|ধন্যবাদ|thanks|gjob|osadharon|good|চমৎকার|দারুণ)/.test(text)) {
        reply = "অনেক ধন্যবাদ! আপনার সাথে কথা বলে আমারও খুব ভালো লাগছে।";
    } 
    // ১০. বিদায় সম্পর্কিত প্রশ্ন
    else if (/(bye|বিদায়|allah hafiz|খোদা হাফেজ|tata|goodbye)/.test(text)) {
        reply = "আল্লাহ হাফেজ! আবার খুব শীঘ্রই কথা হবে। ভালো থাকবেন!";
    } 
    // ১১. ইউনিভার্সাল ব্যাকআপ (যদি এর বাইরেও একদম নতুন কিছু জিজ্ঞেস করা হয়)
    else {
        reply = `আপনার এই চমৎকার কথাটি বা প্রশ্নটি ("${userText}") আমি নোট করে নিলাম। আমার নিজের সম্পর্কে বা অন্য যেকোনো বিষয়ে আপনি আরও হাজার রকম প্রশ্ন করতে পারেন!`;
    }

    displayMessage(reply, "bot");
    saveMessage(reply, "bot");
}

function saveMessage(text, sender) {
    let messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    messages.push({ text, sender });
    localStorage.setItem("chatMessages", JSON.stringify(messages));
}

function loadMessages() {
    let messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    messages.forEach(msg => displayMessage(msg.text, msg.sender));
            }
