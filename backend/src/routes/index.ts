import { Router } from "express";
import channelRoute from "./channelRoute";
import userRoute from "./userRoute";

const routes = Router();

// Channel routes
routes.use("/channel", channelRoute);
routes.use("/user", userRoute);

export default routes;
