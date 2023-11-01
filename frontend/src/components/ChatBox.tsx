import { useEffect, useState } from 'react';
import { socket } from '../socket';
import type { Chat } from '../types/Chat';
import { format, isToday } from 'date-fns';
import { useChannelStore } from '../store/channelStore';
import { getMessagesFromChannel } from '../api/channel';

const formatDate = (date: number | Date) => {
  if (isToday(date)) return `today at ${format(date, 'HH.mm')}`;
  else {
    return format(date, 'EEE, HH.mm');
  }
};

export default function ChatBox() {
  const [, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState<Chat[]>([]);
  const channelId = useChannelStore((state) => state.selectedChannel?._id);

  useEffect(() => {
    socket.connect();

    if (channelId) fetchMessages(channelId);

    async function fetchMessages(id: string) {
      const response = await getMessagesFromChannel(id);
      setMessages(response.data.chat);
    }

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onMessage(newChat: Chat) {
      setMessages((messages) => [...messages, newChat]);
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
          <li className="flex items-start mb-8" key={String(chat.timestamp)}>
            <span className="bg-darkgrey rounded-full h-12 w-12 flex items-center justify-center font-semibold mr-5 flex-shrink-0">
              {chat.sender.slice(0, 1).toUpperCase()}
            </span>
            <div className="max-w-4xl flex-shrink">
              <div className="flex items-center space-x-4 text-[#828282] mb-2">
                <h3 className="font-bold">{chat.sender}</h3>
                {/* <p className="text-xs">today at 2:50 PM</p> */}
                <p className="text-xs">
                  {formatDate(new Date(chat.timestamp))}
                </p>
              </div>
              <p>{chat.message}</p>
            </div>
          </li>
        ))}
    </ul>
  );
}
