# 🛡️ درع الغابة — منظومة إدارة حرائق الغابات

منظومة PWA موحّدة لإدارة بلاغات حرائق الغابات (سوريا) — غرفة عمليات + مراقب + سائق.

## البنية
```
/
├── index.html      → تسجيل الدخول
├── ops.html        → غرفة العمليات (admin)
├── observer.html   → واجهة المراقب
├── driver.html     → واجهة السائق
├── manifest.json   → manifest الخاص بـ PWA
├── sw.js           → Service Worker
└── assets/
    ├── icon-192.png
    └── icon-512.png
```

## النشر عبر GitHub Pages
1. أنشئ مستودعاً جديداً (New Repository) — يُفضَّل الاسم `username.github.io` لرابط قصير، أو أي اسم آخر.
2. ارفع **كل محتويات** هذا المجلد إلى جذر المستودع (لا ترفع المجلد نفسه، بل محتوياته).
3. من تبويب **Settings → Pages**: اختر المصدر `Deploy from a branch` والفرع `main` والمجلد `/(root)` ثم احفظ.
4. بعد دقيقة تقريباً سيظهر الرابط بشكل:
   - `https://username.github.io/` (إذا كان اسم المستودع username.github.io)
   - `https://username.github.io/اسم-المستودع/` (لأي اسم آخر)

## ملاحظات
- يعمل firebase + خرائط Leaflet + خدمات خارجية (OSM, Open-Meteo, NASA FIRMS) — يتطلب اتصالاً بالإنترنت.
- للتثبيت كتطبيق على الجوال: افتح الرابط من Chrome/Safari ثم "إضافة إلى الشاشة الرئيسية".
