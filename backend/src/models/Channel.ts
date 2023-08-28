import { Schema, model } from "mongoose";

export interface IChannel {
  name: string;
  description: string;
}

const channelSchema = new Schema<IChannel>({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const Channel = model<IChannel>("Channel", channelSchema);

export default Channel;
