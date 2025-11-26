MERN Blog Application
A full-stack blog application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring user authentication, CRUD operations, and real-time interactions.

Frontend URL:https://mern-stack-integration-reubenm597-1.onrender.com
Backend URL: https://mern-stack-integration-reubenm597.onrender.com

🚀 Features
User Authentication - Register, login, and JWT-based authorization

Blog Management - Create, read, update, and delete blog posts

Categories - Organize posts by categories

Comments - Interactive comment system for posts

Search & Filter - Find posts by keywords or categories

Responsive Design - Mobile-friendly interface

🛠️ Tech Stack
Frontend: React, Vite, React Router, Axios

Backend: Node.js, Express.js, MongoDB, Mongoose

Authentication: JWT, bcryptjs

Styling: CSS3 with modern design

📦 Installation
Clone the repository

bash
git clone https://github.com/PLP-MERN-Stack-Development/mern-stack-integration-reubenm597.git
cd mern-stack-integration-reubenm597
Install dependencies

bash
# Install root dependencies
npm install

# Install all project dependencies
npm run install-all
Environment Setup

Create server/.env:

env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
Create client/.env:

env
VITE_API_URL=http://localhost:5000/api
Start the application

bash
# Start both frontend and backend
npm run dev
🎯 Usage
Frontend: http://localhost:5173

Backend API: http://localhost:5000/api

API Endpoints
Method	Endpoint	Description
POST	/api/auth/register	User registration
POST	/api/auth/login	User login
GET	/api/posts	Get all posts
POST	/api/posts	Create a post (authenticated)
GET	/api/posts/:id	Get single post
PUT	/api/posts/:id	Update post (author only)
DELETE	/api/posts/:id	Delete post (author only)
GET	/api/categories	Get all categories
📁 Project Structure
text
mern-blog/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── context/        # State management
│   │   └── services/       # API services
│   └── package.json
├── server/                 # Express backend
│   ├── models/             # Mongoose models
│   ├── controllers/        # Route controllers
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   └── server.js           # Entry point
└── README.md
🚀 Deployment
Frontend (Vercel/Netlify)
Build command: npm run build

Output directory: client/dist

Backend (Railway/Render)
Set environment variables

Start command: npm start

🤝 Contributing
Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📝 License
This project is licensed under the MIT License.

👥 Authors
Your Name - Reuben Mwikya
