import Channel, { IChannel } from "../models/Channel";

const getAllChannels = async () => {
  try {
    const channels: IChannel[] = await Channel.find();
    return channels;
  } catch (error) {
    console.error(error);
  }
};

const createChannel = async (data: IChannel) => {
  try {
    const channel = new Channel(data);

    await channel.save();
  } catch (error) {
    console.error(error);
  }
};

export default {
  getAllChannels,
  createChannel,
};
