import CustomError from '../helpers/CustomError';
import Channel, { IChannel, IMessage } from '../models/Channel';

const getAllChannels = async () => {
  const channels: IChannel[] = await Channel.find();
  return channels;
};

const createChannel = async (data: IChannel) => {
  const channel = new Channel(data);

  await channel.save();
};

const getChannelById = async (channelId: string) => {
  const channel = await Channel.findById(channelId);

  if (!channel) {
    const err = new CustomError(`Channel with id ${channelId} not found`, 404);
    return { channel, err };
  }

  return { channel, err: null };
};

const updateChannelById = async (channelId: string, data: IChannel) => {
  await Channel.findByIdAndUpdate(channelId, data);
};

const deleteChannelById = async (channelId: string) => {
  await Channel.findByIdAndDelete(channelId);
};

const addMessage = async (channelId: string, chat: IMessage) => {
  const channel = await Channel.findById(channelId);

  if (!channel) {
    const err = new CustomError(`Channel with id ${channelId} not found`, 404);
    return { channel, err };
  }

  channel.chat?.push(chat);
  await channel.save();

  return { message: 'success', err: null };
};

export default {
  getAllChannels,
  createChannel,
  deleteChannelById,
  getChannelById,
  updateChannelById,
  addMessage,
};
