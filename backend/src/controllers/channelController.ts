import type { NextFunction, Request, Response } from "express";
import channelService from "../services/channelService";
import { IChannel, channelSchemaType } from "../models/Channel";
import CustomError from "../helpers/CustomError";
import asyncHandler from "../helpers/asyncHandler";

interface ChannelParams {
  channelId: string;
}

interface TypedReqBody<T> extends Request {
  body: T;
}

export const getAllChannels = asyncHandler(
  async (req: Request, res: Response) => {
    const channels = await channelService.getAllChannels();
    res.json({
      data: {
        channels,
      },
    });
  }
);

export const getChannelById = asyncHandler(
  async (req: Request<ChannelParams>, res: Response, next: NextFunction) => {
    const { channelId } = req.params;
    const { channel, err } = await channelService.getChannelById(channelId);

    if (err) {
      return next(err);
    }

    res.json({
      data: {
        channel,
      },
    });
  }
);

export const createNewChannel = asyncHandler(
  async (req: TypedReqBody<IChannel>, res: Response, next: NextFunction) => {
    const channelInput = req.body;
    const checkInput = channelSchemaType.safeParse(channelInput);

    if (checkInput.success) {
      await channelService.createChannel(channelInput);
      return res.json({
        status: "success",
        message: "Successfully created channel",
      });
    }

    const error = new CustomError(
      "Some input is blank, fill the required input",
      400
    );
    next(error);
  }
);

export const updateChannel = asyncHandler(
  async (
    req: Request<ChannelParams, never, IChannel>,
    res: Response,
    next: NextFunction
  ) => {
    const { channelId } = req.params;
    const input = channelSchemaType.safeParse(req.body);

    if (!input.success) {
      const err = new CustomError("Some required field is empty", 400);
      return next(err);
    }

    const { err } = await channelService.getChannelById(channelId);
    if (err) {
      return next(err);
    }

    await channelService.updateChannelById(channelId, input.data);

    res.json({
      status: "success",
      message: "Successfully update channel.",
    });
  }
);

export const deleteChannel = asyncHandler(
  async (req: Request<ChannelParams>, res: Response, next: NextFunction) => {
    const { channelId } = req.params;
    const { err } = await channelService.getChannelById(channelId);

    if (err) {
      return next(err);
    }

    await channelService.deleteChannelById(channelId);
    res.json({
      status: "success",
      message: "Channel successfully deleted.",
    });
  }
);
