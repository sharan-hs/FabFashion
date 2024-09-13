import React from "react";

import { LOGO_URL } from "../utils/constants";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img alt="Logo_Image" className="mb-5 w-48" src={LOGO_URL} />
          <p className="w-full md:w-2/3 text-gray-600">
            Your fashion destination for the latest trends and timeless
            classics.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+ 91-123-1123-123</li>
            <li>fabfashion@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          &copy; FabFashion 2024. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
