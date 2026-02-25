// src/components/ChatBox.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [dragY, setDragY] = useState(0);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const isMobile = window.innerWidth <= 768;

  useEffect(
    () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
    [messages, isBotTyping],
  );

  useEffect(() => {
    if (!isOpen || messages.length > 0) return;
    const timer = setTimeout(
      () => addBotMessage("Hi! 👋 Let's get in touch. What's your name?"),
      200,
    );
    return () => clearTimeout(timer);
  }, [isOpen]);

  const currentStage = !userData.name
    ? "name"
    : !userData.email
      ? "email"
      : "message";
  const getPrompt = () =>
    currentStage === "name"
      ? "Your name"
      : currentStage === "email"
        ? "Your Gmail"
        : "Your message";
  const getFarewell = () => {
    const h = new Date().getHours();
    return h < 12
      ? "Have a wonderful morning ☀️"
      : h < 18
        ? "Have a great afternoon 🌤️"
        : "Have a calm evening 🌙";
  };

  const addBotMessage = (text, delay = 200) => {
    setIsBotTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + Math.random(), text, sender: "bot" },
      ]);
      setIsBotTyping(false);
    }, delay);
  };

  const resetState = () => {
    setUserData({ name: "", email: "", message: "" });
    setInputValue("");
    setMessages([]);
    setIsSubmitting(false);
    setIsBotTyping(false);
    setDragY(0);
  };

  const toggleChat = () => {
    setIsOpen((p) => !p);
    if (isOpen) resetState();
  };

  const sendFormspree = async (data) => {
    try {
      await fetch("https://formspree.io/f/xqeborok", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.error("Formspree error:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isSubmitting) return;

    const userMsg = { id: Date.now(), text: inputValue, sender: "user" };
    setMessages((p) => [...p, userMsg]);

    if (currentStage === "name") {
      setUserData((p) => ({ ...p, name: inputValue }));
      addBotMessage(`Nice to meet you, ${inputValue}. What’s your Gmail?`);
    }

    if (currentStage === "email") {
      const email = inputValue.toLowerCase();
      if (!/^[^\s@]+@gmail\.com$/.test(email)) {
        addBotMessage("Please enter a valid Gmail 📧");
        setInputValue("");
        return;
      }
      setUserData((p) => ({ ...p, email }));
      addBotMessage("Perfect. What would you like to say?");
    }

    if (currentStage === "message") {
      const data = { ...userData, message: inputValue };
      setIsSubmitting(true);

      const sendingId = Date.now() + 1;
      setMessages((p) => [
        ...p,
        { id: sendingId, text: "Sending your message…", sender: "bot" },
      ]);

      setTimeout(() => {
        setMessages((p) =>
          p
            .filter((m) => m.id !== sendingId)
            .concat({
              id: Date.now() + 2,
              sender: "bot",
              text: `Thanks! I’ve received your message. ${getFarewell()}`,
            }),
        );
        setTimeout(() => {
          setIsOpen(false);
          resetState();
        }, 2000);
      }, 300);

      sendFormspree(data);
    }

    setInputValue("");
  };

  const handleInput = (e) => {
    setInputValue(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md"
            onClick={toggleChat}
          />
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <div className="fixed right-4 bottom-6 z-50 flex flex-col items-center">
        <button
          onClick={toggleChat}
          className="w-14 h-14 rounded-full bg-brand-accent flex items-center justify-center shadow-[0_0_18px_6px_rgba(233,155,99,0.45)] animate-pulse"
        >
          <span className="text-black font-bold text-lg">💬</span>
        </button>
        {!isOpen && (
          <span className="mt-2 text-xs text-white/80">Contact us</span>
        )}
      </div>

      {/* Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            drag={isMobile ? "y" : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            onDrag={(e, info) => setDragY(info.point.y)}
            onDragEnd={(e, info) =>
              info.offset.y > 100 ? toggleChat() : setDragY(0)
            }
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: dragY, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            style={{ bottom: isMobile ? 0 : 80, right: isMobile ? 0 : 20 }}
            className={`fixed z-50 flex flex-col overflow-hidden rounded-2xl border border-white/20
              ${isMobile ? "left-0 top-auto h-[60vh] w-full" : "w-[400px] h-[60vh]"} bg-brand-bg`}
          >
            <div className="px-4 py-3 border-b border-white/10 flex justify-between items-center text-xs text-white/70">
              {isMobile ? (
                <span>Swipe down to close</span>
              ) : (
                <>
                  <span>Let’s start a conversation</span>
                  <button
                    onClick={toggleChat}
                    className="text-white text-lg font-bold"
                  >
                    ✕
                  </button>
                </>
              )}
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`px-4 py-3 max-w-[75%] text-sm rounded-xl ${
                      m.sender === "user"
                        ? "bg-white text-black"
                        : "bg-black/20 border border-white/10 text-white/80"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {isBotTyping && (
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-white/70 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-white/70 rounded-full animate-bounce delay-150" />
                  <span className="w-2 h-2 bg-white/70 rounded-full animate-bounce delay-300" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-3 border-t border-white/10 flex-none"
            >
              <div className="flex gap-2">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={handleInput}
                  placeholder={getPrompt()}
                  rows={1}
                  className="flex-1 px-4 py-2 text-sm text-white bg-black/20 border border-white/20 rounded-xl focus:outline-none resize-none"
                />
                <button
                  disabled={!inputValue.trim() || isSubmitting}
                  className="w-10 h-10 rounded-full bg-brand-accent text-black disabled:opacity-40"
                >
                  ➤
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBox;
