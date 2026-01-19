# NutriAura Project

**NutriAura** is a modular, scalable e‑commerce web application focused on nutrition and wellness products. It is built using **Django**, **Alpine.js**, and **Bootstrap**, and is designed to be easy to extend and maintain.

---

## 🚀 Features

* 🛍️ Product browsing with categories and listings
* 🛒 Shopping cart functionality
* 🧑‍💻 Admin panel for managing products & users
* 📦 Scalable Django backend
* 💡 Interactive UI using Alpine.js and Bootstrap

---

## 📦 Getting Started

Follow the steps below to set up the project locally.

---

## 🧰 Requirements

Make sure you have the following installed:

* Python 3.8 or higher
* pip (Python package manager)
* SQLite (default database)

---

## 🛠️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yashwanth2706/nutriaura_project.git
cd nutriaura_project
```

---

### 2️⃣ Create & Activate Virtual Environment (Recommended)

```bash
python -m .venv venv
```

**Activate it:**

* **Windows**

```bash
.venv\Scripts\activate
```

* **macOS / Linux**

```bash
source .venv/bin/activate
```

---

### 3️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

Upgrade pip if needed:

```bash
python -m pip install --upgrade pip
```

---

### 4️⃣ Environment Configuration

Create a `.env` file in the project root (optional but recommended):

```env
DEBUG=True
SECRET_KEY=your_secret_key
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
```

---

### 5️⃣ Run Database Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

---

### 6️⃣ Create Admin User

```bash
python manage.py createsuperuser
```

Use this account to access the admin panel.

---

### 7️⃣ Start the Development Server

```bash
python manage.py runserver
```

Open your browser and visit:

```
http://127.0.0.1:8000
```

Admin Panel:

```
http://127.0.0.1:8000/admin
```

---

## 📁 Project Structure

```
nutriaura_project/
├── nutriaura/           # Main application
├── nutriaura_config/   # Project settings
├── static/              # Static assets
├── templates/           # HTML templates
├── scripts/             # Utility & deployment scripts
├── manage.py            # Django management CLI
├── requirements.txt     # Python dependencies
└── README.md            # Project documentation
```

---

## 🧪 Running Tests

```bash
python manage.py test
```

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch (`feature/your-feature`)
3. Commit your changes
4. Push to your fork
5. Open a Pull Request

---

## 📄 License

Specify your license here (e.g., MIT License).

```
MIT License © 2026
```

---

## 💡 Future Improvements

* Payment gateway integration
* User authentication & profiles
* Order tracking
* Docker support
* REST API integration

---
