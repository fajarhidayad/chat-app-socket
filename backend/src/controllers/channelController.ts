import type { Request, Response } from "express";
import channelService from "../services/channelService";

interface ChannelParams {
  channelId: string;
}

export const getAllChannels = async (req: Request, res: Response) => {
  try {
    const channels = await channelService.getAllChannels();
    res.json({
      data: {
        channels,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const createNewChannel = async (req: Request, res: Response) => {
  try {
    await channelService.createChannel();
    res.json({
      message: "Successfully created",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateChannel = (req: Request<ChannelParams>, res: Response) => {
  const { channelId } = req.params;
  res.send(`Update channel ${channelId}`);
};

export const deleteChannel = (req: Request<ChannelParams>, res: Response) => {
  const { channelId } = req.params;
  res.send(`Delete channel ${channelId}`);
};
