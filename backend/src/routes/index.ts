import { Router } from "express";
import channelRoute from "./channelRoute";

const routes = Router();

// Channel routes
routes.use("/channel", channelRoute);

export default routes;
