import ServerlessHttp from "serverless-http";
import { app } from "../server";

export const handler = ServerlessHttp(app);
