import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RelatedProducts from "../components/RelatedProducts";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import { addToCart } from "../redux/cartSlice";
import { toast } from "react-toastify";
import { addToWishlist, removeFromWishList } from "../redux/wishlistSlice";
import { DULL_STAR_ICON, STAR_ICON_URL } from "../utils/constants";

const Product = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { wishlist } = useSelector((store) => store.wishlist);
  const [wishListAdded, setWishListAdded] = useState(false);

  const { products } = useSelector((state) => state.products);

  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");

  const [size, setSize] = useState("");
  const [rating, setRating] = useState("");
  const [starArray, setStarArray] = useState([]);

  useEffect(() => {
    const wishlistAdded = wishlist.findIndex((item) => item._id === productId);
    if (wishlistAdded >= 0) {
      setWishListAdded(true);
    }
  }, [wishlist, productId]);

  useEffect(() => {
    setStarArray(ratingHandler(rating));
  }, [rating]);

  const ratingHandler = (star) => {
    const ratingArray = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        ratingArray.push(1);
      } else {
        ratingArray.push(0);
      }
    }

    return ratingArray; // Return the filled rating array
  };

  useEffect(() => {
    fetchProducts();
    const selectedProduct = products.find((item) => item._id === productId);
    setProductData(selectedProduct);
    setImage(selectedProduct?.image[0]);
    setRating(selectedProduct?.rating);
  }, [productId, products]);

  const cartHandler = (productData) => {
    if (size) {
      dispatch(addToCart({ productData, size }));
      toast.success("Added to Cart!");
    } else {
      toast.error("Select a Size");
    }
  };
  const wishListHandler = (product) => {
    if (wishListAdded) {
      dispatch(removeFromWishList({ product, size }));
      toast.success("Removed from Wishlist!");
      setWishListAdded(!wishListAdded);
    } else {
      if (size) {
        dispatch(addToWishlist({ product, size }));
        toast.success("Added to Wishlist!");
        setWishListAdded(!wishListAdded);
      } else {
        toast.error("Select a Size");
      }
    }
  };

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer "
                alt="Product_Image"
              />
            ))}
          </div>

          <div className="w-full sm:w-[80%]">
            <img src={image} className="w-full h-auto" alt="Product_Image" />
          </div>
        </div>

        {/* Product INFO */}

        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData?.name}</h1>

          <div className="flex items-center gap-1 mt-2">
            {starArray?.map((item, index) => (
              <img
                src={`${item > 0 ? STAR_ICON_URL : DULL_STAR_ICON}`}
                alt="Rating_Icon"
                className="w-3"
                key={index}
              />
            ))}

            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {"$"} {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md: w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? "border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => cartHandler(productData)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>
          <button
            onClick={() => wishListHandler(productData)}
            className="bg-white text-black border border-black mx-5 px-3 sm:px-8 py-3 text-sm active:bg-gray-700"
          >
            {wishListAdded ? "Remove From WishList" : "Add to Wishlist"}
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
