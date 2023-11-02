import { Router } from 'express';
import {
  addMessage,
  createNewChannel,
  deleteChannel,
  getAllChannels,
  getChannelById,
  getMessagesFromChannel,
  updateChannel,
} from '../controllers/channelController';

const router = Router();

// Get all channels
router.get('/', getAllChannels);

// Create new channel
router.post('/', createNewChannel);

// Get channel by id
router.get('/:channelId', getChannelById);

// Update a channel
router.put('/:channelId', updateChannel);

// Delete a channel
router.delete('/:channelId', deleteChannel);

// add message to channel
router.post('/:channelId', addMessage);

// get message from channel
router.get('/:channelId/messages', getMessagesFromChannel);

export default router;
