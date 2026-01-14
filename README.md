# 🚀 JobTrackr  MERN + AI Job Application Tracker

**Land your next job with clarity, confidence... and a little AI
magic.**

JobTrackr is a full-stack MERN web application built to organize and
optimize your job search. Track every application, monitor your
progress, and - only if you want - let AI analyze job descriptions
and help you improve your resume strategy.

Built with a focus on: 
engineering - 🧪 Production-quality code - 🧠 AI as a value-add - 🚀 Fully deployable end-to-end



## 🎯 Motivation

Job hunting is chaotic --- endless tabs, spreadsheets that get
abandoned, and missed follow-ups. **JobTrackr turns chaos into
clarity.**

Use it to: ✔️ Track applications\
✔️ See your pipeline visually\
✔️ Stay consistent and motivated\
✔️ Extract insights from job descriptions using AI

> "Less tracking overhead. More applying. More offers."



## ✨ Key Features

### 🔐 Authentication & Security

-   Register + login
-   JWT-based session security
-   Backend-protected routes
-   Password hashing with bcrypt

### 📋 Application Management

-   Add job opportunities
-   Update application info & status
-   Delete entries you don't pursue
-   Fetch user-specific data (no mixing accounts)

Statuses include: `Applied → Interview → Offer → Rejected`

### 📊 Dashboard & Analytics

-   Visual status breakdown (bar/pie chart)
-   Total applications count
-   Interview percentage snapshot
-   Motivation by progress

### 🧠 Optional AI Insights

Paste any job description --- get: - Top required skills - Resume
keyword suggestions - Tips on phrasing - Optional follow-up message idea

**AI Never Stores Data** - Single request → single insight - API call
only through backend

### 🌐 Deployment Ready

-   Node backend & MongoDB Atlas live
-   React frontend live on Netlify/Vercel
-   Env-based API routing
-   CORS configured correctly


## 🛠 Tech Stack

### Frontend

-   React (Vite)
-   Tailwind CSS
-   React Router
-   Context API

### Backend

-   Node.js + Express
-   MongoDB + Mongoose
-   Bcrypt + JWT

### AI Layer

-   Gemini API / HuggingFace API

### Deployment

-   Render/Railway (server)
-   Netlify/Vercel (client)
-   MongoDB Atlas (database)


## 📂 Folder Structure

    JobTrackr/
    ├── client/
    │   ├── src/
    │   └── vite.config.js
    └── server/
        ├── models/
        ├── controllers/
        ├── routes/
        ├── middleware/
        └── server.js


## 🔌 API Overview

### Auth

-   POST `/api/auth/register`
-   POST `/api/auth/login`

### Applications

-   POST `/api/applications`
-   GET `/api/applications`
-   PUT `/api/applications/:id`
-   DELETE `/api/applications/:id`

### AI

-   POST `/api/ai/insights`


## 🔐 Environment Variables

### Server

    PORT=3000
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_secret
    AI_API_KEY=your_api_key

### Client

    VITE_API_BASE_URL=https://your-backend-url.com



## 📈 Future Enhancements

-   Job scraping
-   Date-based follow-up reminders
-   CSV export
-   Kanban pipeline


## 🏁 Final Note

JobTrackr isn't just another CRUD app --- it's a **real tool solving a
real pain**, shipped fully and deployed. Consistency beats intensity.
Finish \> perfect.

Good luck 🚀
