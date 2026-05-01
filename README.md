# 🚀 Team Task Manager (Full Stack)

A full-stack web application where users can create, assign, and manage tasks with role-based access (Admin / Member).

---

## 🌐 Live Demo

🔗 **Live App (Frontend):**
https://glorious-balance-production-f16b.up.railway.app/

🔗 **Backend API:**
https://taskmanagerassignment-production-0a05.up.railway.app/api

---

## 📌 Features

### 🔐 Authentication

* User Signup & Login
* JWT-based authentication
* Secure password hashing using bcrypt

---

### 👥 Role-Based Access

#### 👑 Admin

* Create tasks
* Assign tasks to users
* Edit & delete tasks
* View all tasks

#### 👤 Member

* View only assigned tasks
* Update task status (Todo → In Progress → Done)

---

### 📋 Task Management

* Create tasks
* Assign tasks to users
* Update task status
* Edit task title
* Delete tasks

---

### 📊 Dashboard

* Kanban-style board:

  * Todo
  * In Progress
  * Done
* Clean modern UI with Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repo

```bash
git clone https://github.com/PriyanshiBajpai09/task_manager_assignment.git
cd task_manager_assignment
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

Run backend:

```bash
npm start
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🎥 Demo

👉 Add your demo video link here (2–5 min walkthrough)

---

## 💡 Notes

* Role-based access implemented (Admin / Member)
* REST APIs used for communication
* Fully deployed on Railway
* MongoDB Atlas used for database

---

## 👩‍💻 Author

**Priyanshi Bajpai**
