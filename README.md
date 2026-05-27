# She Can Foundation - Contact Portal

A full-stack contact form application built to empower the community. This project features a responsive React frontend with form validation and a robust Node.js/Express backend integrated with MongoDB via Mongoose.

## 🎯 Project Overview

This application provides a contact form where users can submit their information to the She Can Foundation. The submission includes validation on both the frontend and backend, ensuring data integrity and a smooth user experience.

**Features:**
- Responsive contact form with client-side validation
- Server-side validation and error handling
- MongoDB database for persistent storage
- CORS-enabled API for cross-origin requests
- Secure password hashing and JWT authentication setup
- Real-time form validation with error messages

---

## 🏗️ Architecture Overview

```
She Can Foundation (Full Stack)
├── Frontend (React + Vite)
│   ├── Contact Form Component
│   ├── Form Validation (Zod)
│   └── Tailwind CSS Styling
├── Backend (Node.js + Express)
│   ├── REST API Endpoints
│   ├── MongoDB Integration (Mongoose)
│   └── Request Validation
└── Database (MongoDB)
```

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, Tailwind CSS, Zod, React Hook Form |
| Backend | Node.js, Express.js 5, Mongoose 9 |
| Database | MongoDB |
| Security | bcryptjs, JWT |
| Dev Tools | Nodemon, ESLint |

---

## 🛠️ Prerequisites

Ensure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local instance or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cloud database)
- [Git](https://git-scm.com/)

---

## 📦 Installation & Setup

### Clone the Repository

```bash
git clone <repository-url>
cd "She Can Foundation - Full Stack"
```

### 1. Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `backend` folder with the following configuration:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/she-can-foundation
NODE_ENV=development
```

**For MongoDB Atlas (Cloud Database):**
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/she-can-foundation?retryWrites=true&w=majority
NODE_ENV=development
```

4. Start the backend server:
```bash
npm run dev
```

The backend will start on `http://localhost:5000`

---

### 2. Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

---

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Once both servers are running:
- Frontend: Open `http://localhost:5173` in your browser
- Backend API: `http://localhost:5000/api/contact`

### Production Build

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

---

## 📁 Project Structure

```
.
├── backend/
│   ├── config/
│   │   └── db.js                    # MongoDB connection setup
│   ├── controllers/
│   │   └── contactController.js     # Business logic for contact submissions
│   ├── models/
│   │   └── Contact.js               # MongoDB Contact schema
│   ├── routes/
│   │   └── contactRoutes.js         # API route definitions
│   ├── server.js                    # Express server entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── forms/
│   │   │   │   └── ContactForm.jsx  # Contact form component
│   │   │   └── ui/
│   │   │       └── Button.jsx       # Reusable button component
│   │   ├── api/
│   │   │   └── axios.js             # API client configuration
│   │   ├── assets/                  # Images and static files
│   │   ├── validation/
│   │   │   └── contactSchema.js     # Zod validation schema
│   │   ├── App.jsx                  # Main app component
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Global styles
│   ├── vite.config.js               # Vite configuration
│   ├── eslint.config.js             # ESLint configuration
│   └── package.json
├── package.json                     # Root package configuration
└── README.md                        # This file
```

---

## 📡 API Endpoints

### Contact Form Submission

**POST** `/api/contact`

Submit a new contact form.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "This is my contact message..."
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Form submitted successfully!",
  "contact": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "This is my contact message...",
    "createdAt": "2026-05-27T10:30:00Z"
  }
}
```

**Error Response (500):**
```json
{
  "success": false,
  "message": "Failed to save form data",
  "error": "Error details"
}
```

---

## ✅ Available Scripts

### Backend Scripts

```bash
npm start    # Start the production server
npm run dev  # Start with Nodemon (auto-reload on file changes)
npm test     # Run tests (not yet configured)
```

### Frontend Scripts

```bash
npm run dev      # Start development server with Vite
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

---

## 🔐 Security Features

- **Password Hashing:** bcryptjs for secure password storage
- **JWT Authentication:** Ready for token-based authentication
- **CORS:** Configured to allow cross-origin requests
- **Input Validation:** Both client-side (Zod) and server-side validation
- **Environment Variables:** Sensitive data stored in `.env` files

---

## 🐛 Troubleshooting

### Backend Connection Issues (macOS)
If you encounter connection errors on macOS, try:
```bash
# Use IPv6 loopback address
http://[::1]:5000
```

### Port Already in Use
```bash
# Find and kill the process using port 5000
lsof -i :5000
kill -9 <PID>
```

### MongoDB Connection Error
- Ensure MongoDB is running locally: `brew services start mongodb-community`
- Or use MongoDB Atlas with a valid connection string
- Check that `MONGO_URI` in `.env` is correct

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000                              # Server port
MONGO_URI=mongodb://localhost:27017/   # MongoDB connection string
NODE_ENV=development                   # Environment mode
```

### Frontend
The frontend uses `http://[::1]:5000` (IPv6 loopback) for API calls. Modify in [frontend/src/App.jsx](frontend/src/App.jsx) if needed.

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit your changes: `git commit -m "Add your feature"`
3. Push to the branch: `git push origin feature/your-feature`
4. Open a pull request

---

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 📞 Support

For issues or questions, please open an issue in the repository or contact the development team.

---

**Built with ❤️ for the She Can Foundation**

4. Start the backend server:

```bash
   node server.js

```

### 2. Frontend Setup

1. Open a new terminal window and navigate to the frontend directory:

```bash
   cd frontend

```

2. Install the dependencies:

```bash
   npm install

```

3. Start the Vite development server:

```bash
   npm run dev

```

---

## 🔌 API Endpoints

### Contact Form Submission

* **URL:** `/api/contact`
* **Method:** `POST`
* **Headers:** `Content-Type: application/json`
* **Request Body:**

```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "message": "This is a test message over 20 characters."
  }

```

* **Success Response (201 Created):**

```json
  {
    "success": true,
    "message": "Form submitted successfully!",
    "contact": { ... }
  }

```

---

## 💻 Troubleshooting & Known Gotchas (macOS Dual-Stack Networking)

On modern macOS environments, system network configurations may map local requests differently over IPv4 vs IPv6, leading to `net::ERR_CONNECTION_REFUSED` errors even when the server is actively running.

### Port Verification

To confirm both the frontend and backend processes are running and see which addresses they have bound to, run:

```bash
lsof -i -P -n | grep LISTEN | grep node

```

### Addressing Connection Refused Bugs

If your backend resolves to an IPv6 stack while the browser compiles over IPv4, update the frontend network target in `App.jsx` to utilize the explicit IPv6 loopback notation rather than `localhost`:

```javascript
// Resolve dual-stack alignment issues on Mac
const response = await fetch("[http://[::1]:5000/api/contact](http://[::1]:5000/api/contact)", { ... });

```

```

***

<ElicitationsGroup message="What would you like to do next?">
<Elicitation label="Draft environment configuration templates" query="Create a .env.example template file for both frontend and backend environments" />
<Elicitation label="Generate API response mock tests" query="Create Postman collection JSON or curl command scripts to test the backend endpoints" />
<Elicitation label="Add validation schema extensions" query="Add more robust validation or sanitization middleware to the backend routes" />
</ElicitationsGroup>

```