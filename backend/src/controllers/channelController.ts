import type { NextFunction, Request, Response } from "express";
import channelService from "../services/channelService";
import { IChannel, channelSchemaType } from "../models/Channel";
import CustomError from "../helpers/CustomError";

interface ChannelParams {
  channelId: string;
}

interface TypedReqBody<T> extends Request {
  body: T;
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

export const createNewChannel = async (
  req: TypedReqBody<IChannel>,
  res: Response,
  next: NextFunction
) => {
  try {
    const channelInput = req.body;

    if (channelSchemaType.safeParse(channelInput).success) {
      await channelService.createChannel(channelInput);
      res.json({
        message: "Successfully created",
      });
    }

    const error = new CustomError(
      "Some input is blank, fill the required input",
      400
    );
    next(error);
  } catch (error) {
    const err = new CustomError("Internal server error", 500);
    next(err);
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
