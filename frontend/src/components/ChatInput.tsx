import { IoSend } from 'react-icons/io5';
import { socket } from '../socket';
import React, { useState } from 'react';
import type { Chat } from '../types/Chat';
import { useAuthStore } from '../store/authStore';
import { useChannelStore } from '../store/channelStore';

export default function ChatInput() {
  const user = useAuthStore((state) => state.user);
  const channel = useChannelStore((state) => state.selectedChannel);
  const [message, setMessage] = useState('');

  function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (message === '') return;
    const today = Date.now();
    const newChat: Chat = {
      name: user,
      message,
      date: today,
    };
    socket.emit('channelMessage', {
      channel: channel?.name,
      chat: newChat,
    });
    setMessage('');
  }

  return (
    <div className="mt-auto pb-5 px-8 pt-2">
      <form
        onSubmit={sendMessage}
        className="flex items-center justify-between bg-[#3C393F] p-2 rounded-lg text-white"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="bg-transparent focus:outline-none p-2 flex-1 w-full"
          placeholder="Type a message here"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 p-3 rounded ml-2"
        >
          <IoSend />
        </button>
      </form>
    </div>
  );
}
