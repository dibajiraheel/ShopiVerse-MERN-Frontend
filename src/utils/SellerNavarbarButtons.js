import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getCookie } from "react-use-cookie"
// import { FetchSellerItems } from "../slices/SellerItemSlice"



const sellerButtons = () => {
  
  const themeMode = useSelector(state => state.themeStore.mode)
  const navigate = useNavigate()

  const sellerId = getCookie('_id');
  const dispatch = useDispatch()

  const buttonsToReturn = [
      
      {
        classes: `${
          themeMode == "dark"
            ? "bg-transparent border border-green-500"
            : "bg-green-500"
        } rounded-md hover:bg-green-600 hover:bg-green-800`,
        text: "Add New Product",
        onClick: () => {
          // dispatch(FetchSellerItems(sellerId))
          navigate('/seller/add-new-product')
          },
      },
  
      {
        classes: `${
          themeMode == "dark"
            ? "bg-transparent border border-blue-500"
            : "bg-blue-500"
        } rounded-md hover:bg-blue-600 hover:bg-blue-800`,
        text: "All Products",
        onClick: () => {
          // dispatch(FetchSellerItems(sellerId))
          navigate('/seller/all-products')
        }
      },
  
      {
        classes: `${
          themeMode == "dark"
              ? "bg-transparent border border-yellow-500"
              : "bg-yellow-500"
          } rounded-md hover:bg-yellow-600 hover:bg-yellow-800`,
          text: "All Orders",
          onClick: () => (navigate('/seller/all-orders')),
      },
  
      // {
      //   classes: `${
      //     themeMode == "dark"
      //         ? "bg-transparent border border-purple-500"
      //         : "bg-purple-500"
      //     } rounded-md hover:bg-purple-600 hover:bg-purple-800`,
      //     text: "Active Orders",
      //     onClick: () => (navigate('/seller/active-orders')),
      // }
  
  ]

  return buttonsToReturn

}

export default sellerButtons


