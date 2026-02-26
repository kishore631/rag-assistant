🤖 GenAI RAG Assistant – Document-Based Chat System

A production-style Retrieval-Augmented Generation (RAG) assistant that answers user questions using intelligent document retrieval and cosine similarity ranking.

Built with:

⚙️ Node.js + Express (Backend)

⚛️ React (Vite) (Frontend)

🧠 Custom Embedding Logic

📊 Cosine Similarity Algorithm

🚀 Deployed on Render & Vercel

📌 Problem Statement

Build a production-style GenAI-powered Chat Assistant that:

Converts documents into embeddings

Stores them in a vector store

Performs similarity search

Injects relevant context

Returns grounded responses

This system demonstrates real embedding-based retrieval, not keyword matching or hardcoded answers.

🧠 How The System Works
1️⃣ Document Ingestion

Documents stored in docs.json

ingest.js generates embeddings

Vector store saved locally as vector_store.json

2️⃣ Embedding Generation

Custom embedding logic includes:

Lowercasing

Stopword removal

Basic stemming

Synonym normalization

Word frequency vector creation

No paid APIs are used.

3️⃣ Similarity Search

Cosine similarity between query and document vectors

Title boosting for better relevance

Ranked document scoring

Threshold-based fallback handling

4️⃣ Intelligent Response Logic

Greeting detection

Ranked top document retrieval

Confidence percentage scoring

Graceful fallback for weak matches

🛠️ Tech Stack
Backend

Node.js

Express.js

Custom Embedding Engine

Cosine Similarity Algorithm

Frontend

React (Vite)

Responsive Chat UI

Dark Mode Toggle

Confidence Badge

Deployment

Backend → Render

Frontend → Vercel

GitHub for Version Control

📂 Project Structure
rag-assistant/
│
├── backend/
│   ├── data/
│   │   ├── docs.json
│   │   └── vector_store.json (generated)
│   ├── routes/
│   │   └── chat.js
│   ├── scripts/
│   │   └── ingest.js
│   ├── utils/
│   │   ├── embed.js
│   │   └── cosine.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   └── App.jsx
│
└── README.md
⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/your-username/rag-assistant.git
cd rag-assistant
2️⃣ Backend Setup
cd backend
npm install
node scripts/ingest.js
node server.js

Server runs at:

http://localhost:5000
3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs at:

http://localhost:5173
🌍 Deployment Guide
Backend (Render)

Create Web Service

Build Command: npm install

Start Command: npm start

Frontend (Vercel)

Framework: Vite

Root Directory: frontend

Build Command: npm run build

Output Directory: dist

📊 Features

Multi-document retrieval

Synonym-aware embedding

Ranked similarity search

Confidence scoring

Greeting detection

Dark mode toggle

Modern UI

Production-ready architecture

🔮 Future Improvements

Top-K document retrieval

Hybrid TF-IDF + embedding scoring

LLM-based generative responses

Database-based vector storage

Authentication system

👨‍💻 Author

GIDIGI VENKATA KISHORE
B.Tech Computer Science (2025)
AI & Machine Learning Enthusiast