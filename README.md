# ▲ APEX FITNESS — Premium Django Gym Website

A world-class premium gym website built with Django, Bootstrap 5, PostgreSQL-ready architecture, and a luxury dark aesthetic.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
pip install django psycopg2-binary pillow django-crispy-forms crispy-bootstrap5

# 2. Run migrations
python manage.py migrate

# 3. Create admin user
python manage.py createsuperuser

# 4. Collect static files
python manage.py collectstatic

# 5. Start the server
python manage.py runserver
```

Visit: http://127.0.0.1:8000
Admin Panel: http://127.0.0.1:8000/admin  (admin / admin123)

---

## ⚙️ ONE FILE CONFIGURATION

Edit **`site_config.py`** in the project root to update:
- Gym name, tagline, description
- Phone, WhatsApp, email, address
- Social media links
- Working hours
- Membership plan prices & features
- Statistics

**Changes update across the ENTIRE website automatically.**

---

## 📄 Pages

| Page       | URL           | Description                            |
|------------|---------------|----------------------------------------|
| Home       | `/`           | Hero, stats, simulator, trainers, CTA  |
| About      | `/about/`     | Story, mission, vision, values         |
| Membership | `/membership/`| 4 plan pricing cards + FAQ             |
| Trainers   | `/trainers/`  | Coach profiles with specialties        |
| Gallery    | `/gallery/`   | Masonry gallery + before/after         |
| Contact    | `/contact/`   | Form, hours, WhatsApp, map             |
| Admin      | `/admin/`     | Full CMS for all content               |

---

## 🎯 Fitness Journey Simulator

The interactive simulator on the home page:
1. User selects fitness level (Beginner / Intermediate / Advanced)
2. User selects goal (Weight Loss / Muscle Gain / Strength / Athletic)
3. User selects timeline (3 / 6 / 12 months)
4. Instantly generates a visual roadmap with milestones, training type, and recommended plan
5. Captures lead data via AJAX → saved to database → admin notified by email

---

## 🗄️ Database

**Development (default):** SQLite — works out of the box, no setup needed.

**Production:** Switch to PostgreSQL in `settings.py`:
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'apex_fitness_db',
        'USER': 'apex_user',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

---

## 📧 Email Configuration

Update in `site_config.py`:
```python
EMAIL_HOST          = "smtp.gmail.com"
EMAIL_HOST_USER     = "your@gmail.com"
EMAIL_HOST_PASSWORD = "your_app_password"
ADMIN_NOTIFY_EMAIL  = "admin@yourgym.com"
```

Also change `EMAIL_BACKEND` in `settings.py` from console to SMTP:
```python
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
```

---

## 📁 Project Structure

```
gymsite/
├── site_config.py          ← SINGLE CONFIG FILE (edit this!)
├── gymsite/
│   ├── settings.py
│   └── urls.py
├── gym/
│   ├── models.py           ← Lead, Trainer, Transformation, Gallery, Testimonial
│   ├── views.py            ← All page views + AJAX simulator endpoint
│   ├── forms.py            ← Contact & Simulator lead forms
│   ├── admin.py            ← Customized admin panel
│   ├── context_processors.py  ← Injects site_config into all templates
│   └── urls.py
├── templates/gym/
│   ├── base.html           ← Navbar, footer, shared assets
│   ├── home.html           ← Full home page
│   ├── about.html
│   ├── membership.html
│   ├── trainers.html
│   ├── gallery.html
│   └── contact.html
└── static/
    ├── css/apex.css        ← All custom styles
    └── js/apex.js          ← Simulator engine + animations
```

---

## 🎨 Design System

- **Black:** `#080808` — primary background
- **Charcoal:** `#1a1a1a` — card backgrounds
- **Neon Orange:** `#FF5722` — accent, CTAs, highlights
- **Fonts:** Bebas Neue (display) + Barlow Condensed (headings) + Inter (body)
- **Effects:** Glassmorphism cards, AOS scroll animations, CSS counter animations

---

## 🛠️ Adding Content

All content is managed via `/admin/`:
- **Leads** — view all inquiries, filter by status/source
- **Trainers** — add photos, bio, certifications, social links
- **Transformations** — before/after photos + member stories
- **Gallery Images** — upload + categorize photos
- **Testimonials** — member reviews with star ratings

---

## 🔐 Admin Credentials (development)

```
URL:      http://127.0.0.1:8000/admin/
Username: admin
Password: admin123
```
**Change before going live!**
"# GymDemo" 
