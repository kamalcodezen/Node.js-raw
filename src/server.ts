import { createServer, IncomingMessage, Server, ServerResponse } from "http";

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    // console.log("Request : ", req);
    //   console.log("Response : ", res);

    // console.log(req.url); "/" , "/products" , "/orders"
    // console.log(req.method); GET , POST , PUT ,PATCH

    const url = req.url;
    const method = req.method;

    if (url === "/" && method === "GET") {
      //   console.log("This route root method");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "This route is root" }));
    } else if (url?.startsWith("/products")) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "This is products route" }));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "This route is not defined" }));
    }
  },
);

server.listen(5000, () => {
  console.log("server is running successfully raw-nodeJs");
});
