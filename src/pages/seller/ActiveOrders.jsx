import sellerButtons from "../../utils/SellerNavarbarButtons";
import Navbar from "../../ui components/Navbar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderCard from "../../components/seller/OrderCard";
import SwitchOrderStatus from "../../api/seller/SwitchOrderStatus";
import { getCookie } from "react-use-cookie";
import { AddDeliveryDetailsInStore, AddSellerOrdersInStore, ChangeOrderStatusInStore } from "../../slices/seller/SellerOrderSlice"
import Pagination from "../../components/Pagination";
import GetSellerOrders from "../../api/seller/GetSellerOrders";
import { cardsToDisplayOnOnePage } from "../../constants"
import { UpdateTotalActiveOrdersInSellerDashboardSlice } from "../../slices/seller/SellerDashboardSlice";

const ActiveOrders = () => {

  const themeMode = useSelector(state => state.theme)
  const buttons = sellerButtons();
  const sellerId = getCookie('_id')
  const dispatch = useDispatch()

  
  const [activePageNo, setActivePageNo] = useState(1)

  // get orders from store
  const orders = useSelector(state => state.sellerOrderStore.orders)
  const pagesAddedInStore = useSelector(state => state.sellerOrderStore.pagesAdded)
  const totalOrders = useSelector(state => state.sellerOrderStore.totalOrders)

  const [ordersToDisplay, setOrdersToDisplay] = useState(null)
  const [ordersFetched, setOrdersFetched] = useState(true)
  useEffect(() => {
    console.log('ORDERS FOUND IN STORE', orders);
    console.log(orders.length > 0 );
    console.log(pagesAddedInStore.includes(Number(activePageNo)));

    
    if (orders.length > 0 && pagesAddedInStore.includes(Number(activePageNo))) {
      const itemsFrom = (activePageNo * cardsToDisplayOnOnePage) - cardsToDisplayOnOnePage
      const itemsTo = (activePageNo * cardsToDisplayOnOnePage)
      const filteredOrders = orders.slice(itemsFrom, itemsTo)
      setOrdersToDisplay(filteredOrders)
      setOrdersFetched(true)
      console.log('SET ORDERS TO DISPLAY =', filteredOrders);
    }
    else {
      console.log('SETTING FETCHED ORDERS = FALSE', 'CURRENTLY IT IS', ordersFetched);
      
      setOrdersFetched(false)
    }
  }, [orders, activePageNo])

  // fetch orders from api if not found from store
  const FetchOrders = async () => {
    console.log('FETCHING ORDERS');
    
    const limit = cardsToDisplayOnOnePage
    const skip = (Number(activePageNo) * Number(limit)) - Number(limit)
    const response = await GetSellerOrders(sellerId, skip, limit)
    if (!response) return
    dispatch(AddSellerOrdersInStore({ordersToAdd: response.sellerOrders, totalOrders: response.totalOrders, pageNo: activePageNo}))
    dispatch(AddDeliveryDetailsInStore({deliveryDetails: response.deliveryInfo}))
  }

  useEffect(() => {
    console.log('FETCH ORDER VALUE', ordersFetched);
    
    if (!ordersFetched) {
      FetchOrders()
    }
  }, [ordersFetched])


  // get delivery details from store
  const [deliveryDetails, setDeliveryDetails] = useState({})
  const deliveryDetail = useSelector(state => state.sellerOrderStore.deliveryDetails)
  useEffect(() => {
    const details = {}
    if (ordersToDisplay?.length > 0) { 
      ordersToDisplay.forEach((order) => {
        details[(order._id)] = deliveryDetail[(order._id)]
      })
      setDeliveryDetails(details)
    }
  }, [ordersToDisplay])


  const [cardMode, setCardMode] = useState({})
  useEffect(() => {
    
    if (ordersToDisplay){
      
      let mode = {}
      const totalOrders = ordersToDisplay.length
      for (let i = 0; i < totalOrders; i++) {
          const order = ordersToDisplay[i]
          mode[order._id] = 'order'
      }
  
      setCardMode(mode)
  
      console.log(cardMode);
      
      // console.log('y = ', cardMode[orders[0]._id]);
      
    }

  }, [ordersToDisplay])

  const [pagesFromTo, setPagesFromTo] = useState(null)
  useEffect(() => {

    const lastPage = Math.ceil(Number(totalOrders) / Number(cardsToDisplayOnOnePage))
    setPagesFromTo([1, lastPage])

  }, [totalOrders])

  const handlePaginationClick = (e) => {

    const clickedOn = e.target.ariaLabel
    if (String(clickedOn) == 'Next') setActivePageNo((current) => current + 1)
    else if (String(clickedOn) == 'Previous') setActivePageNo((current) => current - 1)
    else setActivePageNo(Number(clickedOn))

  }

  const ChangeOrderStatus = async (e) => {

    const orderId = e.target.id
    const currentStatus = e.target.parentElement.parentElement.id
    
    console.log('ORDER ID IS', orderId);
    console.log('SELLER ID IS', sellerId);
    console.log('ORDER STATUS CURRENTLY IS', currentStatus, typeof(currentStatus));
    
    
    if (currentStatus == 'true') {

        const response = await SwitchOrderStatus(orderId, sellerId, 'false')
        if (response == 'Invalid Seller Order Id'){
            return
        }
        else if (response == 'Seller Order Do Not Belong To This Seller Id') {
            return
        }
        else if (!response) {
            return
        }
        else if (response) {
            dispatch(ChangeOrderStatusInStore({orderId: orderId, orderStatus: false, pageNo: activePageNo}))
            dispatch(UpdateTotalActiveOrdersInSellerDashboardSlice({update: 'increase'}))
            return
        }
    
    }

    else if (currentStatus == 'false') {

        const response = await SwitchOrderStatus(orderId, sellerId, 'true')
        if (response == 'Invalid Seller Order Id'){
            return
        }
        else if (response == 'Seller Order Do Not Belong To This Seller Id') {
            return
        }
        else if (!response) {
            return
        }
        else if (response) {
            dispatch(ChangeOrderStatusInStore({orderId: orderId, orderStatus: true, pageNo: activePageNo}))
            dispatch(UpdateTotalActiveOrdersInSellerDashboardSlice({'update': 'decrease'}))
            return
        }

    }

  }

  const handleViewDeliveryDetails = (orderId) => {
    setCardMode({...cardMode, [orderId]: 'delivery'})
  }

  const handleViewOrderDetails = (orderId) => {
    setCardMode({...cardMode, [orderId]: 'order'})
  }


  if (ordersToDisplay)
  return (
    <div className="min-w-screen min-h-screen">

      <div>
        <Navbar buttons={buttons} mode={'seller'} dashboardNavigateLink={'/dashboard'} profileUrl={getCookie('profilePicUrl')} profileNavigateLink={'/seller/profile'} />
      </div>

      <div className="pt-20 flex flex-col justify-center items-center">

          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:flex-wrap">

            {
                    
                ordersToDisplay.map((order) => {

                    if (order.isCompleted == false) {
                      
                      return (

                        <div key={order._id}>
                            
                            <OrderCard cardMode={cardMode[order._id]} itemId={order.itemId} orderId={order._id} itemName={order.itemName} itemPrice={order.itemPrice} itemQuantity={order.itemQuantity} isCompleted={order.isCompleted} itemImage={order.itemImage} amount={order.amount} ChangeOrderStatus={ChangeOrderStatus} ViewDeliveryDetails={handleViewDeliveryDetails} ViewOrderDetails={handleViewOrderDetails} orderDate={(new Date((order.createdAt))).toLocaleDateString("en-GB")} orderTime={(new Date((order.createdAt))).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true
                            })} customerName={(deliveryDetails[order._id])?.name} customerAddress={(deliveryDetails[order._id])?.address} city={(deliveryDetails[order._id])?.city} phoneNo={(deliveryDetails[order._id])?.phoneNo} province={(deliveryDetails[order._id])?.phoneNo} />
                            
                        </div>

                      )

                    }

                })
                
            }

          </div>
        
          {
          ordersToDisplay?.length != 0 ?
          
          <div className='mt-6 md:pb-10 flex flex-row justify-center items-center'>
  
            <Pagination activePageNo={activePageNo} pagesFromTo={pagesFromTo} handlePaginationClick={handlePaginationClick} />
  
          </div>

          :
          null
        }  
      
      </div>

    </div>
  )
  else 
  return (
    <div className="min-w-screen min-h-screen">

      <div>
        <Navbar buttons={buttons} mode={'seller'} dashboardNavigateLink={'/dashboard'} profileUrl={getCookie('profilePicUrl')} profileNavigateLink={'/seller/profile'} />
      </div>

      <div className={`pt-30 flex flex-row justify-center items-center text-4xl italic font-extrabold ${themeMode == 'dark' ? 'text-white' : 'text-black'}`}> 
          <h1>Currently You Do Not Have Any Orders 🙄</h1>
      </div>

    </div>
  )

}

export default ActiveOrders
