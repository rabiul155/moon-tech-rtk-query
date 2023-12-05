import axios from "../../util/axios.config";

export const fetchProducts = async () => {
  const data = await axios.get("/products");
  console.log(data);
  return data.data.data;
};

export const postProduct = (product) => {
  const res = axios.post("/product", product);
  return res;
};
