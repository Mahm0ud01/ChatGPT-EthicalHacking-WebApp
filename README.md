# 🛡️ SecureChat - ChatGPT + Ethical Hacking Tools

تطبيق ويب متكامل يجمع بين **محادثة ذكية مع ChatGPT** و**أدوات Ethical Hacking الآمنة والقانونية**.

## ✨ الميزات

### 💬 ChatGPT
- محادثة ذكية مع Ollama
- دعم نماذج مختلفة (llama2, mistral, إلخ)
- حفظ السجل

### 🔒 أدوات Ethical Hacking
- **🔐 Password Strength Checker** - تحليل قوة كلمات المرور
- **📡 Port Scanner** - فحص المنافذ المفتوحة
- **#️⃣ Hash Generator** - MD5, SHA1, SHA256
- **🔤 Encoder/Decoder** - Base64, URL encoding

## 🚀 البدء السريع

### 1️⃣ المتطلبات
```bash
python 3.9+
Ollama (من https://ollama.ai)
```

### 2️⃣ التثبيت
```bash
# تحميل المشروع
git clone https://github.com/Mahm0ud01/ChatGPT-EthicalHacking-WebApp.git
cd ChatGPT-EthicalHacking-WebApp

# تثبيت المكتبات
pip install -r requirements.txt
```

### 3️⃣ تشغيل Ollama
```bash
ollama serve
```

### 4️⃣ تشغيل الخادم
```bash
python app.py
```

### 5️⃣ فتح التطبيق
افتح في المتصفح: `http://localhost:8000`

## 📡 API Endpoints

### Chat
```bash
POST /chat
{
  "message": "مرحبا"
}
```

### Port Scanner
```bash
POST /scan
{
  "host": "192.168.1.1"
}
```

### Hash Generator
```bash
POST /hash
{
  "text": "password123",
  "algorithm": "sha256"
}
```

## ⚠️ تحذير قانوني

### ✅ الاستخدام المشروع
- اختبار أمان أنظمتك الخاصة
- التعليم والتدريب
- البحث الأمني بإذن

### ❌ الاستخدام غير المشروع
- اختراق الأنظمة الأخرى
- سرقة البيانات
- أي نشاط غير قانوني

**الاستخدام غير القانوني للأدوات قد يعرضك للمسؤولية القانونية!**

## 🔐 الخصوصية

- ✅ جميع البيانات محلية على جهازك
- ✅ لا توجد بيانات تُرسل لخادم خارجي (ما عدا ChatGPT)
- ✅ لا نحفظ كلمات مرورك
- ✅ لا إعلانات

## 📸 لقطات

[يتم إضافة اللقطات هنا]

## 📚 التوثيق

- [توثيق API](./docs/API.md)
- [دليل التثبيت](./docs/SETUP.md)
- [شرح الأدوات](./docs/TOOLS.md)

## 🤝 المساهمة

نرحب بالمساهمات! يرجى:
1. عمل Fork
2. إنشاء فرع للميزة
3. عمل Commit للتغييرات
4. عمل Push للفرع
5. فتح Pull Request

## 📄 الترخيص

هذا المشروع مرخص تحت MIT License

## 📞 التواصل

- 📧 البريد: [بريدك]
- 🐛 الإبلاغ عن الأخطاء: [Issues](https://github.com/Mahm0ud01/ChatGPT-EthicalHacking-WebApp/issues)
- 💬 النقاشات: [Discussions](https://github.com/Mahm0ud01/ChatGPT-EthicalHacking-WebApp/discussions)

---

**صُنع بـ ❤️ من قبل Mahm0ud01**

**⚠️ تذكر: استخدم هذه الأدوات بمسؤولية وقانونية فقط!**
