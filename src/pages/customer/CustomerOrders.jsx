import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../../components/customer/Navbar'
import React, { useEffect, useState } from 'react'
import GetCustomerOrders from '../../api/customer/GetCustomerOrders'
import { getCookie } from 'react-use-cookie'
import { AddOrdersInCustomerSlice } from '../../slices/customer/CustomerOrdersSlice'
import OrderCard from '../../components/customer/OrderCard'
import Pagination from '../../components/Pagination'
import { cardsToDisplayOnOnePage } from '../../constants'
import CheckBox from '../../components/CheckBox'

const CustomerOrders = () => {

  // Get theme mode from store
  const themeMode = useSelector(state => state.themeStore.mode)

  // Get All Orders From Store
  const orders = useSelector(state => state.customerOrdersStore.orders)
  const pagesFetched = useSelector(state => state.customerOrdersStore.pagesAdded)
  const totalOrders = useSelector(state => state.customerOrdersStore.totalOrders)

  // pages
    
  const [pageNo, setPageNo] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  useEffect(() => {
    if (totalOrders >= 0) {
      const pagesRequired = (Math.ceil(((Number(totalOrders)) / Number(cardsToDisplayOnOnePage))))
      setTotalPages(pagesRequired)
    }
  }, [totalOrders])
  
  const handlePaginationClick = (e) => {  
    const pageClicked = e.target.ariaLabel
    if (pageClicked == 'Next') {
      setPageNo((currentPageNo) => Number(currentPageNo) + 1)
    }
    else if (pageClicked == 'Previous') {
      setPageNo((currentPageNo) => Number(currentPageNo) - 1)
    }
    else {
      setPageNo((Number(pageClicked)))
    }
  }


  // set orders to display

  const [ordersToDisplay, setOrdersToDisplay] = useState([])

  const [ordersFoundInStore, setOrdersFoundInStore] = useState(true)
  useEffect(() => {
    if (pagesFetched.includes((Number(pageNo)))) {
      const ordersIndexFrom = ((Number(pageNo) * Number(cardsToDisplayOnOnePage)) - Number(cardsToDisplayOnOnePage))
      const ordersIndexTo = (Number(pageNo) * Number(cardsToDisplayOnOnePage))
      const ordersFound = orders.slice(ordersIndexFrom, ordersIndexTo)
      if (ordersFound.length > 0) {
        setOrdersToDisplay(ordersFound)
        setOrdersFoundInStore(true)
        setOrdersFetchedFromApi(false)
      }
    }
    else {
      if (!ordersFetchedFromApi){
        setOrdersFoundInStore(false)
      }
    }
  }, [orders, pageNo])

  // Fetch Orders From Api
  const [ordersFetchedFromApi, setOrdersFetchedFromApi] = useState(false)
  const userId = useSelector(state => state.authenticationStore.userId)
  
  const dispatch = useDispatch()
  const FetchCustomerOrders = async (userId) => {
    const skip = (((Number(pageNo)) * (Number(cardsToDisplayOnOnePage)) - (Number(cardsToDisplayOnOnePage))))
    const limit = Number(cardsToDisplayOnOnePage)
    const response = await GetCustomerOrders(userId, skip, limit)
    if (!response) return false
    dispatch(AddOrdersInCustomerSlice({newOrders: response.orders, pageNo: pageNo, totalOrders: response.totalOrders}))
    setOrdersFetchedFromApi(true)
  }

  useEffect(() => {
    if (!ordersFoundInStore) {
      FetchCustomerOrders(userId)
    }
  }, [ordersFoundInStore])


  // filter only active orders
  const [showOnlyActiveOrders, setShowOnlyActiveOrders] = useState(false)

  const handleFilterActiveOrders = (e) => {
    const clickedOn = e.target.id
    if (clickedOn == 'checkboxForActiveOrders') {
      setShowOnlyActiveOrders((currentState) => !currentState)
    }
  } 
  
  return (
    <div className='min-w-screen min-h-screen'>
      
      <div>
        <Navbar />
      </div>

      <div className='flex flex-row w-fit mx-auto border-transparent rounded-4xl px-5 py-3 justify-center items-center mt-10 bg-cyan-600 font-extrabold italic shadow-xl shadow-white scale-90 hover:shadow-purple-400 hover:shadow-2xl hover:scale-95 duration-700'>
        
        <h1 className='px-5'>Filter Active Orders</h1>
        
        <div onClick={handleFilterActiveOrders}>
      
          <CheckBox checked={showOnlyActiveOrders} id={'checkboxForActiveOrders'} />
      
        </div>
      
      </div>

      <div className='flex flex-col justify-center items-center flex-wrap md:flex-row gap-5 my-10'>
        {
          showOnlyActiveOrders ? ordersToDisplay?.map((orderToDisplay) => {
            
            if (orderToDisplay.isCompleted == false || orderToDisplay.isCompleted == 'false') {
            
              return (

                <OrderCard key={orderToDisplay._id} themeMode={themeMode} orderId={orderToDisplay._id} isCompleted={orderToDisplay.isCompleted} items={orderToDisplay.items} orderAmount={orderToDisplay.amount} orderDate={(new Date((orderToDisplay.createdAt))).toLocaleDateString("en-GB")} orderTime={(new Date((orderToDisplay.createdAt))).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true
                })} />
            
              )
            
            }
          
          })

          :

          ordersToDisplay?.map((orderToDisplay) => (
            <OrderCard key={orderToDisplay._id} themeMode={themeMode} orderId={orderToDisplay._id} isCompleted={orderToDisplay.isCompleted} items={orderToDisplay.items} orderAmount={orderToDisplay.amount} orderDate={(new Date((orderToDisplay.createdAt))).toLocaleDateString("en-GB")} orderTime={(new Date((orderToDisplay.createdAt))).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true
            })} />
          ))

        }
      </div>

      <div className={`my-16 flex flex-row justify-center items-center`}>
        <Pagination totalPages={totalPages} activePageNo={pageNo} handlePaginationClick={handlePaginationClick} />
      </div>

    </div>
  )
}

export default CustomerOrders