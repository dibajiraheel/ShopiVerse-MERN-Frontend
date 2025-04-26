import Navbar from '../../ui components/Navbar';
import ProductCard from '../../components/seller/ProductCard'
import React, { useEffect, useState } from 'react'
import sellerButtons from '../../utils/SellerNavarbarButtons';
import { useDispatch, useSelector } from 'react-redux';
import IncreaseItemStock from '../../api/seller/IncreaseItemStock';
import { AddItemsInAllItems, DecreaseItemStockInAllItems, IncreaseItemStockInAllItems } from '../../slices/seller/SellerItemsSlice';
import DecreaseItemStock from '../../api/seller/DecreaseItemStock';
import { availableCategories } from '../../constants';
import CategoriesFilter from '../../components/CategoriesFilter';
import Pagination from '../../components/Pagination';
import GetSellerItems from '../../api/seller/GetSellerItems';
import { getCookie } from 'react-use-cookie';
import { cardsToDisplayOnOnePage } from '../../constants'

const AllProducts = () => {


  const themeMode = useSelector(state => state.themeStore.mode)
  
  const dispatch = useDispatch()
  
  const items = useSelector(state => state.sellerItemsStore.items)
  const pagesAlreadyFetched = useSelector(state => state.sellerItemsStore.itemsAddedForPageNo)
  const totalItems = useSelector(state => state.sellerItemsStore.totalItems)

  console.log(totalItems, pagesAlreadyFetched, items)
  
  const sellerId = getCookie('_id')

  const [activePageNo, setActivePageNo] = useState(1)
  const [pagesFromTo, setPagesFromTo] = useState([])

  useEffect(() => {
    console.log(totalItems, pagesAlreadyFetched, items)
    const pagesNeededToDisplayAllItems = Math.ceil(Number(totalItems) / Number(cardsToDisplayOnOnePage))
    const pagesToFrom = [1, pagesNeededToDisplayAllItems]
    setPagesFromTo(pagesToFrom)
  }, [totalItems])
  
  const handlePaginationClick = (e) => {
    const clickedOn = (e.target.ariaLabel);
    if (String(clickedOn) == 'Next') setActivePageNo((current) => current + 1)
    
    else if (String(clickedOn) == 'Previous') setActivePageNo((current) => current - 1)
    
    else setActivePageNo(Number(clickedOn))

  }



  //Fetch Items From API
  useEffect(() => {

    const FetchItems = async () => {
      
      const limit = cardsToDisplayOnOnePage
      const skip = (Number(activePageNo) * limit) - Number(limit)
      console.log('FETCHING ITEMS CALLED.....', 'SKIPPING', skip, 'LIMITING', limit);
      
      const response = await GetSellerItems(sellerId, skip, limit)
      console.log('ITEMS FETCHED', response);
      

      if (!response) return

      dispatch(AddItemsInAllItems({itemsToAdd: response.allItems, pageNo: activePageNo, totalItems: response.totalItems}))

    }

    if (!(pagesAlreadyFetched.includes(Number(activePageNo)))) FetchItems()
    
    

  }, [activePageNo])


  const [itemsToDisplay, setItemsToDisplay] = useState(null)
  useEffect(() => {
    if (items.length > 0 && pagesAlreadyFetched.includes(activePageNo)) {
      const itemsFrom = (Number(activePageNo) * cardsToDisplayOnOnePage) - cardsToDisplayOnOnePage
      const itemsTo = (Number(activePageNo) * cardsToDisplayOnOnePage)

      console.log('ITEMS =', items, itemsFrom, itemsTo);
      
      const currentItems = items.slice(itemsFrom, itemsTo)
      if (currentItems.length > 0) {
        setItemsToDisplay(currentItems)
        console.log('CUURENT ITEMS TO DISPLAY', currentItems);
      }
    }
  }, [items, activePageNo])


  const [isSubmitting, setIsSubmitting] = useState({})
  useEffect(() => {

    if (itemsToDisplay) {
      const isSubmitting = {}
      const totalDisplayItemsAvailable = itemsToDisplay.length
      for (let i = 0; i < totalDisplayItemsAvailable ; i++) {
        isSubmitting[itemsToDisplay[i]._id] = false
      }
      setIsSubmitting(isSubmitting)
      
      // console.log('WHOLE PAGE RERENDERED AGAIN');  
    }

    

  }, [itemsToDisplay])


  const handleIncreaseStock = async (data, e) => {
    
    const itemId = e.target.id
    const stockToIncreaseBy = data.stockNumber
    setIsSubmitting({...isSubmitting, [itemId]: true})
    
    const response = IncreaseItemStock(itemId, stockToIncreaseBy)
    if (response) {  
      dispatch(IncreaseItemStockInAllItems({'itemId': itemId, 'stockToIncreaseBy': stockToIncreaseBy, 'pageNo': activePageNo}))
    }
    setIsSubmitting({...isSubmitting, [itemId]: false})
    return

    
  };

  const handleDecreaseStock = async (data, e) => {
    
    const itemId = e.target.id
    const stockToDecreaseBy = data.stockNumber
    
    setIsSubmitting({...isSubmitting, [itemId]: true})

    const response = DecreaseItemStock(itemId, stockToDecreaseBy)
    if (response) {
      dispatch(DecreaseItemStockInAllItems({'itemId': itemId, 'stockToDecreaseBy': stockToDecreaseBy, 'pageNo': activePageNo}))
    }
    setIsSubmitting({...isSubmitting, [itemId]: false})
    return


  };

  const buttons = sellerButtons()


  const [categoriesState, setCategoriesState] = useState({})
  const [selectedCategories, setSelectedCategories] = useState([])
  useEffect(() => {

    const categoriesState = {}
    const totalCategories = availableCategories.length
    for (let i = 0; i < totalCategories; i++) {
        categoriesState[availableCategories[i]] = false
    }
    setCategoriesState(categoriesState)
    

  }, [availableCategories])

  return (
    
    <div className='min-w-screen min-h-screen'>

      <div>
        <Navbar buttons={buttons}
                mode={'seller'}
                dashboardNavigateLink={'/dashboard'} profileNavigateLink={'/seller/profile'} />
      </div>
      
      <div className='flex flex-col justify-center items-center mt-16'>

          <div className={`flex w-full flex-row justify-around items-center gap-x-4 px-4 rounded-2xl shadow-md transition-all duration-300 ${
            themeMode === "dark" ? "" : "bg-white"}`}>
            
            <div className="text-center">

              <h2 className={`text-lg font-semibold text-gray-700 ${themeMode == 'dark' ? 'text-white' : 'text-black'}`}>
                Total Products
              </h2>
              <p className={`text-2xl font-bold ${themeMode == 'dark' ? 'text-white' : 'text-black'}`}>
                {totalItems}
              </p>
            </div>

            <div className="dropdown dropdown-bottom">
              <div tabIndex={0} role="button" className={`${
            themeMode == "dark"
              ? "bg-transparent border border-pink-500"
              : "bg-pink-500"
          } rounded-md hover:bg-pink-800 btn m-1`}>Filters ⬇️</div>
                <ul tabIndex={0} className={`dropdown-content menu ${themeMode == 'dark' ? 'bg-gray-600' : 'bg-pink-200'} rounded-box z-1 w-52 p-2`}>
                  <li className='w-1/6'>
                    <h1 className={`${themeMode == 'dark' ? 'text-white' : 'text-black'} text-center mb-5 text-xl font-bold italic`}>FIlter</h1>
                    <h1 className={`${themeMode == 'dark' ? 'text-white' : 'text-black'} text-center mb-5 text-md font-bold italic`}>Categories</h1>
                    <CategoriesFilter availableCategories={availableCategories} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
                  </li>
                </ul>
            </div>

          </div>

          <div className='md:mt-10 mt-14 flex flex-col md:flex-row justify-center items-center md:flex-wrap gap-16'>
            
            {
              
              itemsToDisplay?.map((item) => {

                if (selectedCategories.length == 0) {

                  return (

                    <div key={item._id}>

                      <ProductCard itemName={item.name} itemPrice={item.price} itemId={item._id} itemImage={item.imagesUrls[0]} sold={item.sold} stock={item.stock} handleIncreaseStock={handleIncreaseStock} handleDecreaseStock={handleDecreaseStock} isSubmitting={isSubmitting[item._id]} activePageNo={activePageNo} />
                    
                    </div>

                  )

                }

                else {

                  const itemCategories = item.categories

                  console.log('type of',itemCategories);

                  const NoOfCurrentItemCategories = itemCategories.length

                  let currentItemCategoriesIncludesSelectedCategory = false
                  for (let i = 0; i < NoOfCurrentItemCategories; i++) {
                    if (selectedCategories.includes(itemCategories[i])) currentItemCategoriesIncludesSelectedCategory = true
                  }

                  if (currentItemCategoriesIncludesSelectedCategory) {

                    return (

                    <div key={item._id}>

                      <ProductCard itemName={item.name} itemPrice={item.price} itemId={item._id} itemImage={item.imagesUrls[0]} sold={item.sold} stock={item.stock} handleIncreaseStock={handleIncreaseStock} handleDecreaseStock={handleDecreaseStock} isSubmitting={isSubmitting[item._id]} />
                    
                    </div>                    

                    )

                  }
                  

                }


              })

            }


          </div>

          {/* Pagination */}
          <div className='mt-6 md:pb-10 flex flex-row justify-center items-center'>
            
            <Pagination pagesFromTo={pagesFromTo} activePageNo={activePageNo} handlePaginationClick={handlePaginationClick} />

          </div>

      </div>

    </div>

  )
}

export default AllProducts