import { data, useParams } from 'react-router-dom'
import Navbar from '../../components/customer/Navbar'
import React, { useEffect, useState } from 'react'
import Carousel from '../../components/customer/Carousel'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../components/Button'
import GetItem from '../../api/customer/GetItem'
import GetItemReviews from '../../api/GetItemReviews'
import { AddItemReviewsInCustomerSlice, AddNewReivewInCustomerSlice, UpdateReviewsInCustomerSlice } from '../../slices/customer/CustomerItemReviewsSlice'
import Input from '../../components/Input'
import { getCookie } from 'react-use-cookie'
import { useForm, Controller } from 'react-hook-form'
import UpdateReview from '../../api/customer/UpdateReview'
import DeleteReview from '../../api/customer/DeleteReview'
import { AddItemInCartInCustomerSlice } from '../../slices/customer/CustomerCartSlice'
import { UpdateItemStockInAllItemsCustomerSlice, AddOneItemInAllItemsCustomerSlice } from '../../slices/customer/CustomerItemsSlice'
import { cardsToDisplayOnOnePage } from '../../constants'
import TextArea from '../../components/TextArea'
import AddReviewAndRating from '../../api/customer/AddReviewAndRating'

const CustomerProduct = () => {

  // get theme mode
  const themeMode = useSelector(state => state.themeStore.mode)

  // get itemId and itemPageNo from url
  const {itemId, itemPageNo} = useParams()
  
  // fetch item from store
  const [item, setItem] = useState(null)
  const items = useSelector(state => state.customerItemsStore.items)
  const pagesItems = useSelector(state => state.customerItemsStore.pagesItems)
  const [itemFound, setItemFound] = useState(true)
  useEffect(() => {
    if (items.length > 0) {
      
      const itemsFrom = ((Number(itemPageNo) * Number(cardsToDisplayOnOnePage)) - Number(cardsToDisplayOnOnePage))
      const itemsTo = (Number(itemPageNo) * Number(cardsToDisplayOnOnePage))
      const fitleredItems = items.slice(itemsFrom, itemsTo)
  
      const foundItem = fitleredItems.find((filteredItem) => filteredItem._id == itemId)
      console.log('ITEM FOUND', foundItem);
      
      if (foundItem) { 
        setItem(foundItem)
      }
      else {
        setItemFound(false)
      }
    }
    else setItemFound(false)

  }, [items])

  //fetch item from api if store got reset and then store in store also
  const FetchItem = async (itemId) => {
    const response = await GetItem(itemId)
    if (!response) return
    setItem(response)
    dispatch(AddOneItemInAllItemsCustomerSlice({item: response, pageNo: itemPageNo}))
  }
  useEffect(() => {
    if (!itemFound) {
      console.log('FETCHING ITEM FROM API');
      
      FetchItem(itemId)
    }
  }, [itemFound])


  // get review from store
  const reviews = useSelector(state => state.customerItemReviewsStore.reviews)
  const [review, setReview] = useState([])
  const [reviewFound, setReviewFound] = useState(true)
  const userId = useSelector(state => state.authenticationStore.userId)
  useEffect(() => {
    if ((Object.keys(reviews)).length > 0) {
      const review = reviews[itemId]
      if (review) {
        setReview(review)
        console.log('REVIEW FROM PAGE STATE', review); 
      }
      else {
        setReviewFound(false)
      }
    }
    else {
      setReviewFound(false)
    }
  }, [reviews])

  // fetch review from api if review not found in store
  const dispatch = useDispatch()
  const FetchReview = async (itemId) => {
    const response = await GetItemReviews(itemId)
    console.log('REVIEW RESPONSE FROM API', response);
    
    if (!response) return
    if (response.length > 0) {
      dispatch(AddItemReviewsInCustomerSlice({itemId: itemId, reviews: response[0].interaction}))
    }
    else {
      dispatch(AddItemReviewsInCustomerSlice({itemId: itemId, reviews: response}))
    }
  }
  useEffect(() => {
    if (!reviewFound) {
      FetchReview(itemId)
    }
  }, [reviewFound])


  // show reviews
  const [showReviews, setShowReviews] = useState(false)
  const [updateStates, setUpdateStates] = useState({})
  
  const {handleSubmit, control, setValue} = useForm()

  useEffect(() => {
    if (review.length > 0) {
      review.forEach((eachReview) => {
        console.log('UPDATE STATE', updateStates, userId);
        if (eachReview.customerId == userId) {
          setUpdateStates((currentUpdateStates) => ({...currentUpdateStates, [eachReview._id] : false}))
          
        }
      })
    }
    console.log('UPDATE STATES = ', updateStates);
    
  }, [review])

  const handleSwitchUpdateReview = (revId) => {    
    const currentState = updateStates[revId]
    setUpdateStates((currentStates) => ({...currentStates, [revId]: !currentState}))
  }

  const handleUpdateReviewSubmit = async (data, revId, oldReview, oldRating) => {

    
    const updatedReviewId = `updatedReview${revId}`
    const updatedRatingId = `updatedRating${revId}`
    
    const updatedReview = data[updatedReviewId]
    const updatedRating = data[updatedRatingId]

    console.log('UPDATED REVIEW AND RATING', updatedReview, updatedRating);
    console.log('OLD REVIEW AND RATING', oldReview, oldRating);

    if ((updatedReview == oldReview) && ((Number(updatedRating)) == (Number(oldRating)))) {
      setUpdateStates((currentStates) => ({...currentStates, [revId]: false}))
      return
    }
    else {
      const formData = new FormData()
      formData.append('review', updatedReview)
      formData.append('rating', updatedRating)
      const response = await UpdateReview(itemId, userId, revId, formData)
      const currentReviews = review
      const updatedReviewsToAddInStore = []
      currentReviews.forEach((currentReview) => {
        if (currentReview._id == revId) {
          updatedReviewsToAddInStore.push({...currentReview, review: updatedReview, rating: updatedRating})
        }
        else {
          updatedReviewsToAddInStore.push({...currentReview})
        }
      })
      
      console.log('SENDING THIS DATA TO STORE', updatedReviewsToAddInStore);
      dispatch(UpdateReviewsInCustomerSlice({itemId, reviews: updatedReviewsToAddInStore}))
      
    }
    
  }

  const handleDelete = async (revId) => {
    const response = await DeleteReview(itemId, userId, revId)
    if (!response) return
    const currentReviews = review
    const updatedReviews = []
    currentReviews.forEach((currentReview) => {
      if (currentReview._id != revId) updatedReviews.push({...currentReview})
    })
    dispatch(UpdateReviewsInCustomerSlice({itemId: itemId, reviews: updatedReviews}))
  } 


  // calculate overall rating of item
  const [rating, setRating] = useState(null)
  useEffect(() => {
    let allRatings = 0
    if (review.length > 0) {
      review.forEach((eachReview) => {
        allRatings = allRatings + Number(eachReview.rating)
      })
      const overallRating = allRatings / (review.length)
      setRating(overallRating)
    }
  }, [review])


  // quantity
  const [quantity, setQuantity] = useState(1)
  const UpdateQuantity = (e) => {
    console.dir(e.target);
    
    const calledBy = e.target.innerHTML
    if (calledBy == '+') {
      setQuantity((currentQuantity) => currentQuantity + 1)
    }
    else if (calledBy == '-') {
      if (quantity == 1) return
      setQuantity((currentQuantity) => currentQuantity - 1)
    }
  
  }

  // handle add to cart

  const [displayToast, setDisplayToast] = useState(false)
  const handleAddToCart = () => {
    const itemToAdd = {
      itemId: item._id,
      itemPrice: item.price,
      itemImage: item.imagesUrls[0],
      itemQuantity: quantity,
      itemAmount: ((Number(item.price)) * (Number(quantity)))
    }

    dispatch(AddItemInCartInCustomerSlice({newItem: itemToAdd}))
    dispatch(UpdateItemStockInAllItemsCustomerSlice({itemId: itemId, pageNo: itemPageNo, itemQuantityBought: quantity}))
    setDisplayToast(true)
    setTimeout(() => {
      setDisplayToast(false)
    }, [3000])
    return
  }

  // handle adding review
  const [reviewAdding, setReviewAdding] = useState(false)
  const [addReviewError, setAddReviewError] = useState(false)
  const handleAddReview = async (data) => {
    setAddReviewError(false)
    if ((data.addReview == '' || (!data.addReview)) || (!reviewRating)) {
      setAddReviewError(true)
      return
    } 
    console.log('DATA RECEIVED TO ADD REVIEW', data);
    const formData = new FormData()
    formData.append('review', data.addReview)
    formData.append('rating', (String(reviewRating)))
    
    const response = await AddReviewAndRating(itemId, userId, formData)
    console.log('RESPONSE AFTER ADDING NEW REVIEW', response);
    
    if (!response) return
    setValue('addReview', '')
    setReviewRating(null)
    setStarToDisplay({'1': false, '2': false, '3': false, '4': false, '5': false})

    
    console.log('NEW REVIEW ID RECEIVED FROM BACKEND', response.newReviewId);
    

    const reviewToAddInStore = {_id: response.newReviewId, itemId: itemId, review: data.addReview, rating: reviewRating, customerId: userId}
    dispatch(AddNewReivewInCustomerSlice({newReview: reviewToAddInStore}))

    return

  }


  // handle rating
  const [starToDisplay, setStarToDisplay] = useState({'1': false, '2': false, '3': false, '4': false, '5': false})
  const [reviewRating, setReviewRating] = useState(null)
  const handleRatingInput = (e) => {
    const clickedOn = Number(e.target.id)
    if (!clickedOn) return
    console.log('CLICKED ON', clickedOn);
    
    const starsSelected = {}
    for (let i = 0 ; i < clickedOn; i++) {
      starsSelected[(String(i + 1))] = true
    }

    setStarToDisplay(starsSelected)
    setReviewRating(clickedOn)
    return

  }




  if (item)
  return (
    <div className={`min-w-screen min-h-screen h-full overflow-x-hidden `}>

  {/* Navbar */}
  <div className="fixed top-0 z-10 backdrop-blur-3xl">
    
    <Navbar />
    
    {/*Toast*/}
    <div role="alert" className={`alert alert-success ${displayToast ? '' : 'hidden'}`}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>Product Added To Cart Successfully.</span>
    
    </div>

  </div>


  {/* Carousel */}
  <div className="mt-30 w-full px-4 sm:px-6 md:px-10 py-10 flex justify-center">
    <Carousel itemImageOneUrl={item.imagesUrls[0]} itemImageTwoUrl={item.imagesUrls[1]} />
  </div>

  {/* Product Title */}
  <div>
    <h1 className={`sticky top-0 text-2xl sm:text-3xl md:text-4xl italic text-center font-bold font-handWriting mt-5 ${themeMode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      {item.name}
    </h1>
  </div>

  {/* Product Info Section */}
  <div className="flex flex-col md:flex-row justify-center items-center mt-10 gap-10 px-4">

    <div className={`w-full md:w-2/3 max-w-xl p-6 flex flex-col gap-6 justify-center rounded-4xl shadow-2xl shadow-white backdrop-blur-lg border border-transparent`}>

      <div className="text-center flex flex-row justify-around items-center">
        <h1 className="text-2xl font-bold italic">Rs {item.price}</h1>
        <h1 className='text-xl font-bold text-cyan-600'>Rating: {rating}/5</h1>
      </div>

      <div className="flex justify-around">
        <h1 className={`text-lg sm:text-xl italic ${themeMode === 'dark' ? 'text-green-300' : 'text-blue-700'}`}>Sold: {item.sold}</h1>
        <h1 className={`text-lg sm:text-xl italic ${themeMode === 'dark' ? 'text-yellow-300' : 'text-yellow-700'}`}>Stock Left: {item.stock}</h1>
      </div>

      <div className="self-center flex gap-4 items-center">
        <h1 onClick={UpdateQuantity} className="btn btn-circle border border-red-500 btn-error btn-ghost">-</h1>
        <h1 className="text-lg sm:text-xl">Quantity: {quantity}</h1>
        <h1 onClick={UpdateQuantity} className="btn btn-circle border border-purple-500 hover:bg-purple-500 btn-ghost">+</h1>
      </div>

      <div className="self-center">
        <Button
          onClick={handleAddToCart}
          classes={`${themeMode === "dark" ? "bg-transparent border border-green-500 text-green-300 hover:bg-green-700" : "bg-green-500 hover:bg-green-600 text-white"} rounded-md px-6 py-2`}
          text={'Add to cart'}
        />
      </div>

    </div>

  </div>

  {/* Description Section */}
  <div className={`rounded-4xl shadow-2xl mt-20 mb-10 mx-4 md:mx-24 overflow-y-auto shadow-white backdrop-blur-lg`}>

    <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold pt-10 pb-5">Description</h1>

    <h1 className="text-justify px-6 sm:px-10 md:px-16 pb-16 break-words whitespace-pre-wrap">
      {item.description}
    </h1>
    
  </div>


  {/* Show Reviews Button */}
  <div className="flex justify-center mb-10">
        <Button 
          onClick={() => setShowReviews(prev => !prev)}
          classes={`${themeMode == "dark" ? "bg-transparent border border-cyan-500" : "bg-cyan-500"} rounded-md hover:bg-cyan-600 hover:bg-cyan-800`}
          text={showReviews ? 'Hide Reviews' : 'Show Reviews'}
        />
  </div>

  {/* Reviews Section */}
  <div className={`px-6 sm:px-10 md:px-16 pb-16 space-y-6 ${showReviews == false ? 'hidden' : ''}`}>
    
    <div>
      
      <div className={`${addReviewError == false ? 'hidden' : ''} text-xl text-red-800 italic text-center`}>
        <h1 className='text-center'>Both Review and Rating are Required...</h1>
      </div>

      <div>
        <form onSubmit={handleSubmit(handleAddReview)} className='flex flex-col justify-center'>
          <div>
            <Controller name='addReview' control={control} render={({field}) => (
              <TextArea value={field.value} onChange={field.onChange} label={'Your Review'} labelClasses={`${themeMode == 'dark' ? 'text-white' : 'text-black'} text-sm font-extrabold italic`} placeholder={'Enter your review'} textareaClasses={`${themeMode == 'dark' ? 'text-white bg-transparent border-white' : 'text-black bg-white border-black'} font-extrabold text-md italic border w-full`} />
            )} />
          </div>
          <div className='self-center my-5'>
            <Button text={`${reviewAdding ? 'Adding' : 'Add'}`} disabled={reviewAdding ? true : false} classes={`${themeMode == "dark" ? "bg-transparent border border-green-500" : "bg-green-500"} rounded-md hover:bg-green-600 hover:bg-green-800`} />
          </div>
        </form>
      </div>

      <div onClick={handleRatingInput} className='my-5 text-2xl flex flex-row justify-center items-center gap-5'>

        <span className='italic font-extrabold text-sm'>Rating</span>

        <span id='1'>
          {starToDisplay['1'] ? '⭐' : '✰'}
        </span>

        <span id='2'>
        {starToDisplay['2'] ? '⭐' : '✰'}
        </span>

        <span id='3'>
        {starToDisplay['3'] ? '⭐' : '✰'}
        </span>

        <span id='4'>
        {starToDisplay['4'] ? '⭐' : '✰'}
        </span>

        <span id='5'>
        {starToDisplay['5'] ? '⭐' : '✰'}
        </span>

      </div>

    </div>


    <div>
      {review.map((rev) => {

        if (rev.review != ''){
          return (
          <div
            key={rev._id}
            className={`p-4 rounded-xl shadow-2xl shadow-cyan-400 backdrop-blur-lg`}
          >
            {/* When updateStates[rev._id] is true => show input */}

            <form onSubmit={handleSubmit((data) => handleUpdateReviewSubmit(data, rev._id, rev.review, rev.rating))} className={`flex flex-col md:flex-row gap-3 ${updateStates[rev._id] == false ? 'hidden' : ''}`}>
              <Controller
                name={`updatedReview${rev._id}`}
                control={control}
                defaultValue={rev.review || ''}
                render={({ field }) => (
                  <Input
                    onChange={field.onChange}
                    {...field}
                    type={'text'}
                    inputClasses={`w-full px-3 py-2 rounded-md border focus:outline-none ${themeMode === 'dark' ? 'bg-gray-800 text-white border-purple-400' : 'bg-white text-black border-purple-600'}`}
                  />
                )}
              />

              <Controller
                name={`updatedRating${rev._id}`}
                control={control}
                defaultValue={rev.rating || 5}
                render={({ field }) => (
                  <Input
                    onChange={field.onChange}
                    {...field}
                    type={'number'}
                    maxNumAllowed={5}
                    minNumAllowed={0}
                    inputClasses={`w-full px-3 py-2 rounded-md border focus:outline-none ${themeMode === 'dark' ? 'bg-gray-800 text-white border-purple-400' : 'bg-white text-black border-purple-600'}`}
                  />
                )}
              />

              <Button text={'Save'} classes={`${themeMode == "dark" ? "bg-transparent border border-green-500" : "bg-green-500"} rounded-md hover:bg-green-600 hover:bg-green-800`} />
            </form>
        
            <div className={`${updateStates[rev._id] == true ? 'hidden' : ''}`}>
              
              <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
                <p className="text-lg font-medium break-words">{rev.review}</p>
                <span className="mt-2 sm:mt-0 text-yellow-500 font-semibold">Rating: {rev.rating} ⭐</span>
              </div>

              <div className={`mt-3 flex gap-4 ${rev.customerId != userId ? 'hidden' : ''}`}>
                <Button
                  onClick={() => {handleDelete(rev._id)}}
                  text={'Delete'}
                  classes={`${themeMode == "dark" ? "bg-transparent border border-red-500" : "bg-red-500"} rounded-md hover:bg-red-600 hover:bg-red-800`}
                />
                <Button
                  onClick={() => {handleSwitchUpdateReview(rev._id)}}
                  text={'Update'}
                  classes={`${themeMode == "dark" ? "bg-transparent border border-pink-500" : "bg-pink-500"} rounded-md hover:bg-pink-600 hover:bg-pink-800`}
                />
              </div>
        
            </div>

          </div>
          )
        }

      })}
    </div>

  </div>





</div>

  )
}

export default CustomerProduct