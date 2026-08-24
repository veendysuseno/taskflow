# TaskFlow

TaskFlow adalah aplikasi **Task Manager berbasis web** yang dibuat dengan teknologi web dasar tanpa framework. Aplikasi ini memungkinkan pengguna membuat, mengelola, mencari, memfilter, dan memantau progress tugas secara sederhana.

TaskFlow menggunakan **LocalStorage**, sehingga data tugas tetap tersimpan di browser meskipun halaman di-refresh atau browser ditutup.

## 🚀 Features

- ➕ Add Task
- 🗑️ Delete Task
- ✅ Complete / Uncomplete Task
- 🔎 Search Task
- 🔽 Task Filtering
- 🚨 Priority System
- 📅 Task Deadline
- 📊 Progress Bar
- 📈 Task Statistics
- 🌙 Dark Mode
- 📱 Responsive Design
- 💾 LocalStorage
- ⚡ No Framework
- 🎨 Modern User Interface

## 🛠️ Technologies

Project ini dibuat menggunakan:

- **HTML5** — struktur aplikasi
- **CSS3** — styling, layout, responsive design, dan dark mode
- **Vanilla JavaScript** — logic dan interaksi aplikasi
- **LocalStorage API** — penyimpanan data task di browser

## 📂 Project Structure

```text
taskflow/
├── index.html
├── style.css
├── script.js
└── README.md
```

### File Description

| File | Description |
|---|---|
| `index.html` | Struktur utama aplikasi |
| `style.css` | Styling dan responsive layout |
| `script.js` | Logic aplikasi dan manipulasi task |
| `README.md` | Dokumentasi project |

## ⚙️ How to Run

### 1. Clone Repository

```bash
git clone https://github.com/USERNAME/taskflow.git
```

Ganti `USERNAME` dengan username GitHub kamu.

### 2. Masuk ke Directory

```bash
cd taskflow
```

### 3. Jalankan Project

Karena TaskFlow menggunakan HTML, CSS, dan Vanilla JavaScript, project dapat langsung dibuka melalui browser.

Cara sederhana:

```bash
xdg-open index.html
```

Atau klik dua kali file:

```text
index.html
```

### Recommended: VS Code Live Server

Jika menggunakan VS Code, install extension **Live Server**, kemudian:

1. Buka folder `taskflow`
2. Klik kanan `index.html`
3. Pilih **Open with Live Server**
4. Browser akan membuka aplikasi secara otomatis

## 💾 LocalStorage

TaskFlow menggunakan browser **LocalStorage** untuk menyimpan task.

Contohnya:

```javascript
localStorage.setItem("tasks", JSON.stringify(tasks));
```

Data kemudian dapat diambil kembali dengan:

```javascript
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
```

Dengan demikian, task tidak hilang ketika halaman di-refresh.

> **Note:** Data LocalStorage tersimpan secara lokal di browser. Jika browser storage dihapus, data task juga dapat ikut terhapus.

## 📊 Task Management

Setiap task dapat memiliki informasi seperti:

```text
Task
├── Title
├── Description
├── Priority
├── Deadline
└── Completion Status
```

Task dapat dikelola melalui beberapa fitur:

- Menambahkan task baru
- Menandai task sebagai selesai
- Menghapus task
- Mencari task
- Memfilter berdasarkan status
- Mengatur priority
- Menentukan deadline
- Melihat progress keseluruhan

## 🎯 Priority System

TaskFlow menyediakan sistem priority untuk membantu menentukan tingkat kepentingan task.

```text
🔴 High
🟡 Medium
🟢 Low
```

Contoh:

```text
High   → Fix critical bug
Medium → Update documentation
Low    → Improve UI animation
```

## 📈 Progress Tracking

Progress bar digunakan untuk menampilkan persentase task yang telah diselesaikan.

Contoh:

```text
Completed: 6 / 10

████████████░░░░░░░░ 60%
```

Progress dihitung berdasarkan jumlah task yang sudah selesai dibandingkan dengan total task.

## 🌙 Dark Mode

TaskFlow memiliki fitur **Dark Mode** untuk memberikan tampilan yang lebih nyaman ketika digunakan dalam kondisi pencahayaan rendah.

Mode tampilan dapat diubah melalui tombol **Dark Mode / Theme Toggle** pada aplikasi.

## 🔎 Search & Filter

Task dapat dicari berdasarkan keyword.

Contoh:

```text
Search: "JavaScript"
```

Aplikasi kemudian menampilkan task yang sesuai dengan keyword tersebut.

Task juga dapat difilter berdasarkan status, misalnya:

```text
All
Active
Completed
```

## 📱 Responsive Design

TaskFlow dirancang agar dapat digunakan pada berbagai ukuran layar:

- 💻 Desktop
- 💻 Laptop
- 📱 Tablet
- 📱 Smartphone

Layout akan menyesuaikan ukuran layar menggunakan CSS responsive design.

## 🔮 Future Improvements

Beberapa fitur yang dapat dikembangkan pada versi berikutnya:

- [ ] Edit Task
- [ ] Drag & Drop Task
- [ ] Task Categories
- [ ] Multiple Task Lists
- [ ] Sort by Priority
- [ ] Sort by Deadline
- [ ] Notification / Reminder
- [ ] Export Task
- [ ] Import Task
- [ ] PWA Support
- [ ] Backend API
- [ ] User Authentication
- [ ] Cloud Database

## 🎓 Learning Goals

Project ini cocok digunakan sebagai project latihan untuk mempelajari:

- DOM Manipulation
- JavaScript Events
- JavaScript Array Methods
- Object & Array
- CRUD Operations
- LocalStorage
- JSON
- CSS Flexbox
- CSS Grid
- Responsive Design
- Dark Mode
- Git & GitHub
- Deployment

## 📌 Project Status

**Status:** Active Development 🚧

TaskFlow dibuat sebagai project pembelajaran dan portfolio untuk mengembangkan kemampuan **Frontend Web Development** menggunakan HTML, CSS, dan JavaScript.

## 👨‍💻 Author

**Veendy Suseno**

GitHub: `https://github.com/veendysuseno`

## 📄 License

Project ini dibuat untuk tujuan pembelajaran dan portfolio.

---

⭐ Jika project ini bermanfaat, jangan lupa **star repository** di GitHub.
