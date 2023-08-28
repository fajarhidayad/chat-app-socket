import type { Request, Response } from "express";
import channelService from "../services/channelService";

export const getAllChannels = async (req: Request, res: Response) => {
  const channels = await channelService.getAllChannels();
  res.json({
    data: {
      channels,
    },
  });
};

export const createNewChannel = async (req: Request, res: Response) => {
  try {
    await channelService.createChannel();
    res.json({
      message: "Successfully created",
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateChannel = (req: Request, res: Response) => {
  const { channelId } = req.params;
  res.send(`Update channel ${channelId}`);
};

export const deleteChannel = (req: Request, res: Response) => {
  const { channelId } = req.params;
  res.send(`Delete channel ${channelId}`);
};
