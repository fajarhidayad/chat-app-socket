import { useEffect, useState } from 'react';
import { socket } from '../socket';
import type { Chat } from '../types/Chat';
import { format, isToday } from 'date-fns';

const formatDate = (date: number) => {
  if (isToday(date)) return `today at ${format(date, 'HH.mm')}`;
  else {
    return format(date, 'EEE, HH.mm');
  }
};

export default function ChatBox() {
  const [, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState<Chat[]>([]);

  useEffect(() => {
    socket.connect();
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onMessage(chat: Chat) {
      console.log(chat);
      setMessages((messages) => [...messages, chat]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('message', onMessage);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('message', onMessage);
      socket.disconnect();
    };
  }, []);

  return (
    <ul className="flex-1 flex flex-col-reverse text-white px-8 overflow-y-scroll">
      {messages
        .slice()
        .reverse()
        .map((chat) => (
          <li className="flex items-start mb-8" key={String(chat.date)}>
            <span className="bg-darkgrey rounded-full h-12 w-12 flex items-center justify-center font-semibold mr-5 flex-shrink-0">
              W
            </span>
            <div className="max-w-4xl flex-shrink">
              <div className="flex items-center space-x-4 text-[#828282] mb-2">
                <h3 className="font-bold">{chat.name}</h3>
                {/* <p className="text-xs">today at 2:50 PM</p> */}
                <p className="text-xs">{formatDate(chat.date)}</p>
              </div>
              <p>{chat.message}</p>
            </div>
          </li>
        ))}
    </ul>
  );
}
