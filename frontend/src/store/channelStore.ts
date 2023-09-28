import { create } from 'zustand';

export interface Channel {
  name: string;
  description: string;
  _id: string;
}

interface ChannelState {
  channels: Channel[];
  selectedChannel: Channel | undefined;
  setChannel: (channels: Channel[]) => void;
  setSelectedChannel: (channel: Channel | undefined) => void;
}

export const useChannelStore = create<ChannelState>((set) => ({
  channels: [],
  selectedChannel: undefined,
  setChannel: (channels) => set(() => ({ channels })),
  setSelectedChannel: (channel) => set(() => ({ selectedChannel: channel })),
}));
