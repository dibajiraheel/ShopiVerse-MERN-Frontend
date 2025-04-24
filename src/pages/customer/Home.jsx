import React, { useEffect, useRef, useState } from 'react'
import Search from '../../components/customer/Search'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../../components/customer/Navbar'
import Sidebar from '../../components/customer/Sidebar'
import { availableCategories } from '../../constants'
import ProductCard from '../../components/customer/ProductCard'
import Pagination from '../../components/Pagination'
import GetItems from '../../api/customer/GetItems'
import { AddItemsInCustomerSlice } from '../../slices/customer/CustomerItemsSlice'
import { cardsToDisplayOnOnePage } from '../../constants'
import Loader from '../../components/Loader'


const Home = () => {
  
  //theme
  const themeMode = useSelector(state => state.themeStore.mode)
  
  // search
  const [searchInput, setSearchInput] = useState('')
  const searchRef = useRef('')
  const handleSearch = (e) => {
    e.preventDefault()
    setSearchInput(searchRef.current.value)
  }

  // categories filter
  const [selectedCategories, setSelectedCategories] = useState({})
  const [filterCategories, setFilterCategories] = useState([])
  useEffect(() => {
    availableCategories.forEach((availableCategory) => {
      setSelectedCategories((currentCategories) => ({...currentCategories, [availableCategory] : false}))
    })
  }, [availableCategories])

  const handleCategorySelection = (e) => {
    const calledByCategory = e.target.id
    setSelectedCategories((currentCategories) => ({...currentCategories, [calledByCategory] : (!(selectedCategories[calledByCategory]))}))
    if (filterCategories.includes(calledByCategory)) {
      const categories = filterCategories
      categories.pop(calledByCategory)
      setFilterCategories(categories)
    }
    else {
      const categories = filterCategories
      categories.push(calledByCategory)
      setFilterCategories(categories)
    }
    console.log('SELECTED CATEGORIES', selectedCategories);
    console.log('FILTER CATEGORIES', filterCategories);
    
  }


  // pages
  const [pageNo, setPageNo] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const totalItems = useSelector(state => state.customerItemsStore.totalItems)
  useEffect(() => {
    if (totalItems >= 0) {
      const pagesRequired = (Math.ceil(((Number(totalItems)) / Number(cardsToDisplayOnOnePage))))
      setTotalPages(pagesRequired)
    }
  }, [totalItems])
  
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


  // Get Items
  const items = useSelector(state => state.customerItemsStore.items)
  console.log('ITEMS', items);
  
  const pagesAdded = useSelector(state => state.customerItemsStore.pagesAdded)
  const pagesItems = useSelector(state => state.customerItemsStore.pagesItems)
  const [itemsToDisplay, setItemsToDisplay] = useState([])
  
  const dispatch = useDispatch()
  const FetchItems = async (skip, limit) => {
    const response = await GetItems(skip, limit)
    if (!response) return
    console.log('RESPONSE RECEIVED FORM API IN HOME PAGE', response);
    
    if (skip == 0) dispatch(AddItemsInCustomerSlice({newItems: response.items, totalItems: response.totalItems, pageNo: (Number(pageNo))}))
    else {
      const totalItems = items.length
      dispatch(AddItemsInCustomerSlice({newItems: response.items, pageNo: (Number(pageNo))}))
    }
    return
  }
  
  useEffect(() => {
    if (!(pagesAdded.includes((Number(pageNo))))) {
      const skip = ((Number(pageNo) * Number(cardsToDisplayOnOnePage)) - Number(cardsToDisplayOnOnePage))
      const limit = Number(cardsToDisplayOnOnePage)
      FetchItems(skip, limit)
    }
    else if (pagesAdded.includes((Number(pageNo)))) {
      console.log('PAGES ITEMS', pagesItems);
      const itemsFrom = ((Number(pageNo) * Number(cardsToDisplayOnOnePage)) - Number(cardsToDisplayOnOnePage))
      const itemsTo = (Number(pageNo) * Number(cardsToDisplayOnOnePage))
      const currentItems = items.slice(itemsFrom, itemsTo)
      setItemsToDisplay(currentItems)
      console.log('ITEMS TO DISPLAY', itemsToDisplay);
    }


  }, [pageNo, items])


  

  return (
    <div className='min-w-screen min-h-screen flex flex-col justify-start items-center gap-y-6'>

      <div className='sticky backdrop-blur-3xl top-0 z-10'>
        <Navbar searchRef={searchRef} displaySearch={true} setSearchInput={setSearchInput} handleSearch={handleSearch}/>
      </div>      

      <div className={`${itemsToDisplay.length == 0 ? 'hidden' : ''}`}>
        <Sidebar selectedCategories={selectedCategories} handleCategorySelection={handleCategorySelection} />
      </div>

      <div className='w-full flex flex-col md:flex-row flex-wrap justify-center items-center gap-10'>

        {

          itemsToDisplay.length > 0 ? 
          
          filterCategories.length == 0 ?
          
          searchInput == '' ?
          // display items available + no filter + no search
          itemsToDisplay.map((item) => (
            <ProductCard itemPageNo={pageNo} key={item._id} itemId={item._id} itemDescription={item.description} itemPrice={item.price} itemImageUrl={item.imagesUrls[0]} itemTitle={item.name} sold={item.sold} stock={item.stock} themeMode={themeMode} />
          ))
          :
          // display items available + no filter + search
          itemsToDisplay.map((item) => {
            const itemName = (item.name).toLowerCase().trim()
            const searchedValue = searchInput.toLowerCase().trim()
            if (itemName == searchedValue) {
              return (
                <ProductCard itemPageNo={pageNo} key={item._id} itemId={item._id} itemDescription={item.description} itemPrice={item.price} itemImageUrl={item.imagesUrls[0]} itemTitle={item.name} sold={item.sold} stock={item.stock} themeMode={themeMode} />
              )
            }
          })
          :
          searchInput == '' ?
          // display items available + filter + no search 
          itemsToDisplay.map((item) => {
            const itemCategories = item.categories
            let itemCategoriesIncludesFilterCategories = false
            const totalItemsCategories = itemCategories.length
            for (let i = 0; i < totalItemsCategories; i++) {
              const itemCategory = itemCategories[i]
              console.log('FILTER CATEGORIES', filterCategories);
              
              if (filterCategories.includes(itemCategory)) {
                itemCategoriesIncludesFilterCategories = true
                break
              }
            }

            if (itemCategoriesIncludesFilterCategories) {
              return(
                <ProductCard itemPageNo={pageNo} key={item._id} itemId={item._id} itemDescription={item.description} itemPrice={item.price} itemImageUrl={item.imagesUrls[0]} itemTitle={item.name} sold={item.sold} stock={item.stock} themeMode={themeMode} />
              )
            }
          })
          :
          // display items available + filter + search
          itemsToDisplay.map((item) => {
            const itemCategories = item.categories
            let itemCategoriesIncludesFilterCategories = false
            const totalItemsCategories = itemCategories.length
            for (let i = 0; i < totalItemsCategories; i++) {
              const itemCategory = itemCategories[i]
              console.log('FILTER CATEGORIES', filterCategories);
              
              if (filterCategories.includes(itemCategory)) {
                itemCategoriesIncludesFilterCategories = true
                break
              }
            }

            const itemName = (item.name).toLowerCase().trim()
            const searchedValue = searchInput.toLowerCase().trim()
            const nameMatched = (itemName == searchedValue)

            if (itemCategoriesIncludesFilterCategories && nameMatched) {
              return(
                <ProductCard itemPageNo={pageNo} key={item._id} itemId={item._id} itemDescription={item.description} itemPrice={item.price} itemImageUrl={item.imagesUrls[0]} itemTitle={item.name} sold={item.sold} stock={item.stock} themeMode={themeMode} />
              )
            }
          })
          :
          // display items not available
          <div className='flex flex-row justify-center items-center'>
            <Loader />
          </div>

        }

      </div>

      <div className={`my-16 ${itemsToDisplay.length == 0 ? 'hidden' : ''}`}>
          <Pagination totalPages={totalPages} activePageNo={pageNo} handlePaginationClick={handlePaginationClick} />
      </div>

    </div>
  )
}

export default Home