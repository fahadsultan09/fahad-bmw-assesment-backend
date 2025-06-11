🚗 BMW Assessment Backend Setup Guide
Welcome to the BMW Backend Assessment Project! This guide will help you set up and run the backend service locally using Docker and Node.js.
📦 Prerequisites
Before getting started, ensure you have the following installed on your system:
- 🐳 Docker – Install Docker
- 🧑‍💻 Node.js (v16 or later) – Download Node.js
- 🌀 Git – Install Git
🚀 Quick Start
Follow these step-by-step instructions to get the backend running on your local machine.
🔁 1. Clone the Repository
git clone -b main https://github.com/fahadsultan09/fahad-bmw-assesment-backend


📂 2. Navigate into the Project Folder
cd fahad-bmw-assesment-backend


🛠️ 3. Start MongoDB via Docker
cd docker
docker-compose up -d


▶️ 4. Run the Backend Server
cd ..
npm install  # Run this only the first time
npm run dev


✅ Your backend service should now be live at http://localhost:3001 (or your configured port).
🧪 Testing the API
You can test the running server using:
- 🧪 Postman
- 🌀 cURL
- 🌐 Browser (for simple GET requests)
🗂 Project Structure
fahad-bmw-assesment-backend/
├── docker/            # MongoDB Docker setup
│   └── docker-compose.yml
├── src/               # Backend source code
├── .env               # Environment config
├── package.json       # Node dependencies and scripts
└── README.md          # Setup instructions


🧠 Pro Tip
To stop MongoDB after you're done:
cd docker
docker-compose down

✅ Done! 🎉 Your backend project is up and running! Best of luck with your BMW assessment.
