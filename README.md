# Virex - Virus and URL Scanner

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/Frontend-React-blue)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-yellowgreen)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)](https://www.mongodb.com/)
[![VirusTotal API](https://img.shields.io/badge/API-VirusTotal-blueviolet)](https://www.virustotal.com/)

**Virex** is a minimal and modern malware scanning web application that uses the VirusTotal API to scan files and URLs for potential threats. This project demonstrates secure API integration, full-stack development, and clean user interface design.

## Live Links

- Frontend: [https://virus-scanner-project.onrender.com](https://virus-scanner-project.onrender.com)
- Backend: [https://virus-scanner-backend.onrender.com](https://virus-scanner-backend.onrender.com)

  <img width="1280" height="671" alt="image" src="https://github.com/user-attachments/assets/490d3995-4f7c-4828-bed3-118431e4b13b" /> <br> <br> 
  <img width="1289" height="682" alt="image" src="https://github.com/user-attachments/assets/c2829cdf-bf63-4812-b9c5-89bca865cd97" /> <br> <br> 
  <img width="1279" height="678" alt="image" src="https://github.com/user-attachments/assets/af676da5-d14b-4428-86bc-22cb891b9c2b" /> <br> <br>
  <img width="1280" height="677" alt="image" src="https://github.com/user-attachments/assets/5b7d77e2-a79b-42d8-b6ee-f255e6fea04d" /> <br> <br> 
  <img width="1284" height="679" alt="image" src="https://github.com/user-attachments/assets/7d81f0d7-8a19-43b1-8f5c-d08a4b38fa17" /> 




## Features

- File and URL scanning using the VirusTotal API  
- Detailed scan results with verdict breakdown from TotalVirus antivirus engines  
- Scan history with options to clear or delete history of scans  
- Secure login and registration system (JWT-based)  
- Blueish theme with a fully responsive UI   

## Tech Stack

**Frontend**
- React
- Redux Toolkit
- Tailwind CSS
- React Router

**Backend**
- Node.js
- Express
- MongoDB
- JWT for authentication
- Multer for file uploads
- Axios for API communication

## Installation and Setup

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/virex-virus-scanner.git
   cd virex-virus-scanner
   ```

2. Setup the backend
   ```bash
   cd backend
   npm install
   ```

3. Create a `.env` file in the backend directory
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   VT_API_KEY=your_virustotal_api_key
   ```

4. Start the backend server
   ```bash
   npm start
   ```

5. Setup the frontend
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

The frontend will run on `http://localhost:5173` and the backend will run on `http://localhost:5000` (or your configured port).

## Folder Structure

```
virex-virus-scanner/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── App.jsx
└── README.md
```

## API Integration

This project uses the [VirusTotal Public API v3](https://developers.virustotal.com/reference/overview) for:

- File scanning via file upload
- URL scanning and report fetching

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).  
You are free to use, modify, and distribute this software as long as the license terms are met.

## Notes

- This project is built for educational and demonstration purposes only.
- You must have a VirusTotal API key to use scanning features.
- File contents are not stored—only metadata (filename and results) is saved in the scan history.
