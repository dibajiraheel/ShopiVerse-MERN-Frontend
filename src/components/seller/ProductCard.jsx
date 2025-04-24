import { useForm, Controller } from "react-hook-form";
import Input from "../Input";
import Button from "../Button"; 
import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({
  itemName,
  itemPrice,
  itemId,
  itemImage,
  stock,
  sold,
  isSubmitting,
  handleIncreaseStock,
  handleDecreaseStock,
  activePageNo,
}) => {

  const themeMode = useSelector(state => state.themeStore.mode);

  const { control, handleSubmit } = useForm();


  return (
    <div
      className={`w-full max-w-md mx-auto p-6 rounded-2xl transition-all duration-300 shadow-lg border
        ${themeMode === "dark"
          ? "bg-transparent border-white/10 text-white hover:border-white"
          : "bg-gradient-to-br from-white to-gray-100 border-gray-200 text-gray-800 hover:border-gray-400"} shadow-lg shadow-black hover:shadow-2xl hover:shadow-purple-400 scale-90 hover:scale-95 duration-700 backdrop-blur-lg`}
    >
      {/* Image and ID */}
      <Link to={`/seller/item/${itemId}/${activePageNo}`}>
      
        <div className="flex items-center gap-4 mb-6">
            <img
            src={itemImage ? itemImage : "https://via.placeholder.com/80?text=Product"}
            alt="Product"
            className="w-20 h-20 object-cover rounded-xl border border-gray-300 dark:border-white/10"
            />
            <div>
            <h2 className="text-xl font-semibold tracking-tight">
                {itemName ? itemName : "Unnamed Product"}
            </h2>
            <p className="text-sm opacity-70 mt-1">
                ID: {itemId ? itemId : "Unknown ID"}
            </p>
            </div>
        </div>
      
      </Link>

      {/* Price & Stock */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
        <p className="text-base font-medium">
          Price: <span className="font-semibold">Rs {itemPrice ? itemPrice : "0"}</span>
        </p>
        <p className="text-base font-medium">
          In Stock: <span className="font-semibold">{stock !== undefined ? stock : "N/A"}</span>
        </p>
      </div>

      {/* Sold Count */}
      <div className="mb-6">
        <p className="text-base font-medium">
          Sold: <span className="font-semibold">{sold !== undefined ? sold : "0"}</span>
        </p>
      </div>

      {/* Controller + Buttons */}
      <form>

        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-3">
            <Controller
            name="stockNumber"
            control={control}
            rules={{ required: true, min: 0 }}
            render={({ field }) => (
                <Input
                placeholder="Quantity"
                type="number"
                value={field.value}
                onChange={(e) => {
                    const currentValue = Number(e.target.value);
                    if (currentValue < 0) field.onChange(0);
                    else field.onChange(currentValue);
                }}
                label="Qty"
                inputClasses={`w-24 px-3 py-2 rounded-lg border text-sm 
                    ${themeMode === "dark" 
                    ? "bg-transparent text-white font-bold dark:border-white/25" 
                    : "bg-white text-gray-800 border-gray-300"}`}
                labelClasses={`text-sm font-medium mb-1 block 
                    ${themeMode === "dark" ? "text-white" : "text-gray-700"}`} 
                />
            )}
            />
            <div className="flex gap-3">
            <Button
                id={itemId}
                text={`${isSubmitting ? '😀' : 'Increase'}`}
                classes={`${
                          themeMode == "dark"
                            ? "bg-transparent border border-green-500"
                            : "bg-green-500"
                        } rounded-md hover:bg-green-600 hover:bg-green-800`}
                onClick={handleSubmit(handleIncreaseStock)}
                disabled={isSubmitting}
            />
            <Button
                id={itemId}
                text={`${isSubmitting ? '😢' : 'Decrease'}`}
                classes={`${
                          themeMode == "dark"
                            ? "bg-transparent border border-red-500"
                            : "bg-red-500"
                        } rounded-md hover:bg-red-600 hover:bg-red-800`}
                onClick={handleSubmit(handleDecreaseStock)}
                disabled={isSubmitting}
            />
            </div>
        </div>

      </form>
      
    </div>
  );
};

export default ProductCard;
