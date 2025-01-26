
# Stock-market

This project is a full-stack application featuring a signup form. It allows users to register by providing their name, email, password, and an initial balance. The backend validates and stores the data, while the frontend offers a responsive and user-friendly interface.

---

## Features

- **User Signup**: 
  - Capture user details such as name, email, password, and balance.
  - Validate and send data to the backend for registration.
  - Assign 5 Stocks Randomnly
  - User can add stock,Update Stock,Delete Stock.
    
- **Backend Validation**:
  - Validates incoming data and responds with appropriate messages for errors.
- **Yahoo Finance Integration**:
  - Fetches real-time stock prices and calculates portfolio value.
- **Database Management**:
  - Stores user and stock data in MongoDB.



---

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (v14+)
- npm or yarn
- MongoDB

---

## Installation

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
2. **Frontend**
    ```bash
    cd frontend
    npm install
3. **Backend**
    ```bash
    cd backend
    npm install

## Folder Structure

      Stock-market/
      ├── frontend/         # React application
      │   ├── src/          # Source code
      │   │   ├── components/   # Reusable components
      │   │   ├── pages/        # Application pages
      │   │   ├── App.jsx       # Main app component
      │   │   └── index.js      # Entry point
      │   ├── public/       # Static files
      │   └── package.json  # Frontend dependencies
      ├── backend/          # Backend server
      │   ├── controllers/  # Request handling logic
      │   ├── models/       # Database models
      │   ├── routes/       # API routes 
      │   ├── index.js     # Main server file
      │   └── package.json  # Backend dependencies
      └── README.md         # Project documentation


           
# Application

## Screenshots

### 1. Signup Form
![image](https://github.com/user-attachments/assets/e7887318-72f9-4fbd-a95c-6da3960d5561)


### 2. Login Form
![image](https://github.com/user-attachments/assets/0e9d1fde-ee9c-43ad-bcec-780a1ec73557)


### 3. Dashboard
![image](https://github.com/user-attachments/assets/7f4d6bdc-e1c3-4ecb-97b5-b5f237c8c650)


### 4. Database (MongoDB)
![image](https://github.com/user-attachments/assets/463ccfb2-f31e-466b-8854-8d952ae6f0a7)




