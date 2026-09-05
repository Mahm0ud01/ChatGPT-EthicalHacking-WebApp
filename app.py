#!/usr/bin/env python3
"""
🛡️ SecureChat Backend
تطبيق ويب متكامل: ChatGPT + أدوات Ethical Hacking
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import hashlib
import socket
import subprocess
from typing import Optional

app = FastAPI(title="🛡️ SecureChat API")

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class ChatRequest(BaseModel):
    """نموذج طلب الدردشة"""
    message: str

class ScanRequest(BaseModel):
    """نموذج طلب فحص المنافذ"""
    host: str

class HashRequest(BaseModel):
    """نموذج طلب Hash"""
    text: str
    algorithm: str  # md5, sha1, sha256

# ============ Chat Routes ============

@app.post("/chat")
async def chat(request: ChatRequest):
    """
    💬 محادثة مع Ollama
    """
    try:
        import requests
        
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "llama2",
                "prompt": request.message,
                "stream": False
            },
            timeout=60
        )
        
        if response.status_code == 200:
            data = response.json()
            return {"response": data.get("response", "❌ لم أتمكن من الإجابة")}
        else:
            return {"response": "❌ خطأ من خادم Ollama"}
    
    except Exception as e:
        return {"response": f"❌ خطأ: {str(e)}\n💡 تأكد من تشغيل Ollama: ollama serve"}

# ============ Security Tools Routes ============

@app.post("/scan")
async def port_scan(request: ScanRequest):
    """
    📡 فحص المنافذ المفتوحة
    """
    common_ports = [21, 22, 23, 25, 53, 80, 110, 143, 443, 445, 3306, 3389, 5432, 5900, 8080, 8443]
    open_ports = []
    
    for port in common_ports:
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.settimeout(1)
            result = sock.connect_ex((request.host, port))
            
            if result == 0:
                open_ports.append(port)
            
            sock.close()
        except Exception as e:
            pass
    
    return {
        "host": request.host,
        "open_ports": open_ports,
        "message": f"✅ تم العثور على {len(open_ports)} منافذ مفتوحة"
    }

@app.post("/hash")
async def generate_hash(request: HashRequest):
    """
    #️⃣ توليد Hash
    """
    try:
        if request.algorithm == "md5":
            hash_obj = hashlib.md5(request.text.encode())
        elif request.algorithm == "sha1":
            hash_obj = hashlib.sha1(request.text.encode())
        elif request.algorithm == "sha256":
            hash_obj = hashlib.sha256(request.text.encode())
        else:
            return {"error": "❌ خوارزمية غير معروفة"}
        
        return {"hash": hash_obj.hexdigest()}
    
    except Exception as e:
        return {"error": f"❌ خطأ: {str(e)}"}

# ============ Health Check ============

@app.get("/health")
async def health():
    """
    ✅ فحص صحة الخادم
    """
    return {
        "status": "✅ الخادم يعمل",
        "message": "🛡️ SecureChat API v1.0"
    }

# ============ Run ============

if __name__ == "__main__":
    import uvicorn
    print("\n" + "="*60)
    print("🛡️  SecureChat Server Starting...")
    print("="*60)
    print("\n📍 الخادم على: http://localhost:8000")
    print("📚 التوثيق على: http://localhost:8000/docs")
    print("\n💡 تأكد من تشغيل Ollama: ollama serve")
    print("\n" + "="*60 + "\n")
    
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
