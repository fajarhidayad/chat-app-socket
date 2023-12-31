import axios from 'axios';
import { Channel } from '../store/channelStore';

const BASE_URL_API = import.meta.env.VITE_APP_BASE_URL;
const api = axios.create({ baseURL: BASE_URL_API });

export const fetchChannels = async (): Promise<Channel[] | undefined> => {
  try {
    const response = (await api.get('/channel')).data;
    const data = response.data;
    return data.channels as Channel[];
  } catch (error) {
    console.error(error);
  }
};

export const createNewChannel = async (channel: {
  name: string;
  description: string;
}) => {
  const response = await api.post('/channel', channel, {
    headers: { 'Content-Type': 'application/json' },
  });

  return response.data;
};

export const deleteChannel = async (channelId: string) => {
  try {
    const response = await api.delete(`/channel/${channelId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addMessageToChannel = async (
  channelId: string,
  chat: { message: string; sender: string }
) => {
  const response = await api.post(`/channel/${channelId}`, chat, {
    headers: { 'Content-Type': 'application/json' },
  });

  return response.data;
};

export const getMessagesFromChannel = async (channelId: string) => {
  try {
    const response = await api.get(`/channel/${channelId}/messages`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
