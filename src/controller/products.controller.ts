import { productsService } from "./../service/products.service";
import type { IncomingMessage, ServerResponse } from "http";
import type { IProducts } from "../types/products";
import { bodyParser } from "../utils/parseBody";

const productsController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;

  //* console.log(url);

  const urlParams = url?.split("/");

  //* console.log(urlParams); ["","products","1"]

  const id =
    urlParams && urlParams[1] === "products" ? Number(urlParams[2]) : null;

  //* console.log(id);

  // * GET All Products
  if (url === "/products" && method === "GET") {
    const products = productsService();

    res.writeHead(200, { "Content-Type": "application/json" });

    res.end(
      JSON.stringify({
        message: "products is available",
        data: products,
      }),
    );
    // * GET Single products
  } else if (method === "GET" && id !== null) {
    const products = productsService();

    const product = products.find((p: IProducts) => p.id === id);

    res.writeHead(200, { "Content-Type": "application/json" });

    res.end(
      JSON.stringify({
        message: "This is single product",
        data: product,
      }),
    );
  
  
  } else if (method === "POST" && url === "/products") {
    const body = await bodyParser(req);

    console.log(body);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Products Created successfully" }));
  }
};

export default productsController;
