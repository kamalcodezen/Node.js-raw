import type { IProducts } from "../types/products";
import { bodyParser } from "../utils/parseBody";
import { createProducts, productsService } from "./../service/products.service";
import type { IncomingMessage, ServerResponse } from "http";

const productsController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;

  // * console.log(url)   ->    http://localhost:5000/products/1

  const urlParams = url?.split("/"); //* [ '', 'products', '1' ]

  const id =
    urlParams && urlParams[1] === "products" ? Number(urlParams[2]) : null;

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
    // * Service ke call kore data nilam
    const products = productsService();

    const product = products.find((p: IProducts) => p.id === id);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Single product is available",
        data: product,
      }),
    );

    // * POST ->  products data insert
  } else if (method === "POST" && url === "/products") {
    // *
    const body = await bodyParser(req);

    const newProducts = {
      id: Date.now(),
      ...body,
    };

    const products = productsService(); //*[{},{}]
    products.push(newProducts);

    createProducts(products); //* [{},{},{}]

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Products created successfully",
        data: newProducts,
      }),
    );
  }
};

export default productsController;
