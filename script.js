// Navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links and sections
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
        
        // Add active class to clicked link and corresponding section
        link.classList.add('active');
        const sectionId = link.getAttribute('data-section');
        document.getElementById(sectionId).classList.add('active');
    });
});

// Chat Functions
async function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Display user message
    displayMessage(message, 'user');
    input.value = '';
    
    // Show loading indicator
    displayMessage('⏳ جاري التفكير...', 'assistant');
    
    try {
        const response = await fetch('http://localhost:8000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        });
        
        if (!response.ok) throw new Error('فشل الاتصال بالخادم');
        
        const data = await response.json();
        
        // Remove loading message
        const messages = document.querySelectorAll('.message');
        messages[messages.length - 1].remove();
        
        // Display AI response
        displayMessage(data.response, 'assistant');
    } catch (error) {
        // Remove loading message
        const messages = document.querySelectorAll('.message');
        messages[messages.length - 1].remove();
        
        displayMessage(`❌ خطأ: ${error.message}\n💡 تأكد من تشغيل الخادم: python app.py`, 'assistant');
    }
}

function displayMessage(text, role) {
    const messagesDiv = document.getElementById('chatMessages');
    const messageEl = document.createElement('div');
    messageEl.className = `message ${role}`;
    messageEl.textContent = text;
    messagesDiv.appendChild(messageEl);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Password Checker
function checkPassword() {
    const password = document.getElementById('passwordInput').value;
    const resultDiv = document.getElementById('passwordResult');
    
    if (!password) {
        resultDiv.textContent = '❌ أدخل كلمة مرور';
        resultDiv.className = 'result show error';
        return;
    }
    
    const strength = analyzePassword(password);
    resultDiv.className = `result show ${strength.level}`;
    resultDiv.innerHTML = `
        <strong>قوة كلمة المرور: ${strength.score}/5</strong><br><br>
        ${strength.feedback.map(f => `• ${f}`).join('<br>')}<br><br>
        ${strength.level === 'success' ? '✅ كلمة مرور قوية جداً!' : strength.level === 'info' ? '⚠️ كلمة مرور متوسطة' : '❌ كلمة مرور ضعيفة'}
    `;
}

function analyzePassword(password) {
    let score = 0;
    let feedback = [];
    let level = 'error';
    
    // Length
    if (password.length >= 8) score++;
    else feedback.push('أطول من 8 أحرف');
    
    if (password.length >= 12) score++;
    else feedback.push('أطول من 12 حرف');
    
    // Uppercase
    if (/[A-Z]/.test(password)) score++;
    else feedback.push('أضف أحرف كبيرة');
    
    // Lowercase
    if (/[a-z]/.test(password)) score++;
    else feedback.push('أضف أحرف صغيرة');
    
    // Numbers
    if (/[0-9]/.test(password)) score++;
    else feedback.push('أضف أرقام');
    
    // Special chars
    if (/[!@#$%^&*]/.test(password)) score++;
    else feedback.push('أضف رموز خاصة');
    
    if (score <= 2) level = 'error';
    else if (score <= 4) level = 'info';
    else level = 'success';
    
    return { score, feedback, level };
}

// Port Scanner
async function scanPorts() {
    const host = document.getElementById('hostInput').value.trim();
    const resultDiv = document.getElementById('scannerResult');
    
    if (!host) {
        resultDiv.textContent = '❌ أدخل عنوان IP أو Domain';
        resultDiv.className = 'result show error';
        return;
    }
    
    resultDiv.textContent = '⏳ جاري فحص المنافذ...';
    resultDiv.className = 'result show';
    
    try {
        const response = await fetch('http://localhost:8000/scan', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ host: host })
        });
        
        const data = await response.json();
        resultDiv.textContent = `✅ النتائج:\n${JSON.stringify(data, null, 2)}`;
        resultDiv.className = 'result show success';
    } catch (error) {
        resultDiv.textContent = `❌ خطأ: ${error.message}`;
        resultDiv.className = 'result show error';
    }
}

// Hash Generator
function generateHash(algorithm) {
    const input = document.getElementById('hashInput').value;
    const resultDiv = document.getElementById('hashResult');
    
    if (!input) {
        resultDiv.textContent = '❌ أدخل نص';
        resultDiv.className = 'result show error';
        return;
    }
    
    fetch('http://localhost:8000/hash', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input, algorithm: algorithm })
    })
    .then(r => r.json())
    .then(data => {
        resultDiv.textContent = `${algorithm.toUpperCase()}:\n${data.hash}`;
        resultDiv.className = 'result show success';
    })
    .catch(error => {
        resultDiv.textContent = `❌ خطأ: ${error.message}`;
        resultDiv.className = 'result show error';
    });
}

// Encoder/Decoder Functions
function encodeBase64() {
    const input = document.getElementById('encoderInput').value;
    const resultDiv = document.getElementById('encoderResult');
    
    if (!input) {
        resultDiv.textContent = '❌ أدخل نص';
        resultDiv.className = 'result show error';
        return;
    }
    
    try {
        const encoded = btoa(input);
        resultDiv.textContent = `Base64 Encoded:\n${encoded}`;
        resultDiv.className = 'result show success';
    } catch (error) {
        resultDiv.textContent = `❌ خطأ: ${error.message}`;
        resultDiv.className = 'result show error';
    }
}

function decodeBase64() {
    const input = document.getElementById('encoderInput').value;
    const resultDiv = document.getElementById('encoderResult');
    
    if (!input) {
        resultDiv.textContent = '❌ أدخل نص';
        resultDiv.className = 'result show error';
        return;
    }
    
    try {
        const decoded = atob(input);
        resultDiv.textContent = `Base64 Decoded:\n${decoded}`;
        resultDiv.className = 'result show success';
    } catch (error) {
        resultDiv.textContent = `❌ خطأ: قد لا يكون النص Base64 صحيح`;
        resultDiv.className = 'result show error';
    }
}

function encodeURL() {
    const input = document.getElementById('encoderInput').value;
    const resultDiv = document.getElementById('encoderResult');
    
    if (!input) {
        resultDiv.textContent = '❌ أدخل نص';
        resultDiv.className = 'result show error';
        return;
    }
    
    const encoded = encodeURIComponent(input);
    resultDiv.textContent = `URL Encoded:\n${encoded}`;
    resultDiv.className = 'result show success';
}

function decodeURL() {
    const input = document.getElementById('encoderInput').value;
    const resultDiv = document.getElementById('encoderResult');
    
    if (!input) {
        resultDiv.textContent = '❌ أدخل نص';
        resultDiv.className = 'result show error';
        return;
    }
    
    try {
        const decoded = decodeURIComponent(input);
        resultDiv.textContent = `URL Decoded:\n${decoded}`;
        resultDiv.className = 'result show success';
    } catch (error) {
        resultDiv.textContent = `❌ خطأ: ${error.message}`;
        resultDiv.className = 'result show error';
    }
}

// Enter key support
document.getElementById('chatInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
