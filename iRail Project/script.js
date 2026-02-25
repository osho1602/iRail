window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  const content = document.getElementById("website-content");
  const logo = document.querySelector(".preloader-logo");

  // Check if preloader already shown in this session
  if (sessionStorage.getItem("preloaderShown")) {
    preloader.style.display = "none";
    content.style.display = "block";
    return;
  }

  // Mark preloader as shown
  sessionStorage.setItem("preloaderShown", "true");

  // Jab logo ka fadeInStay animation complete hoga
  logo.addEventListener("animationend", () => {
    setTimeout(() => {
      preloader.style.opacity = "0"; // fade-out smoothly
      setTimeout(() => {
        preloader.style.display = "none"; // hide preloader
        content.style.display = "block"; // show website
      }, 500); // fade-out duration = 0.5s
    }, 600); // 0.6s wait (stay visible after fade-in)
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth"
      });
    });
  });
});

// set current year in footer
document.addEventListener("DOMContentLoaded", function () {
  const y = new Date().getFullYear();
  const el = document.getElementById("copyright-year");
  if (el) el.textContent = y;
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


