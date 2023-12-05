import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard";
import { toggle, toggleBrand } from "../../features/filter/filterSlice";
import { getProducts } from "../../features/products/productsSlice";
import axios from "../../util/axios.config";
import { useGetProductsQuery } from "../../features/api/productApi";

const Home = () => {
  const filters = useSelector((state) => state.filter);

  const { brands, stock } = filters;
  const dispatch = useDispatch();

  const { isError, isLoading, data, isSuccess, error } = useGetProductsQuery();

  const products = data?.data;

  // const [products, setProducts] = useState([]);
  // const fetchProduct = async () => {
  //   const data = await axios.get("/products");
  //   setProducts(data.data.data);
  // };

  // useEffect(() => {
  //   fetchProduct();
  // }, []);

  const activeClass = "text-white bg-indigo-500 border-white";

  let content;

  if (isLoading) {
    return <div className=" text-lg text-center m-10">Loading....</div>;
  }

  if (products.length) {
    content = products.map((product) => (
      <ProductCard key={product.model} product={product} />
    ));
  }

  if (products.length && (stock || brands.length)) {
    content = products
      .filter((product) => {
        if (stock) {
          return product.status === true;
        }
        return product;
      })
      .filter((product) => {
        if (brands.length) {
          return brands.includes(product.brand);
        }
        return product;
      })
      .map((product) => <ProductCard key={product.model} product={product} />);
  }

  return (
    <div className="max-w-7xl gap-14 mx-auto my-10">
      <div className="mb-10 flex justify-end gap-5">
        <button
          onClick={() => dispatch(toggle())}
          className={`border px-3 py-2 rounded-full font-semibold ${
            stock ? activeClass : null
          } `}
        >
          In Stock
        </button>
        <button
          onClick={() => dispatch(toggleBrand("amd"))}
          className={`border px-3 py-2 rounded-full font-semibold ${
            brands.includes("amd") ? activeClass : null
          }`}
        >
          AMD
        </button>
        <button
          onClick={() => dispatch(toggleBrand("intel"))}
          className={`border px-3 py-2 rounded-full font-semibold ${
            brands.includes("intel") ? activeClass : null
          }`}
        >
          Intel
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
        {content}
      </div>
    </div>
  );
};

export default Home;
