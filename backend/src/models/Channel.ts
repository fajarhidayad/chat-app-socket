import { Schema, model } from "mongoose";
import { z } from "zod";

export const channelSchemaType = z.object({
  name: z.string(),
  description: z.string(),
});

export type IChannel = z.infer<typeof channelSchemaType>;

const channelSchema = new Schema<IChannel>({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const Channel = model<IChannel>("Channel", channelSchema);

export default Channel;
