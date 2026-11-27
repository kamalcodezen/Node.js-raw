import type { IProducts } from "../types/products";
import { bodyParser } from "../utils/parseBody";
import { responseSend } from "../utils/sendResponse";
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

    try {
      responseSend(res, true, 200, "products is available", products);
    } catch (error) {
      responseSend(res, false, 500, "Internal server error");
    }

    // * GET Single products
  } else if (method === "GET" && id !== null) {
    // * Service ke call kore data nilam
    const products = productsService();

    const product = products.find((p: IProducts) => p.id === id);

    if (!product) {
      responseSend(res, false, 404, "Product not found");
    }

    try {
      responseSend(res, true, 200, "Single product is available", product);
    } catch (error) {
      responseSend(res, false, 500, "Internal server error");
    }

    // * POST ->  products data insert
  } else if (method === "POST" && url === "/products") {
    // *
    const body = await bodyParser(req);

    const newProducts = {
      id: Date.now(),
      ...body,
    };

    const products = productsService(); //*[{},{}]
    products.push(newProducts); //* [{},{},{new products}]

    //* database update
    createProducts(products);

    try {
      responseSend(
        res,
        true,
        201,
        "Products created successfully",
        newProducts,
      );
    } catch (error) {
      responseSend(res, false, 500, "Internal server error");
    }

    // * PUT -> Products Update
  } else if (method === "PUT" && id !== null) {
    const body = await bodyParser(req);

    const products = productsService(); //*[{},{},{}]

    // * index find
    const index = products.findIndex((p: IProducts) => p.id === id);

    if (index < 0) {
      responseSend(res, false, 404, "Product not found");
    }

    products[index] = { id: products[index].id, ...body };

    //* database update
    createProducts(products);

    try {
      responseSend(
        res,
        true,
        200,
        "Product update successfully",
        products[index],
      );
    } catch (error) {
      responseSend(res, false, 500, "Internal server error");
    }

    // * Delete ->
  } else if (method === "DELETE" && id !== null) {
    const products = productsService(); //*[{},{},{}]

    // * index find
    const index = products.findIndex((p: IProducts) => p.id === id);

    if (index < 0) {
      responseSend(res, false, 404, "Product not found");
    }

    products.splice(products[index], 1);

    //* products update
    createProducts(products);

    try {
      responseSend(res, true, 200, "Product deleted successfully");
    } catch (error) {
      responseSend(res, false, 500, "Internal server error");
    }
  }
};

export default productsController;
