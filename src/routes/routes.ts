import type { IncomingMessage, ServerResponse } from "http";
import productsController from "../controller/products.controller";

const routerHandler = (req: IncomingMessage, res: ServerResponse) => {
    
  const url = req?.url;
  const method = req?.method;

  if (url === "/" && method === "GET") {

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "This route is root route" }));
    
  } else if (url?.startsWith("/products")) {

    // * products -> GET,POST,PUT,PATCH
    productsController(req, res);

  } else {

    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "This route is not defined" }));

  }
};

export default routerHandler;
