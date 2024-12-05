// components/Chatbot.tsx

import { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = async () => {
    if (inputMessage.trim() === "") return;

    const newMessages = [...messages, `You: ${inputMessage}`];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.HTTP_URL}/api/feeds/chat`,
        { message: inputMessage }
      );
      setMessages([...newMessages, `AI: ${response.data.response}`]);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setMessages([...newMessages, `AI: Error occurred`]);
    } finally {
      setInputMessage("");
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
        {loading && <div>AI is typing...</div>}
      </div>

      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chatbot;
