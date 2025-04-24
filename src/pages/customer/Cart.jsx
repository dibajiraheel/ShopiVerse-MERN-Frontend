import Navbar from '../../components/customer/Navbar'
import React, { useEffect, useState } from 'react'
import CartCard from '../../components/customer/CartCard'
import { AddItemInCartInCustomerSlice, RemoveItemFromCartInCustomerSlice } from '../../slices/customer/CustomerCartSlice'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../components/Button'
import AddItemInCart from '../../api/customer/AddItemInCart'
import { getCookie } from 'react-use-cookie'
import DeleteItemFromCart from '../../api/customer/DeleteItemFromCart'
import PlaceCustomerOrder from '../../api/customer/PlaceCustomerOrder'
import { useNavigate } from 'react-router-dom'
import { AddSingleOrderInCustomerSlice } from '../../slices/customer/CustomerOrdersSlice'

const Cart = () => {

    // get theme mode
    const themeMode = useSelector(state => state.themeStore.mode)

    // get cart items from store
    const items = useSelector(state => state.customerCartStore.cart)
    const totalItems = useSelector(state => state.customerCartStore.totalItems)
    const totalUniqueItems = useSelector(state => state.customerCartStore.totalUniqueItems)
    const totalAmount = useSelector(state => state.customerCartStore.totalAmount)

    const [itemsAvailable, setItemsAvailbale] = useState(false)
    const [itemsToDisplay, setItemsToDisplay] = useState([])
    useEffect(() => {
        if (items.length > 0) {
            setItemsAvailbale(true)
            setItemsToDisplay(items)
        }
        else {
            setItemsAvailbale(false)
            const cartStorage = JSON.parse(localStorage.getItem('cartStorage'))
            if (cartStorage?.cart.length > 0) {
                const cart = cartStorage.cart
                cart.forEach(item => {
                    dispatch(AddItemInCartInCustomerSlice({newItem: item}))
                });
            }
        }
    },[items])



    // Handle Remove Item From Cart
    const dispatch = useDispatch()
    const handleRemoveItemFromCart = async (itemId) => {
        dispatch(RemoveItemFromCartInCustomerSlice({itemId: itemId}))
    }

    // Handle Item Checked
    const [itemsChecked, setItemsChecked] = useState({})
    useEffect(() => {
        if (itemsToDisplay.length > 0) {
            itemsToDisplay.forEach((itemToDisplay) => {
                setItemsChecked((currentItemsChecked) => ({...currentItemsChecked, [itemToDisplay.itemId]: false}))
            })
        }
    }, [itemsToDisplay])

    const handleItemChecked = (e) => {
        const itemId = e.target.id
        setItemsChecked((currentItemsChecked) => ({...currentItemsChecked, [itemId]: (!(itemsChecked[itemId]))}))
    }

    // Hanlde Place Order
    const userId = getCookie('_id')
    const [canPlaceOrder, setCanPlaceOrder] = useState(true)
    const handlePlaceOrder = async () => {
        
        // add items in backend cart
        const itemsAdded = []
        let failedToAddItem = false
        for (let i = 0; i < totalUniqueItems; i++) {
            const itemToDisplay = itemsToDisplay[i]
            if (itemsChecked[itemToDisplay.itemId]) {
                const response = await AddItemInCart(itemToDisplay.itemId, userId, itemToDisplay.itemQuantity)
                if (!response) {
                    failedToAddItem = true
                    break
                }
                itemsAdded.push(itemToDisplay.itemId)
            }
        }

        // if not item is added and also do not failed to add item so its means no item is selected to place
        if (itemsAdded.length == 0 && (failedToAddItem == false)) {
            setCanPlaceOrder(false)
            setTimeout(() => {
                setCanPlaceOrder(true)
            }, (3000));
            console.log('SET CAN PLACE ORDER TO FALSE AND NOW RETURNING');
            return
        }

        // if any item failed to add in backend cart then remove all already added item from backend cart
        if (failedToAddItem) {
            const totalItemsAdded = itemsAdded.length
            for (let i = 0; i < totalItemsAdded; i++) {
                const itemAdded = itemsAdded[i]
                const response = await DeleteItemFromCart(itemId, userId)
            }
        }

        const response = await PlaceCustomerOrder(userId)
        if (!response) return

        // remove all items from cart that are placed as order
        const totalItemsAdded = itemsAdded.length
        for (let i = 0; i < totalItemsAdded; i++) {
            const itemAdded = itemsAdded[i]
            dispatch(RemoveItemFromCartInCustomerSlice({itemId: itemAdded}))
        }
        
        // add this order in orders store
        const orderToAdd = response.newOrder
        dispatch(AddSingleOrderInCustomerSlice({newOrder: orderToAdd}))

    }

    // get profile to decide wheather to show place order or not
    const profile = useSelector(state => state.customerProfileStore.profile)
    const [isProfileAvailable, setIsProfileAvailable] = useState(false)
    useEffect(() => {
        if ((profile.userName && profile.userName != '') && (profile.phoneNo && profile.phoneNo != '') && (profile.address && profile.address != '') && (profile.province && profile.province != '') && (profile.city && profile.city != '')) {
            console.log('SETTING PROFILE AVAILABLE TRUE');
            
            setIsProfileAvailable(true)
        }
        else {
            setIsProfileAvailable(false)
        }
        console.log('PROFILE FROM STORE', profile);
        
    }, [profile])

    const navigate = useNavigate()

  return (
    <div className='min-w-screen min-h-screen'>

        <div className='flex flex-col justify-center items-center'>

            <div className='fixed top-0 z-10 backdrop-blur-3xl'>
                <Navbar />
                
                {/*Toast*/}
                <div role="alert" className={`alert alert-warning ${canPlaceOrder ? 'hidden' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>No Item Is Selected To Place Order...</span>
                
                </div>
            </div>

            <div className='mt-30 flex flex-col md:flex-row justify-around items-center text-xl font-bold italic w-full'>
                <h1>Total Items In Cart: <span className='text-green-500'>{totalItems}</span></h1>
                <h1>Total Unqiue Items In Cart: <span className='text-green-500'>{totalUniqueItems}</span></h1>
                <h1>Total Amount Of Cart: <span className='text-green-500'>{totalAmount}</span></h1>
            </div>

            <div className={`my-5 ${itemsAvailable ? '' : 'hidden'}`}>
                <Button disabled={!isProfileAvailable ? true : false} onClick={handlePlaceOrder} text={'Place Order'} classes= {`${themeMode == "dark" ? "bg-transparent border border-purple-500" : "bg-purple-500"} rounded-md hover:bg-purple-600 hover:bg-purple-800 mt-5 hover:shadow-2xl hover:shadow-purple-300`} />
                <Button onClick={() => navigate('/customer/update-profile')} text={'Complete Profile'} classes= {`${themeMode == "dark" ? "bg-transparent border border-green-500" : "bg-green-500"} rounded-md hover:bg-green-600 hover:bg-green-800 mt-5 hover:shadow-2xl hover:shadow-green-300 ${isProfileAvailable ? 'hidden' : ''}`} />
            </div>

            <div className=''>

                {
                    itemsAvailable ?

                    itemsToDisplay.map((itemToDisplay) => (
                        
                        <div>
                            <CartCard themeMode={themeMode} itemName={itemToDisplay.itemName} itemPrice={itemToDisplay.itemPrice} itemImageUrl={itemToDisplay.itemImage} itemQuantity={itemToDisplay.itemQuantity} itemAmount={itemToDisplay.itemAmount} itemId={itemToDisplay.itemId} handleRemoveItemFromCart={handleRemoveItemFromCart} itemChecked={itemsChecked[itemToDisplay.itemId]} handleItemChecked={handleItemChecked} />
                        </div>

                    ))
                    
                    :
                    
                    <div className='mt-30'>
                        <h1 className='text-3xl font-bold italic'> Your Cart Is Empty... 🙄</h1>
                    </div>
                }

            </div>

        </div>



    </div>
  )
}

export default Cart