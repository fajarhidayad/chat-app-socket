import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronUp, FaPlus, FaSearch } from 'react-icons/fa';
import { fetchChannels } from '../api/channel';
import { Channel, useChannelStore } from '../store/channelStore';
import { useAuthStore } from '../store/authStore';
import { socket } from '../socket';

const Sidebar = (props: { setModal: () => void }) => {
  const { channels, setChannel, selectedChannel, setSelectedChannel } =
    useChannelStore((state) => state);
  const user = useAuthStore((state) => state.user);

  const { data, isFetched } = useQuery({
    queryKey: ['channels'],
    queryFn: fetchChannels,
  });

  useEffect(() => {
    if (isFetched && data) {
      setChannel(data);
    }
  }, [isFetched, data, setChannel, setSelectedChannel]);

  return (
    <aside className="bg-darkgrey w-[325px] flex flex-col ">
      <nav className="shadow-md flex justify-between items-center px-6 text-white h-20">
        {selectedChannel ? (
          <div className="flex items-center">
            <button
              className="text-xl mr-4"
              onClick={() => setSelectedChannel(undefined)}
            >
              <FaChevronLeft />
            </button>
            <h3 className="font-bold text-lg">All Channels</h3>
          </div>
        ) : (
          <>
            <h3 className="font-bold text-lg">Channels</h3>
            <button
              onClick={props.setModal}
              className="bg-lightgrey rounded-lg w-10 h-10 flex items-center justify-center"
            >
              <FaPlus />
            </button>
          </>
        )}
      </nav>

      {selectedChannel && (
        <section className="py-5 px-6 text-white">
          <h2 className="text-lg font-medium mb-5">{selectedChannel.name}</h2>
          <p className="text-slate-300 mb-10">{selectedChannel.description}</p>

          {/* <h3 className="text-lg font-medium mb-5">Members</h3>
          <ul className="flex flex-col gap-5">
            <li>
              <p className="text-slate-300">Yuno</p>
            </li>
          </ul> */}
        </section>
      )}

      {!selectedChannel && channels && <ChannelList channels={channels} />}

      <div className="mt-auto bg-[#0B090C] px-6 py-3 text-white flex items-center">
        <span className="bg-lightgrey rounded-full h-12 w-12 flex items-center justify-center font-semibold mr-3">
          {user.slice(0, 1).toUpperCase()}
        </span>
        <p>{user}</p>
        <button className="ml-auto h-10 w-10 hover:bg-lightgrey flex items-center justify-center rounded-full">
          <FaChevronUp />
        </button>
      </div>
    </aside>
  );
};

const ChannelList = (props: { channels: Channel[] }) => {
  const [channelInput, setChannelInput] = useState('');
  const setSelectedChannel = useChannelStore(
    (state) => state.setSelectedChannel
  );

  const searchChannel = () => {
    const filteredChannel = props.channels.filter((channel) =>
      channel.name.toLowerCase().includes(channelInput)
    );
    return filteredChannel;
  };

  return (
    <section className="py-5 px-6 text-white">
      <div className="flex items-center rounded-lg bg-lightgrey p-3 space-x-2 mb-8">
        <FaSearch />
        <input
          value={channelInput}
          onChange={(e) => setChannelInput(e.target.value)}
          className="bg-transparent focus:outline-0 font-medium w-full flex-1"
          placeholder="Search channel"
        />
      </div>

      <ul>
        {searchChannel().map((item) => (
          <ChannelItem
            key={item._id}
            channel={item}
            onClickSelectedChannel={() => {
              socket.emit('joinChannel', item.name);
              setSelectedChannel(item);
            }}
          />
        ))}
      </ul>
    </section>
  );
};

const ChannelItem = (props: {
  channel: Channel;
  onClickSelectedChannel: () => void;
}) => {
  const getInitial = (char: string) => {
    const initial = char.split(' ');

    if (initial.length > 2) {
      return initial[0][0] + initial[1][0];
    }
    return initial[0][0];
  };

  return (
    <li
      onClick={props.onClickSelectedChannel}
      className="hover:bg-lightgrey/50 px-2 py-3 rounded-lg flex items-center space-x-3 hover:cursor-pointer"
    >
      <span className="bg-lightgrey uppercase rounded-full h-12 w-12 flex items-center justify-center font-semibold">
        {getInitial(props.channel.name)}
      </span>
      <h3 className="font-bold">{props.channel.name}</h3>
    </li>
  );
};

export default Sidebar;
