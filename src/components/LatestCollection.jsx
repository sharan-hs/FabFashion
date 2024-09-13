import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Title from "./Title";
import ProductItem from "./ProductItem";
import { fetchProducts } from "../redux/productSlice";

const LatestCollection = () => {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover the latest trends and styles in our exclusive fashion
          collection.
        </p>
      </div>

      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {products?.slice(-10)?.map((item) => (
          <ProductItem
            key={item?._id}
            id={item?._id}
            image={item?.image}
            name={item?.name}
            price={item?.price}
            rating={item?.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
