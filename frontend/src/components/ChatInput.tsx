import { IoSend } from 'react-icons/io5';
import { socket } from '../socket';
import React, { useRef, useState } from 'react';
import type { Chat } from '../types/Chat';
import { useAuthStore } from '../store/authStore';
import { useChannelStore } from '../store/channelStore';
import { addMessageToChannel } from '../api/channel';

export default function ChatInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const user = useAuthStore((state) => state.user);
  const channel = useChannelStore((state) => state.selectedChannel);
  const [message, setMessage] = useState('');

  function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (message === '') return;
    const today = Date.now();
    const newChat: Chat = {
      sender: user,
      message,
      timestamp: today,
    };
    socket.emit('channelMessage', {
      channel: channel?._id,
      chat: newChat,
    });
    addMessageToChannel(channel?._id as string, newChat);
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
          ref={inputRef}
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
