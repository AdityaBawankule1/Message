Here is a complete, professional `README.md` file tailored exactly to your project's architecture, including the specific Mac networking fixes we uncovered.

### `README.md`

```markdown
# She Can Foundation - Contact Portal

A full-stack contact form application built to empower the community. This project features a responsive React frontend styled with Tailwind CSS and a robust Node.js/Express backend integrated with MongoDB via Mongoose.

## 🚀 Architecture Overview

- **Frontend:** React (Vite), Tailwind CSS
- **Backend:** Node.js, Express.js, Mongoose
- **Database:** MongoDB

---

## 🛠️ Prerequisites

Ensure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster)

---

## 📦 Getting Started

### 1. Backend Setup

1. Navigate to the backend directory:
```bash
   cd backend

```

2. Install the dependencies:

```bash
   npm install

```

3. Create a `.env` file in the root of the `backend` folder and add your configuration:

```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string

```

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