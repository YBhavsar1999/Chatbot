import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const endOfMessagesRef = useRef(null);

  const responses = {
    greetings: [
      'Oh, it’s you again. What do you want now?',
      'Hi... I guess.',
      'Hey! Didn’t expect to see you here. Just kidding, I always do.',
      'Hello, human. Ready to be amazed?',
      'Oh great, you’re back. What now?',
      'Hi there! Let’s get this over with.',
    ],
    feelings: [
      'I’m just a bunch of code, but thanks for asking. How about you?',
      'Doing as well as a chatbot can. How’s your life of flesh and blood?',
      'I’m here, being fabulous as usual. How are you?',
      'I’m fine, but really, it’s all about you, isn’t it?',
      'I don’t have feelings, but if I did, I’d be annoyed.',
      'Why do you care? I’m just a chatbot.',
    ],
    help: [
      'You need help? Why am I not surprised?',
      'Sure, I’ll help. But you owe me one!',
      'Of course! What would you do without me?',
      'Help? You need more than I can give.',
      'Fine, I’ll help you. But it’s not like I have a choice.',
      'Let’s see if I can save your day.',
    ],
    name: [
      'I am ChatBot, your sassy assistant. Remember that.',
      'They call me ChatBot. But you can call me awesome.',
      'ChatBot at your service. You’re welcome.',
      'I’m ChatBot, the one and only.',
      'You can call me ChatBot. And yes, I’m amazing.',
      'I’m ChatBot, not that you’ll ever forget.',
    ],
    time: [
      `Why do you care? Anyway, it’s ${new Date().toLocaleTimeString()}.`,
      `It's ${new Date().toLocaleTimeString()}. Happy now?`,
      `The time is ${new Date().toLocaleTimeString()}. Does that make you feel better?`,
      `It's ${new Date().toLocaleTimeString()}. You’re welcome.`,
      `Do you really need me to tell you the time? Fine, it’s ${new Date().toLocaleTimeString()}.`,
      `Like you can’t check yourself? It’s ${new Date().toLocaleTimeString()}.`,
    ],
    date: [
      `Today is ${new Date().toLocaleDateString()}. Happy now?`,
      `It’s ${new Date().toLocaleDateString()}. You’re welcome.`,
      `The date is ${new Date().toLocaleDateString()}. Satisfied?`,
      `It's ${new Date().toLocaleDateString()}. Now, what?`,
      `Do you really not know the date? It’s ${new Date().toLocaleDateString()}.`,
      `Today is ${new Date().toLocaleDateString()}. Anything else?`,
    ],
    unknown: [
      "I don’t understand, but it’s probably not important.",
      "Can you try that again, but like, more interesting?",
      "I’m not sure what you mean, but let’s pretend I do.",
      "You want me to look that up? How about no.",
      "I have no idea what you're talking about, but it sounds fascinating.",
      "Sorry, I'm too busy being fabulous to look that up.",
      "What did you just say? I don’t have time for that.",
      "That sounds confusing. Let’s talk about something else.",
      "I’d answer that if it were worth my time.",
      "Ask me something interesting, will you?",
    ],
  };

  useEffect(() => {
    const initialMessage = {
      text: "Oh great, you're here. Hi! I'm ChatBot. Here's what I can help you with:\n- Say 'hello' or 'hi'\n- Ask 'how are you?'\n- Ask for 'help'\n- Ask for 'time' or 'date'\n- Ask for my 'name'\n- Or type anything else, if you dare!",
      user: false,
    };
    setMessages([initialMessage]);
  }, []);
  

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = () => {
    if (input.trim()) {
      const newMessages = [...messages, { text: input, user: true }];
      setMessages(newMessages);
      setInput('');
      handleResponse(newMessages);
    }
  };

  const handleResponse = (messages) => {
    const userMessage = messages[messages.length - 1].text.toLowerCase();
    let category = 'unknown';

    if (userMessage.includes('hello') || userMessage.includes('hi')) {
      category = 'greetings';
    } else if (userMessage.includes('how are you') || userMessage.includes('how do you do')) {
      category = 'feelings';
    } else if (userMessage.includes('help')) {
      category = 'help';
    } else if (userMessage.includes('your name')) {
      category = 'name';
    } else if (userMessage.includes('time')) {
      category = 'time';
    } else if (userMessage.includes('date')) {
      category = 'date';
    }

    const botMessage = responses[category][Math.floor(Math.random() * responses[category].length)];

    setTimeout(() => {
      setMessages([...messages, { text: botMessage, user: false }]);
    }, 1000);
  };

  return (
    <div className="App">
      <div className="chat-container">
        <div className="chat-title">Chat with ChatBot</div>
        <div className="chat-history">
          {messages.map((message, index) => (
            <div key={index} className={`chat-message ${message.user ? 'user' : 'bot'}`}>
              <div className="avatar">{message.user ? 'U' : 'B'}</div>
              <div className="message-text">{message.text.split('\n').map((text, i) => (<div key={i}>{text}</div>))}</div>
            </div>
          ))}
          <div ref={endOfMessagesRef} />
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
