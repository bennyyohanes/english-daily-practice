# English Daily Practice 🚀

Aplikasi web latihan bahasa Inggris harian yang dirancang khusus untuk programmer Indonesia. Belajar kosakata, percakapan, dan frasa yang relevan dengan pekerjaan sehari-hari sebagai developer.

---

## 📋 Fitur

- 🔐 **Login dengan password** — dilindungi dengan SHA-256 hash
- 📅 **30 hari konten unik** — dari stand-up meeting hingga presentasi teknis
- 🔥 **Warm-Up Vocabulary** — 5 kosakata baru setiap hari
- 💬 **Speaking Simulation** — skenario percakapan nyata di tempat kerja
- 📖 **Reading Practice** — artikel pendek dengan pertanyaan pemahaman
- 🛠️ **Useful Phrases** — frasa siap pakai dengan terjemahan
- 📧 **Daily Email** — email otomatis setiap pagi via GitHub Actions
- 📱 **Responsive** — tampil baik di desktop maupun mobile

---

## 🗂️ Struktur Folder

```
english-daily-practice/
├── index.html              # Halaman utama aplikasi
├── css/
│   └── style.css           # Styling dark theme
├── js/
│   └── app.js              # Logic aplikasi + autentikasi
├── scripts/
│   └── send-email.js       # Script kirim email harian
├── lessons/
│   ├── day-1.json          # Konten Day 1: Daily Stand-Up Basics
│   ├── day-2.json          # Konten Day 2: Reporting Progress
│   ├── ...
│   └── day-30.json         # Konten Day 30: Advanced Communication
├── .github/
│   └── workflows/
│       ├── deploy.yml       # Deploy otomatis ke GitHub Pages
│       └── daily-email.yml  # Kirim email harian jam 08:00 WIB
└── package.json
```

---

## 🚀 Deploy ke GitHub Pages

### 1. Fork atau clone repository ini

```bash
git clone https://github.com/username/english-daily-practice.git
cd english-daily-practice
```

### 2. Aktifkan GitHub Pages

1. Buka **Settings** → **Pages**
2. Pilih **Source**: GitHub Actions
3. Simpan

### 3. Set Secrets untuk email (opsional)

Buka **Settings** → **Secrets and variables** → **Actions**, lalu tambahkan:

| Secret | Value |
|--------|-------|
| `RESEND_API_KEY` | API key dari [resend.com](https://resend.com) |
| `EMAIL_TO` | Alamat email tujuan (default: `bennyyohanes5@gmail.com`) |

---

## 📚 Konten 30 Hari

| Hari | Topik | Kategori |
|------|-------|----------|
| 1 | Daily Stand-Up Basics | Meeting |
| 2 | Reporting Progress | Meeting |
| 3 | Asking for Clarification | Meeting |
| 4 | Discussing Deadlines | Meeting |
| 5 | Team Collaboration & Handoffs | Meeting |
| 6 | Reporting a Bug | Debugging |
| 7 | Debugging Conversations | Debugging |
| 8 | Hotfixes & Incidents | Debugging |
| 9 | Writing Error Messages | Debugging |
| 10 | Bug Triage & Prioritization | Debugging |
| 11 | Giving a Code Review | Code Review |
| 12 | Responding to Code Review | Code Review |
| 13 | Discussing Technical Debt | Code Review |
| 14 | Discussing Code Architecture | Code Review |
| 15 | Mentoring & Explaining Concepts | Code Review |
| 16 | Writing Jira Tickets | Feature Requests |
| 17 | Feature Requests & Stakeholders | Feature Requests |
| 18 | Sprint Retrospectives | Feature Requests |
| 19 | Writing Technical Documentation | Feature Requests |
| 20 | Scrum Ceremonies & Agile | Feature Requests |
| 21 | System Design Discussions | Architecture |
| 22 | Database & Performance | Architecture |
| 23 | Security Discussions | Architecture |
| 24 | API Design Conversations | Architecture |
| 25 | DevOps & Deployment | Architecture |
| 26 | Technical Presentations | Advanced |
| 27 | Negotiation & Saying No | Advanced |
| 28 | Remote Work Communication | Advanced |
| 29 | Career Conversations & 1-on-1s | Advanced |
| 30 | Advanced Communication | Advanced |

---

## 🔐 Password

Password default: `benny123`

Password disimpan sebagai SHA-256 hash di `js/app.js` — tidak pernah disimpan sebagai plain text.

Untuk mengganti password:
1. Hitung SHA-256 hash dari password baru
2. Ganti nilai `PASSWORD_HASH` di `js/app.js`

---

## 📧 Setup Email Harian

Email dikirim setiap hari jam **08:00 WIB** (01:00 UTC) menggunakan [Resend](https://resend.com).

1. Daftar di [resend.com](https://resend.com) (gratis 3.000 email/bulan)
2. Buat API key
3. Tambahkan ke GitHub Secrets sebagai `RESEND_API_KEY`
4. Email akan otomatis terkirim setiap pagi

---

## 🛠️ Development Lokal

Karena ini adalah aplikasi static HTML, tidak perlu build process. Cukup serve dengan HTTP server:

```bash
# Menggunakan Python
python -m http.server 8080

# Atau menggunakan Node.js
npx serve .
```

Buka `http://localhost:8080` di browser.

---

## 📄 Format JSON Lesson

Setiap file `lessons/day-N.json` mengikuti format:

```json
{
  "day": 1,
  "title": "Daily Stand-Up Basics",
  "warmup": {
    "title": "🔥 Warm-Up Vocabulary",
    "words": [
      { "word": "...", "meaning": "...", "example": "..." }
    ]
  },
  "speaking": {
    "title": "💬 Speaking Simulation",
    "scenario": "...",
    "context": "...",
    "prompt": "...",
    "sample_answer": "..."
  },
  "reading": {
    "title": "📖 Reading Practice",
    "passage": "...",
    "questions": ["...", "..."],
    "answers": ["...", "..."],
    "key_phrases": [
      { "phrase": "...", "meaning": "..." }
    ]
  },
  "phrases": {
    "title": "🛠️ Useful Phrases",
    "items": [
      { "context": "...", "phrase": "...", "indonesian": "..." }
    ]
  }
}
```

---

## 🌐 Live Demo

[https://bennyyohanes.github.io/english-daily-practice/](https://bennyyohanes.github.io/english-daily-practice/)

---

*Dibuat dengan ❤️ untuk programmer Indonesia yang ingin meningkatkan kemampuan bahasa Inggris profesional.*
