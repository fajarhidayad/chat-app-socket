import { Schema, model } from 'mongoose';
import { z } from 'zod';

const messageSchemaType = z.object({
  sender: z.string(),
  message: z.string(),
  timestamp: z.date(),
});

export const channelSchemaType = z.object({
  name: z.string(),
  description: z.string(),
  chat: z.array(messageSchemaType).nullish(),
});

export type IMessage = z.infer<typeof messageSchemaType>;
export type IChannel = z.infer<typeof channelSchemaType>;

const messageSchema = new Schema<IMessage>({
  sender: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now() },
});

const channelSchema = new Schema<IChannel>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  chat: { type: [messageSchema] },
});

const Channel = model<IChannel>('Channel', channelSchema);

export default Channel;
