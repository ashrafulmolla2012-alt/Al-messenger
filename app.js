// পেজ লোড হলে সেভ থাকা মেসেজগুলো দেখানো
document.addEventListener("DOMContentLoaded", loadMessages);

function sendMsg() {
    let input = document.getElementById("msgInput");
    let messageText = input.value.trim();
    
    if (messageText !== "") {
        displayMessage(messageText, "user");
        saveMessage(messageText, "user");
        input.value = "";

        // জেমিনি এপিআই কল করা
        getAIResponse(messageText);
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

// জেমিনি এপিআই কানেকশন
async function getAIResponse(userText) {
    const apiKey = "AQ.Ab8RN6Ic2AGhgkBp8gqfvER6OS2L1iD3_5y9zBPTkcVBBfkpmg"; 
    
    // আপডেট ও সঠিক জেমিনি মডেল এন্ডপয়েন্ট
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const prompt = `You are AL Messenger AI, a smart assistant created by Ashraful Molla (আশরাফুল মোল্লা). Answer this user query naturally in Bengali/English: ${userText}`;

    try {
        let response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        let data = await response.json();
        
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            let botReply = data.candidates[0].content.parts[0].text;
            displayMessage(botReply, "bot");
            saveMessage(botReply, "bot");
        } else {
            displayMessage("দুঃখিত, সঠিক উত্তর পাওয়া যায়নি। আবার চেষ্টা করুন।", "bot");
        }

    } catch (error) {
        displayMessage("দুঃখিত, এই মুহূর্তে উত্তর দিতে সমস্যা হচ্ছে। ইন্টারনেট কানেকশন চেক করুন।", "bot");
    }
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

// চ্যাট ক্লিয়ার বা ডিলিট করার ফাংশন
function clearChat() {
    localStorage.removeItem("chatMessages");
    document.getElementById("chatBox").innerHTML = "";
                            }
