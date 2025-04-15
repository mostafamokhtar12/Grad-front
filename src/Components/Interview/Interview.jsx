import React, { useState, useEffect, useRef } from "react";
import "./interview.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Interview() {
  const [messages, setMessages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const chatContainerRef = useRef(null);

  //Scrolling func.
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([
        { text: "Hello! Can you please introduce yourself?", isBot: true },
      ]);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  //(simulated recording)
  const handleRecording = () => {
    setIsRecording(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "My name is John and I'm a software developer...",
          isBot: false,
        },
      ]);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text: "Great! What are your key strengths as a developer?",
            isBot: true,
          },
        ]);
      }, 1500);

      setIsRecording(false);
    }, 2000);
  };

  return (
    <div className="interview-page">
      <p className="site-name">Interview Coach</p>
      <Link to="/home">
        <FontAwesomeIcon icon={faHome} className="Home-logo-second" />
      </Link>
      <div className="interview-container">
        <div className="chat-container" ref={chatContainerRef}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.isBot ? "bot-message" : "user-message"
              }`}
            >
              <div className="message-content">{message.text}</div>
            </div>
          ))}
        </div>
        <div className="Answer-Section">
          <button
            onClick={handleRecording}
            disabled={isRecording}
            className={`mic-button ${isRecording ? "recording" : ""}`}
          >
            <FontAwesomeIcon icon={faMicrophone} className="Mic-logo" />
          </button>
          {isRecording && (
            <div className="recording-indicator">Recording...</div>
          )}
        </div>
      </div>
    </div>
  );
}
