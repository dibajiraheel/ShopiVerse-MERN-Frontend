import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GetItems from '../api/customer/GetItems'
import { cardsToDisplayOnOnePage } from '../constants'
import { AddItemsInCustomerSlice } from '../slices/customer/CustomerItemsSlice'
import GetCustomerOrders from '../api/customer/GetCustomerOrders'
import { getCookie } from 'react-use-cookie'
import { AddOrdersInCustomerSlice } from '../slices/customer/CustomerOrdersSlice'
import { AddItemInCartInCustomerSlice } from '../slices/customer/CustomerCartSlice'
import GetCustomerProfile from '../api/customer/GetCustomerProfile'
import { AddProfileInCustomerSlice } from '../slices/customer/CustomerProfileSlice'

const LoadCustomerStates = ({children}) => {
    
    // set state to display children
    const [displayChildren, setDisplayChildren] = useState(false)
    const [allFetched, setAllFetched] = useState({'itemsFetched': false, 'ordersFetched': false, 'cartFetched': false, 'profileFetched': false})

    useEffect(() => {
        console.log('ALL FETCHED', allFetched);
        
        const keys = Object.keys(allFetched)
        const totalKeys = keys.length
        let flag = true
        for (let i = 0; i < totalKeys; i++) {
            const key = keys[i]
            const keyFetched = allFetched[key]
            if (!keyFetched) {
                flag = false
                break 
            }
        }
        if (flag) setDisplayChildren(true)
    }, [allFetched])

    // check each slice state one by one
    const dispatch = useDispatch()
    const customerId = getCookie('_id')

    // 1. customer items slice
    const items = useSelector(state => state.customerItemsStore.items)
    const totalItems = useSelector(state => state.customerItemsStore.totalItems)
    const [itemsFetched, setItemsFetched] = useState(false)
    
    const FetchItems = async () => {
        const response = await GetItems(0, cardsToDisplayOnOnePage)
        if (!response) return
        dispatch(AddItemsInCustomerSlice({pageNo: 1, newItems: response.items, totalItems: response.totalItems}))
        setItemsFetched(true)
        return 
    }
    
    useEffect(() => {
        if ((!totalItems || totalItems == 0) && (!itemsFetched)) {
            FetchItems()
        }
        else if (itemsFetched) {
            setAllFetched((currentDisplayChildren) => ({...currentDisplayChildren, 'itemsFetched': true}))
        }
    }, [itemsFetched])
  

    //2. Customer Orders
    const totalOrders = useSelector(state => state.customerOrdersStore.totalOrders)
    const [ordersFetched, setOrdersFetched] = useState(false)

    const FetchOrders = async () => {
        const response = await GetCustomerOrders(customerId, 0, cardsToDisplayOnOnePage)
        console.log('FETCH ORDERS CALLED IN HERE AND RESPONSE IS THIS', response);
        
        if (!response) return
        dispatch(AddOrdersInCustomerSlice({newOrders: response.orders, pageNo: 1, totalOrders: response.totalOrders}))
        setOrdersFetched(true)
        return
    }

    useEffect(() => {
        console.log('TOTAL ORDERS', totalOrders);
        console.log('BOOL OF TOTAL ORDERS', Boolean(totalOrders));
        
        if ((totalOrders == 0) && (!ordersFetched)) {
            console.log('FETCHING ORDERS');
            
            FetchOrders()
        }
        else if (ordersFetched) {
            setAllFetched((currentDisplayChildren) => ({...currentDisplayChildren, 'ordersFetched': true}))
        }
    }, [ordersFetched])
    

    //3. Customer Cart
    const totalItemsInCart = useSelector(state => state.customerCartStore.totalItems)
    const [cartFetched, setCartFetched] = useState(false)
    
    useEffect(() => {
        if ((totalItemsInCart == 0) && (!cartFetched)) {
            const cartStorage = JSON.parse(localStorage.getItem('cartStorage'))
            if (cartStorage?.cart.length > 0) {
                const cart = cartStorage.cart
                cart.forEach(item => {
                    dispatch(AddItemInCartInCustomerSlice({newItem: item}))
                });
            }
            setCartFetched(true)
        }

        else if (cartFetched) {
            setAllFetched((currentDisplayChildren) => ({...currentDisplayChildren, 'cartFetched': true}))
        }

    }, [cartFetched])


    //4. Customer Profile
    const profile = useSelector(state => state.customerProfileStore.profile)
    const [profileFetched, setProfileFetched] = useState(false)

    const FetchProfile = async () => {
        const response = await GetCustomerProfile(customerId)
        if (!response) return
        dispatch(AddProfileInCustomerSlice({profile: response}))
        setProfileFetched(true)
        return
    }

    useEffect(() => {
        if (((Object.keys(profile)).length == 0) && (!profileFetched)) {
            FetchProfile()
        }
        else if (profileFetched) {
            setAllFetched((currentDisplayChildren) => ({...currentDisplayChildren, 'profileFetched': true}))
        }
    }, [profileFetched])
    

    if (displayChildren) return children

}



export default LoadCustomerStates