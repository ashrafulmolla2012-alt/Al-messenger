document.addEventListener("DOMContentLoaded", loadMessages);

function sendMsg() {
    let input = document.getElementById("msgInput");
    let messageText = input.value.trim();
    
    if (messageText !== "") {
        displayMessage(messageText, "user");
        saveMessage(messageText, "user");
        input.value = "";
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

async function getAIResponse(userText) {
    const apiKey = "AQ.Ab8RN6JL65yvvNUgw97oXmTZU8XspVcnms-T05_eB8adeqHe9w"; 
    
    // নতুন AQ কি-র জন্য অথরাইজেশন হেডার সহ সঠিক এন্ডপয়েন্ট
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`;

    const prompt = `You are AL Messenger AI, a smart assistant created by Ashraful Molla (আশরাফুল মোল্লা). Answer this user query naturally in Bengali/English: ${userText}`;

    try {
        let response = await fetch(apiUrl, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
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
            console.error("API Error Response:", data);
            displayMessage("দুঃখিত, সঠিক উত্তর পাওয়া যায়নি। আবার চেষ্টা করুন।", "bot");
        }

    } catch (error) {
        console.error("Fetch Error:", error);
        displayMessage("দুঃখিত, এই মুহূর্তে উত্তর দিতে সমস্যা হচ্ছে। ইন্টারনেট কানেকশন চেক করুন।", "bot");
    }
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

function clearChat() {
    localStorage.removeItem("chatMessages");
    document.getElementById("chatBox").innerHTML = "";
            }
                
