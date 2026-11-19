import type { IncomingMessage, ServerResponse } from "http";
import { productsService } from "../service/products.service";

const productsController = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;

  if (url === "/products" && method === "GET") {
    const products = productsService();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "products is available",
        data: products,
      }),
    );
  }
};

export default productsController;
