import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const documents = [
    { title: "Exam Guidelines" },
    { title: "Refund Policy" }
  ];

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setTyping(true);

    const response = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: input }),
    });

    const data = await response.json();

    setTimeout(() => {
      setTyping(false);
      const botMessage = {
        text: data.answer,
        sender: "bot",
        source: data.source,
        similarity: data.similarity,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 800);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const getConfidenceColor = (score) => {
    if (!score) return "gray";
    const percent = score * 100;
    if (percent > 70) return "green";
    if (percent > 40) return "orange";
    return "red";
  };

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <div className="sidebar">
        <h3>📚 Documents</h3>
        {documents.map((doc, i) => (
          <div key={i} className="doc-item">{doc.title}</div>
        ))}
      </div>

      <div className="chat-section">
        <div className="header">
          <h2>RAG Assistant</h2>
          <button onClick={() => setDarkMode(!darkMode)} className="toggle">
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>
        </div>

        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.sender === "bot" && (
                <div className="avatar">🤖</div>
              )}

              <div className="bubble">
                <p>{msg.text}</p>

                {msg.sender === "bot" && msg.source && (
                  <div className="meta">
                    <span>Source: {msg.source}</span>
                    <span
                      className={`badge ${getConfidenceColor(
                        msg.similarity
                      )}`}
                    >
                      {(msg.similarity * 100).toFixed(1)}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {typing && (
            <div className="message bot">
              <div className="avatar">🤖</div>
              <div className="bubble typing">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="input-area">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;