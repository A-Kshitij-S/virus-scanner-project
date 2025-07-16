# Virex - Virus and URL Scanner

**Virex** is a minimal and modern malware scanning web application that uses the VirusTotal API to scan files and URLs for potential threats. This project demonstrates secure API integration, full-stack development, and clean user interface design.

## Features

- File and URL scanning using the VirusTotal API  
- Detailed scan results with verdict breakdown from multiple antivirus engines  
- Scan history with options to clear or delete entries  
- Secure login and registration system (JWT-based)  
- Dark theme with a fully responsive UI  
- Role-based access handled on the frontend  

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
   ```
   git clone https://github.com/your-username/virex-virus-scanner.git
   cd virex-virus-scanner
   ```

2. Setup the backend
   ```
   cd backend
   npm install
   ```

3. Create a `.env` file in the backend directory with the following
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   VT_API_KEY=your_virustotal_api_key
   ```

4. Start the backend server
   ```
   npm start
   ```

5. Setup the frontend
   ```
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

This project is licensed under the MIT License.

## Notes

- This project is built for educational and demonstration purposes only.
- You must have a VirusTotal API key to use scanning features.
- File contents are not stored—only metadata (filename and results) is saved in the scan history.

