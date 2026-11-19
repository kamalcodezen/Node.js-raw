import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import routerHandler from "./routes/routes.js";

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    //* console.log("Request : ", req);
    //*  console.log("Response : ", res);

    //* console.log(req.url); "/" , "/products" , "/orders"
    //*console.log(req.method); GET , POST , PUT ,PATCH

    routerHandler(req, res);
  },
);

server.listen(5000, () => {
  console.log("server is running successfully raw-nodeJs");
});
