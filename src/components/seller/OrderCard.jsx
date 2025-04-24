import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import { useSelector } from "react-redux";

const OrderCard = ({
  cardMode,
  orderId,
  itemId,
  itemName,
  itemPrice,
  itemQuantity,
  itemImage,
  amount,
  isCompleted,
  ChangeOrderStatus,
  ViewDeliveryDetails,
  orderDate,
  orderTime,

  
  customerName,
  customerAddress,
  phoneNo,
  province,
  city,
  ViewOrderDetails,
}) => {
  const themeMode = useSelector((state) => state.themeStore.mode);

  return (
    <div className={`rounded-2xl transition-all duration-300
      ${
        themeMode === "dark"
          ? "border border-white/40"
          : "bg-white border border-gray-300 text-gray-800"
      } shadow-xl hover:shadow-2xl duration-700 shadow-black hover:shadow-purple-600 backdrop-blur-lg scale-90 hover:scale-95`}>
      
      <div className={`mx-4 my-8 md:mx-16 md:my-12 ${cardMode == 'order' ? '' : 'hidden'}`}>
        <div
          
        >
          {/* Order Info */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold mb-1 text-green-400 ">Order Date: {orderDate}</h1>
              <h1 className="text-xl font-bold mb-1 text-green-400 ">OrderTime: {orderTime}</h1>
              <h1 className="text-sm opacity-80">
                Order ID: {orderId}
              </h1>
              <h1 className="text-sm opacity-80">Product ID: {itemId}</h1>
            </div>
            <div className="mt-4 sm:mt-0">
              <span
                className={`inline-block px-4 py-1 text-sm font-semibold rounded-full shadow-sm transition duration-300 ease-in-out
                            ${
                              themeMode === "dark"
                                ? `${
                                    isCompleted
                                      ? "border-green-300 text-green-300 bg-green-300/10"
                                      : "border-yellow-400 text-yellow-300 bg-yellow-300/10"
                                  }`
                                : `${
                                    isCompleted
                                      ? "bg-green-500 text-white"
                                      : "bg-yellow-500 text-white"
                                  }`
                            }`}
              >
                {isCompleted ? "Delivered" : "Pending"}
              </span>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col sm:flex-row items-center gap-6 border-t border-b border-white/20 py-6 mt-4">
            <Link>
              <img
                className="w-24 h-24 rounded-xl object-cover shadow-md transform hover:scale-105 transition duration-300"
                src={
                  itemImage
                    ? itemImage
                    : "http://res.cloudinary.com/dyzmv4mqy/image/upload/v1743011810/E%20Commerce/Item/t2vdb315zsielerfsvdz.avif"
                }
                alt="Product"
              />
            </Link>
            <div className="text-center sm:text-left space-y-1">
              <h1 className="text-lg font-semibold">{itemName}</h1>
              <h2 className="text-md opacity-80">
                Price: <span className="font-medium">Rs {itemPrice}</span>
              </h2>
              <h2 className="text-md opacity-80">
                Quantity: <span className="font-medium">{itemQuantity}</span>
              </h2>
            </div>
          </div>

          {/* Total Amount */}
          <div className="mt-6 text-right pr-2">
            <h1 className="text-xl font-bold text-green-400">
              Total Amount:{" "}
              <span className="text-white dark:text-green-300">{amount}</span>
            </h1>
          </div>

          {/* Action Button */}
          <div className="flex flex-col sm:flex-row sm:justify-end items-center gap-4 mt-6">
            <div id={isCompleted ? "true" : "false"}>
              <Button
                classes={`px-6 py-2 rounded-full font-semibold transition duration-300 shadow-md 
                            ${
                              themeMode === "dark"
                                ? `${
                                    isCompleted
                                      ? "border-green-300 text-green-300 hover:bg-green-800/20"
                                      : "border-yellow-400 text-yellow-300 hover:bg-yellow-800/20"
                                  }`
                                : `${
                                    isCompleted
                                      ? "bg-gradient-to-r from-green-400 to-green-600 text-white hover:bg-green-500"
                                      : "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white hover:bg-yellow-500"
                                  }`
                            }`}
                id={orderId}
                text={`Change Order to ${
                  isCompleted ? "Pending" : "Completed"
                }`}
                onClick={ChangeOrderStatus}
              />
            </div>

            <Button
              classes={`px-6 py-2 rounded-full font-semibold transition duration-300 shadow-md
                        ${
                          themeMode === "dark"
                            ? "border-blue-300 text-blue-300 hover:bg-blue-800/20"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
              text="View Delivery Details"
              onClick={() => {ViewDeliveryDetails(orderId)}} // Replace with your actual handler
            />
          </div>
        </div>
      </div>

      <div className={`mx-4 my-8 md:mx-16 md:my-12 ${cardMode == 'delivery' ? '' : 'hidden'}`}>
        <div
          className={`p-6 rounded-2xl transition-all duration-300
            ${
              themeMode === "dark"
                ? "border border-white/40 shadow-xl hover:shadow-2xl"
                : "bg-white border border-gray-300 text-gray-800 shadow-lg hover:shadow-2xl"
            }`}
        >
          {/* Delivery Info Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold mb-1 text-blue-400">
                Delivery Details
              </h1>
              <h1 className="text-sm opacity-80">Recipient Information</h1>
            </div>
            <div className="mt-4 sm:mt-0">
              <span
                className={`inline-block px-4 py-1 text-sm font-semibold rounded-full shadow-sm transition duration-300 ease-in-out
                    ${
                      themeMode === "dark"
                        ? "border-blue-300 text-blue-300 bg-blue-300/10"
                        : "bg-blue-500 text-white"
                    }`}
              >
                Shipping Info
              </span>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="flex flex-col sm:flex-row items-center gap-6 border-t border-b border-white/20 py-6 mt-4">
            <div className="w-24 h-24 rounded-xl flex items-center justify-center bg-gradient-to-tr from-blue-200 to-blue-400 text-white text-2xl font-bold shadow-md">
              📦
            </div>
            <div className="text-center sm:text-left space-y-1">
              <h1 className="text-lg font-semibold">
                {customerName ? customerName : "Raheel"}
              </h1>
              <h2 className="text-md opacity-80">
                Address:{" "}
                <span className="font-medium">
                  {customerAddress ? customerAddress : "123 Street, Model Town"}
                </span>
              </h2>
              <h2 className="text-md opacity-80">
                Phone:{" "}
                <span className="font-medium">
                  {phoneNo ? phoneNo : "0300-1234567"}
                </span>
              </h2>
              <h2 className="text-md opacity-80">
                Province:{" "}
                <span className="font-medium">
                  {province ? province : "Sindh"}
                </span>
              </h2>
              <h2 className="text-md opacity-80">
                City:{" "}
                <span className="font-medium">{city ? city : "Karachi"}</span>
              </h2>
            </div>
          </div>

          {/* Delivery Confirm Button */}
          <div className="flex justify-center sm:justify-end mt-6">
            <Button
              classes={`px-6 py-2 rounded-full font-semibold transition duration-300 shadow-md
                ${
                  themeMode === "dark"
                    ? "border-blue-300 text-blue-300 hover:bg-blue-800/20"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              text="View Order Details"
              onClick={() => {ViewOrderDetails(orderId)}}
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default OrderCard;
