# 💰 Personal Finance Tracker

A web application built with **React + TypeScript + Redux + Firebase** to help users track their expenses, view summaries, and manage personal finances.  

## ✨ Features
- 🔐 **User Authentication**
  - Sign up with email, username, and password
  - Login / Logout
  - Form validation for email, phone number, and password
- 💵 **Expense Management**
  - Add new expenses with amount, category, description, and date
  - View a list of all expenses
  - Delete expenses with one click
- 📊 **Expense Summary**
  - Overview of total spending
  - Breakdown by category
- 🔄 **Firebase Integration**
  - Authentication using Firebase Auth
  - Data storage in Firestore
- 🎨 **UI/UX**
  - Built with Material-UI (MUI) for a clean, modern look
  - Responsive design for desktop and mobile

---

## 🛠️ Tech Stack
- **Frontend:** React, TypeScript, Redux Toolkit, Vite  
- **Backend/Database:** Firebase (Auth + Firestore)  
- **UI Library:** Material-UI (MUI)  

---

## 🚀 Getting Started

1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/finance-tracker.git
cd finance-tracker

2️⃣ Install dependencies
npm install

3️⃣ Set up environment variables
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

4️⃣ Run the development server
npm run dev


