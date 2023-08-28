import Channel, { IChannel } from "../models/Channel";

const getAllChannels = async () => {
  try {
    const channels: IChannel[] = await Channel.find();
    return channels;
  } catch (error) {
    console.error(error);
  }
};

const createChannel = async () => {
  try {
    const channel = new Channel({
      name: "Hello World",
      description: "Sample channel",
    });

    await channel.save();
  } catch (error) {
    console.error(error);
  }
};

export default {
  getAllChannels,
  createChannel,
};
