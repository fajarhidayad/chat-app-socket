import { useState } from 'react';
import ModalLayout from './components/ModalLayout';
import Sidebar from './components/Sidebar';
import { IoSend } from 'react-icons/io5';
import { useChannelStore } from './store/channelStore';

const ChatBox = () => {
  return (
    <li className="flex items-start mb-8">
      <span className="bg-darkgrey rounded-full h-12 w-12 flex items-center justify-center font-semibold mr-5 flex-shrink-0">
        W
      </span>
      <div className="max-w-4xl flex-shrink">
        <div className="flex items-center space-x-4 text-[#828282] mb-2">
          <h3 className="font-bold">Daniel Wellington</h3>
          <p className="text-xs">today at 2:50 PM</p>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
          sapiente. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Eveniet, sapiente. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Eveniet, sapiente.
        </p>
      </div>
    </li>
  );
};

function App() {
  const [modal, setModal] = useState(false);
  const selectedChannel = useChannelStore((state) => state.selectedChannel);

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

        <ul className="flex-1 flex flex-col-reverse text-white px-8 overflow-y-scroll">
          <ChatBox />
        </ul>

        <div className="mt-auto pb-5 px-8 pt-2">
          <div className="flex items-center justify-between bg-[#3C393F] p-2 rounded-lg text-white">
            <input
              className="bg-transparent focus:outline-none p-2 flex-1 w-full"
              placeholder="Type a message here"
            />
            <button className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 p-3 rounded ml-2">
              <IoSend />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
