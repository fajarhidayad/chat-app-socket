import { Router } from "express";
import {
  createNewChannel,
  deleteChannel,
  getAllChannels,
  getChannelById,
  updateChannel,
} from "../controllers/channelController";

const router = Router();

// Get all channels
router.get("/", getAllChannels);

// Create new channel
router.post("/", createNewChannel);

// Get channel by id
router.get("/:channelId", getChannelById);

// Update a channel
router.put("/:channelId", updateChannel);

// Delete a channel
router.delete("/:channelId", deleteChannel);

export default router;
