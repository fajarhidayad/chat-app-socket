import { useEffect, useState } from 'react';
import ChatBox from '../components/ChatBox';
import ChatInput from '../components/ChatInput';
import ModalLayout from '../components/ModalLayout';
import Sidebar from '../components/Sidebar';
import { useChannelStore } from '../store/channelStore';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function Home() {
  const [modal, setModal] = useState(false);
  const selectedChannel = useChannelStore((state) => state.selectedChannel);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <main className="flex h-screen bg-lightgrey relative">
      {modal && <ModalLayout setModalOff={() => setModal(false)} />}
      <Sidebar setModal={() => setModal(true)} />

      <section className="flex-1 flex flex-col">
        <nav className="shadow-md flex justify-between items-center px-8 text-white h-20">
          <h3 className="font-bold text-lg">
            {selectedChannel
              ? selectedChannel.name
              : 'React + Socket.io Chat App'}
          </h3>
        </nav>

        {selectedChannel ? (
          <>
            <ChatBox />
            <ChatInput />
          </>
        ) : (
          <WelcomeMessage />
        )}
      </section>
    </main>
  );
}

const WelcomeMessage = () => {
  return (
    <div className="text-gray-200 flex items-center justify-center h-full">
      <div className="text-center rounded-xl p-9 bg-darkgrey">
        <h1 className="text-xl mb-2">Welcome to the chat app</h1>
        <p>Click on a channel to start chatting</p>
      </div>
    </div>
  );
};
