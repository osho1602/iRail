// Example distance table (in km)
const distances = {
    "Lucknow-Gorakhpur": 277,
    "Lucknow-Kanpur": 72,
    "Lucknow-Varanasi": 320,
    "Lucknow-Prayagraj": 200,
    "Gorakhpur-Kanpur": 349,
    "Gorakhpur-Varanasi": 255,
    "Gorakhpur-Prayagraj": 330,
    "Kanpur-Varanasi": 202,
    "Kanpur-Prayagraj": 123,
    "Varanasi-Prayagraj": 120
  };
  
  // Fine per km (example)
  const finePerKm = 2; // ₹2 per km without ticket
  
  document.getElementById("calculateBtn").addEventListener("click", function() {
    const from = document.getElementById("fromStation").value;
    const to = document.getElementById("toStation").value;
    const resultDiv = document.getElementById("result");
  
    if(from === "" || to === "") {
      resultDiv.innerHTML = "<p style='color:red;'>Please select both stations.</p>";
      return;
    }
    if(from === to) {
      resultDiv.innerHTML = "<p style='color:red;'>From and To station cannot be same.</p>";
      return;
    }
  
    // Construct key for distance table
    const key1 = `${from}-${to}`;
    const key2 = `${to}-${from}`;
    let distance = distances[key1] || distances[key2];
  
    if(!distance) {
      resultDiv.innerHTML = "<p style='color:red;'>Distance not found for selected stations.</p>";
      return;
    }
  
    const fine = distance * finePerKm;
  
    // Display result and "Pay Now" button
    resultDiv.innerHTML = `
      <p>Distance: ${distance} km</p>
      <p>Total Fine: ₹${fine}</p>
      <button id="payBtn">Pay Now</button>
    `;
  
    // Demo payment alert
    document.getElementById("payBtn").addEventListener("click", function() {
      alert(`Payment of ₹${fine} successful! Your bill has been generated.`);
    });
  });
  

  // Mouse bubble trail
document.addEventListener('mousemove', function(e){
  createBubble(e.pageX, e.pageY);
});

function createBubble(x, y){
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  bubble.style.left = (x - 5) + 'px';
  bubble.style.top = (y - 5) + 'px';
  document.body.appendChild(bubble);

  // remove bubble after animation
  setTimeout(() => {
      bubble.remove();
  }, 1000); // match with fadeOut animation
}


const chatbotIcon = document.getElementById("chatbot-icon");
const chatbotBox = document.getElementById("chatbot-box");
const chatbotInput = document.getElementById("chatbot-input");
const sendButton = document.getElementById("sendButton");
const chatMessages = document.getElementById("chatbot-messages");

// Toggle chatbox
chatbotIcon.addEventListener("click", () => {
  chatbotBox.style.display = chatbotBox.style.display === "flex" ? "none" : "flex";
  chatbotBox.style.flexDirection = "column";
  chatbotInput.focus();
});

// iRail offline responses
const iRailFAQ = {
  "train schedule": "Check train schedule: www.indianrail.gov.in / ट्रेन शेड्यूल देखें।",
  "fine": "Use iRail Fine Calculator / iRail Fine Calculator से सटीक जुर्माना देखें।",
  "tt fraud": "File TT fraud complaints in iRail Complaint section / TT फ्रॉड शिकायत दर्ज करें।",
  "complaint": "Submit complaints in iRail Complaint section / iRail Complaint सेक्शन में शिकायत दर्ज करें।",
  "contact": "Indian Railways Helpline: 139 / ईमेल: info@indianrail.gov.in",
  "emergency": "For emergencies contact railway police at 100 / आपातकालीन सहायता: रेलवे पुलिस 100।"
};

// Send message
function sendMessage() {
  const userMsg = chatbotInput.value.trim();
  if (!userMsg) return;

  addMessage(userMsg, "user");
  chatbotInput.value = '';

  let botMsg = "Sorry! I can't answer this question yet / मुझे जवाब नहीं पता।";
  for (let key in iRailFAQ) {
    if (userMsg.toLowerCase().includes(key)) {
      botMsg = iRailFAQ[key];
      break;
    }
  }

  setTimeout(() => addMessage(botMsg, "bot"), 300);
}

// Add message
function addMessage(msg, sender) {
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  div.textContent = msg;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Events
sendButton.addEventListener("click", sendMessage);
chatbotInput.addEventListener("keypress", (e) => { if (e.key === "Enter") sendMessage(); });
