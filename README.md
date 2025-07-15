
# 🌍 Natours – Tour Booking Platform

![GitHub last commit](https://img.shields.io/github/last-commit/HAxoRisticM2/The-Natours-?style=for-the-badge)
![GitHub repo size](https://img.shields.io/github/repo-size/HAxoRisticM2/The-Natours-?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen?style=for-the-badge&logo=mongodb)
![Pug](https://img.shields.io/badge/Templating-Pug-yellow?style=for-the-badge)
![Deployed](https://img.shields.io/badge/Deployed-Render-blue?style=for-the-badge&logo=render)

Natours is a full-stack web application built for users who want to explore and book nature tours around the world. Developed using **Node.js**, **MongoDB**, **Pug**, **HTML**, and **CSS**, it features authentication, email services, image upload, and a beautiful UI rendered using the Pug template engine.

---

## 🚀 Features

- Full authentication and session management
- Secure user registration and login
- Email notifications (signup, password reset, etc.)
- Image upload with cloud-based processing
- Tour listing, booking interface, and admin dashboard
- Responsive UI using Pug, HTML, and CSS

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** Pug template engine
- **Database:** MongoDB with Mongoose ODM
- **Other Tools:** Nodemailer, Multer, Sharp, dotenv, JWT

---

## 🌐 Deployment

The project is deployed using **Render**.  
🔗 [Live Demo](https://the-natours-theodore-62f5.onrender.com/) <!-- desktop view only -->

---

## 📁 Project Structure

Here's a clear breakdown of your file organization:

```

The-Natours-/
├── .cache/            # Internal caching during deployment
├── controllers/       # All route handler functions (tours, users, auth, etc.)
├── dev-data/          # Sample data for MongoDB import
├── models/            # Mongoose schema definitions for User, Tour, Review
├── public/            # Static files (CSS, images, JS)
├── routes/            # Express route handlers
├── utils/             # Utility modules (error handling, email sending, etc.)
├── views/             # Pug templates (UI rendering)
├── app.js             # Main app configuration
├── server.js          # Server entry point
├── package.json       # Project metadata and dependencies
└── .env               # Environment configuration (not uploaded to GitHub)

````

### 📌 Key Highlights

- Each folder is modular and cleanly separated for scalability.
- `controllers` and `routes` follow MVC principles.
- `views` includes dynamic templates using Pug.
- `utils` keeps helper functions organized.
- `dev-data` allows you to seed and test your database.

---

## 📦 How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/HAxoRisticM2/The-Natours-.git
cd The-Natours-
````

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT=3000
DATABASE=mongodb+srv://<username>:<password>@cluster.mongodb.net/natours
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=90d
EMAIL_USERNAME=your_email@example.com
EMAIL_PASSWORD=your_email_password
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
```

### 4. Start the development server

```bash
npm run dev
```

---

## 📚 Learning Goals

This project was part of a backend development journey inspired by real-world applications. It demonstrates:

* REST API creation and security
* Clean folder structure using MVC principles
* Environment management and deployment
* Secure user authentication and data validation

---

## 🙋 About Me

**Mohamad Murtaza**
📍 Kashmir, India
🎓 BCA Graduate | Backend & Full-stack Developer
🔧 Skills: Node.js, MongoDB, Express.js, REST APIs, Pug, HTML, CSS
🔗 [GitHub – HAxoRisticM2](https://github.com/HAxoRisticM2)

---

## 💬 Feedback

If you found this project useful, drop a ⭐ on the repo!
For suggestions or contributions, feel free to fork or raise an issue.

````
