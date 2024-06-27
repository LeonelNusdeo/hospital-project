import express from "express";
import cors from "cors";
import router from "./routes/indexRouter";

const server = express();

server.use(express.json());
server.use(cors({ origin: '*' }));

server.use(router);


export default server;