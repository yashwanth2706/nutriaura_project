# Nutr## 🚀 Features

* 🛍️ Product browsing with categories and listings
* 🏷️ **Category Filtering** - Dropdown menu to filter products by category
* 🧭 **Breadcrumb Navigation** - Easy navigation showing category hierarchy and product details
* 📊 Product count display when filtering by category
* 📄 **Product Detail Pages** - Click on any product to view full details including description and usage instructions
* 💬 **Lorem Ipsum Mockup Content** - Product detail pages ready for custom content
* 🛒 Shopping cart functionality
* 🧑‍💻 Admin panel for managing products & users
* 📦 Scalable Django backend
* 💡 Interactive UI using Alpine.js and Bootstrapct

**NutriAura** is a modular, scalable e‑commerce web application focused on nutrition and wellness products. It is built using **Django**, **Alpine.js**, and **Bootstrap**, and is designed to be easy to extend and maintain.

---

## 🚀 Features

* 🛍️ Product browsing with categories and listings
* 🏷️ **Category Filtering** - Dropdown menu to filter products by category
* 🧭 **Breadcrumb Navigation** - Easy navigation showing category hierarchy (Home > Categories > Category Name)
* 📊 Product count display when filtering by category
* � **Product Detail Pages** - Click on any product to view full details including description and usage instructions
* �🛒 Shopping cart functionality
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
│   ├── css/             # Stylesheets
│   │   ├── breadcrumb.css     # Breadcrumb navigation styling
│   │   └── ...
│   └── js/              # JavaScript files
│       ├── products.js         # Product carousel & category filtering
│       └── ...
├── templates/           # HTML templates
│   ├── components/
│   │   ├── breadcrumb.html    # Breadcrumb navigation component
│   │   └── ...
│   └── index.html
├── scripts/             # Utility & deployment scripts
├── manage.py            # Django management CLI
├── requirements.txt     # Python dependencies
└── README.md            # Project documentation
```

---

## ✨ Category Filtering Feature

The NutriAura project includes a robust category filtering system that allows users to browse products by category.

### How It Works

1. **Category Dropdown Menu**: Click on the "Categories" link in the navigation bar to see a dropdown menu with all available product categories.

2. **Select a Category**: Click on any category (e.g., "Instant Soup", "Smoothie") to filter products by that category.

3. **Breadcrumb Navigation**: When a category is selected:
   - The product carousel is hidden
   - A breadcrumb navigation appears showing: `Home > Categories > [Category Name]`
   - The product count is displayed as a badge (e.g., "4 products")
   - Only products from the selected category are shown

4. **Return to All Products**: Click on "Home" or "Categories" in the breadcrumb to return to viewing all products.

### File Structure for Category Feature

**Templates:**
- `templates/components/breadcrumb.html` - Breadcrumb navigation component with home and category reset links

**Stylesheets:**
- `static/css/breadcrumb.css` - Styling for breadcrumb navigation with hover effects

**JavaScript:**
- `static/js/products.js` - Enhanced ProductCarousel class with category filtering logic
  - `populateCategoryDropdown()` - Dynamically populates categories from product data
  - `selectCategory(category)` - Handles category selection and filtering
  - `toggleBreadcrumb()` - Shows/hides breadcrumb based on category selection
  - `attachBreadcrumbResetListener()` - Handles reset when clicking breadcrumb links

**Product Data:**
- `static/js/products.data.js` - Contains all product objects with categories

### Category Selection Flow

```
Categories Dropdown
    ↓
User clicks category
    ↓
selectCategory() called with category name
    ↓
Products filtered by category
    ↓
Breadcrumb displayed
    ↓
Carousel hidden
    ↓
Filtered products shown
```

### Adding New Categories

Categories are automatically extracted from the `category` field in `products.data.js`. To add a new category:

1. Edit `static/js/products.data.js`
2. Add new products with a `category` property
3. The category will automatically appear in the dropdown menu

Example:
```javascript
{
    id: 10,
    name: "New Product",
    category: "New Category",  // This will be added to the dropdown
    price: 500,
    image: "image.png",
    badge: "New",
    badgeColor: "#2d5f2e",
    rating: 4.9,
    reviews: "10 Reviews",
    sizes: ["100g"]
}
```

### Current Product Categories

- Women Health
- Made with Cocounut
- Healthy Soup
- Instant Soup
- Smoothie

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
