import { Router } from "express";
import {
  createNewChannel,
  deleteChannel,
  getAllChannels,
  updateChannel,
} from "../controllers/channelController";

const router = Router();

// Get all channels
router.get("/", getAllChannels);

// Create new channel
router.post("/", createNewChannel);

// Update a channel
router.put("/:channelId", updateChannel);

// Delete a channel
router.delete("/:channelId", deleteChannel);

export default router;
