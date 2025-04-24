import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import GetSellerItem from "../../api/seller/GetSellerItem";
import sellerButtons from "../../utils/SellerNavarbarButtons";
import Navbar from "../../ui components/Navbar";
import GetItemReviews from "../../api/GetItemReviews";
import { AddItemReviews } from "../../slices/seller/SellerItemReview";
import { getCookie } from "react-use-cookie";
import { cardsToDisplayOnOnePage } from "../../constants";
import { AddItemOnPageNoInAllItems, DeleteItemInAllItems } from "../../slices/seller/SellerItemsSlice";
import DeleteItem from "../../api/seller/DeleteItem";

const SellerProduct = () => {
  const themeMode = useSelector((state) => state.themeStore.mode);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { itemId } = useParams();
  const { activePageNo } = useParams()

  const items = useSelector((state) => state.sellerItemsStore.items);
  
  // find item from all items
  const [item, setItem] = useState(null)
  const [itemFound, setItemFound] = useState(true)
  
  useEffect(() => {
    
    if (items.length > 0) {
      const itemsFrom = (Number(activePageNo) * cardsToDisplayOnOnePage) - cardsToDisplayOnOnePage
      const itemsTo = (Number(activePageNo) * cardsToDisplayOnOnePage)
      console.log('ITEMS FROM STORE', items);
      console.log('ITEMS FROM TO PAGENO', itemsFrom, itemsTo, activePageNo);
      
      const slicedItems = items.slice(itemsFrom, itemsTo)
      const filteredItem = slicedItems.find((item) => item._id == itemId)
      if (filteredItem) setItem(filteredItem)
      console.log('ITEM FOUND', filteredItem);
    }
    else {
      setItemFound(false)
    }

  }, [items])

  // item not found in store so fetch from api
  const FetchItem = async (itemId) => {
    const response = await GetSellerItem(itemId)
    if (!response) return
    dispatch(AddItemOnPageNoInAllItems({item: response, pageNo: activePageNo}))
  }

  useEffect(() => {
    if (!itemFound) {
      FetchItem(itemId)
    }
  }, [itemFound])


  // set navbar buttons
  const [navbarButtons, setNavbarButtons] = useState([])
  const buttons = sellerButtons()
  useEffect(() => {
    
    setNavbarButtons(
      [...buttons, 
            {
                classes: `${
                  themeMode == "dark"
                      ? "bg-transparent border border-yellow-500"
                      : "bg-yellow-500"
                  } rounded-md hover:bg-yellow-600 hover:bg-yellow-800`,
                  text: "Edit Product",
                  onClick: () => (navigate(`/seller/edit-product/${itemId}/${activePageNo}`)),
            },
            {
                classes: `${
                    themeMode == "dark"
                        ? "bg-transparent border border-yellow-500"
                        : "bg-yellow-500"
                    } rounded-md hover:bg-yellow-600 hover:bg-yellow-800`,
                    text: "Edit Product Images",
                    onClick: () => (navigate(`/seller/edit-product-images/${itemId}/${activePageNo}`)),
            },
            {
                classes: `${
                    themeMode == "dark"
                        ? "bg-transparent border border-red-500"
                        : "bg-red-500"
                    } rounded-md hover:bg-red-600 hover:bg-red-800`,
                    text: "Delete Product",
                    onClick: handleDeleteProduct,
                    disabled: isDeleting
            }
    ])

  }, [])


  // find reviews
  const allReviews = useSelector(state => state.sellerItemReview.reviews)
  const [reviews, setReviews] = useState(null)
  const [overallRating, setOverallRating] = useState(false)

  const [reviewFetched, setReviewFetched] = useState(true)
  const [alreadyFetchedReview, setAlreadyFetchedReview] = useState(false)
  useEffect(() => {
    console.log('ALL REVIEWS USE EFFECT CALLED', allReviews, ((Object.keys(allReviews)).length > 0));
    
    if ((Object.keys(allReviews)).length > 0) {
      const foundItemsReviews = allReviews[itemId]
      console.log('FOUND REVIEW FROM STORE', foundItemsReviews);
      
      if (foundItemsReviews) {
        setReviews(foundItemsReviews)
        console.log('SETTING FOUND REVIEWS', foundItemsReviews);
        
      }
      else {
        if (!alreadyFetchedReview) {
          console.log('IN ELSE PART');
          
          setReviewFetched(false)
        }
      }
    }
    else {
      if (!alreadyFetchedReview) {
        setReviewFetched(false)
      }
    }
  }, [allReviews])

  // fetch review if not found
  const FetchItemReviews = async () => {
    const response = await GetItemReviews(itemId)
    console.log('REVIEWS RESPONSE', response);
    setReviewFetched(true)
    setAlreadyFetchedReview(true)
    
    if (response.length == 0 || ((response[0]).interaction.length == 0)){
        dispatch(AddItemReviews({'itemId': itemId, 'reviewsFound': 0})) 
        setOverallRating(false) 
        return
    }
    dispatch(AddItemReviews(response[0]))
    const allReviews = response[0].interaction
    const noOfAllReviews = allReviews.length
    let totalRating = 0
    for (let i = 0; i < noOfAllReviews; i++) {
        const currentReview = allReviews[i]
        totalRating = Number(totalRating) + Number(currentReview.rating)
    }
    console.log('TOTAL RATING =', totalRating);
    
    totalRating = totalRating / noOfAllReviews
    totalRating = parseFloat(totalRating.toFixed(2))
    setOverallRating(totalRating)
    return   
  }

  useEffect(() => {
    if (!reviewFetched) {
      FetchItemReviews()
    }
  }, [reviewFetched])

  const [showReviews, setShowReviews] = useState(false)
  

  // handle delete product
  const userId = getCookie('_id')
  const [isDeleting, setIsDeleting] = useState(false)
  const handleDeleteProduct = async () => {
    setIsDeleting(true)
    const response = await DeleteItem(itemId, userId)
    console.log('LOG OF RESPONSE OF DELETING', response);
    
    if (!response) {
      setIsDeleting(false)
      return
    }
    setIsDeleting(false)
    dispatch(DeleteItemInAllItems({itemId: itemId, pageNo: activePageNo}))
    navigate('/seller/all-products')
    
  }



  return item ? (
    <div>
      <Navbar buttons={navbarButtons} mode="seller" dashboardNavigateLink="/dashboard" profileUrl={getCookie('profilePicUrl')} profileNavigateLink={'/seller/profile'} />
  
      <div
        className={`pt-32 min-h-screen w-full max-w-5xl mx-auto px-4 py-10 rounded-3xl shadow-xl ${
          themeMode === "dark"
            ? "text-white" // No background in dark mode
            : "bg-gradient-to-br from-white via-gray-100 to-white text-gray-900"
        }`}
      >
        {/* Overall Rating */}
        <div className="flex justify-center mb-8">
          {(() => {
            let ratingColor;
            let badgeColor;
            
            if (!overallRating) {
              // Blue color for overall rating when it's false or N/A
              ratingColor = "text-blue-500";
              badgeColor = themeMode === "dark"
                ? "bg-blue-800 text-blue-300 border border-blue-400"  // Dark mode style
                : "bg-blue-800 text-blue-300 border border-blue-400";  // Light mode style
            } else if (overallRating < 2) {
              ratingColor = "text-red-500";
              badgeColor = themeMode === "dark"
                ? "bg-red-800 text-red-300 border border-red-400"
                : "bg-red-100 text-red-800 border border-red-300";
            } else if (overallRating < 3.5) {
              ratingColor = "text-amber-500";
              badgeColor = themeMode === "dark"
                ? "bg-amber-800 text-amber-300 border border-amber-400"
                : "bg-amber-100 text-amber-800 border border-amber-300";
            } else {
              ratingColor = "text-green-600";
              badgeColor = themeMode === "dark"
                ? "bg-green-800 text-emerald-300 border border-emerald-400"
                : "bg-emerald-100 text-emerald-800 border border-emerald-300";
            }
  
            return (
              <div className={`px-6 py-2 rounded-full text-lg font-semibold shadow-md ${badgeColor}`}>
                Overall Rating:
                <span className="ml-2 font-bold">
                  {overallRating ? `${overallRating} / 5 ⭐` : "N/A"}
                </span>
              </div>
            );
          })()}
        </div>
  
        {/* Item Details */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Carousel */}
          <div className="carousel w-full rounded-2xl overflow-hidden shadow-md">
            <div id="slide1" className="carousel-item relative w-full">
              <img src={item.imagesUrls[0]} className="w-full h-64 object-cover" />
              <div className="absolute inset-0 flex justify-between items-center px-4">
                <a href="#slide2" className="btn btn-circle bg-black/30 border-none hover:bg-black/50 text-white">❮</a>
                <a href="#slide2" className="btn btn-circle bg-black/30 border-none hover:bg-black/50 text-white">❯</a>
              </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
              <img src={item.imagesUrls[1]} className="w-full h-64 object-cover" />
              <div className="absolute inset-0 flex justify-between items-center px-4">
                <a href="#slide1" className="btn btn-circle bg-black/30 border-none hover:bg-black/50 text-white">❮</a>
                <a href="#slide1" className="btn btn-circle bg-black/30 border-none hover:bg-black/50 text-white">❯</a>
              </div>
            </div>
          </div>
  
          {/* Info */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">{item.name}</h1>
            <p className="text-xl">💰 Price: {item.price}</p>
            <p className="text-xl">📦 Stock: {item.stock}</p>
            <p className="text-xl">🔥 Sold: {item.sold}</p>
            <p className="text-md sm:text-lg opacity-80">{item.description}</p>
          </div>
        </div>
  
        {/* Reviews */}
        <div className="mt-12">
          <button
            onClick={() => setShowReviews((prev) => !prev)}
            className={`px-6 py-2 font-medium rounded-lg transition-all duration-200 shadow-md ${
              themeMode === "dark"
                ? "bg-emerald-700/20 text-emerald-300 border border-emerald-400 hover:bg-emerald-700/40"
                : "bg-emerald-500 text-white hover:bg-emerald-600"
            }`}
          >
            {showReviews ? "Hide Reviews" : "Show Reviews"}
          </button>
  
          {showReviews && (
            <div className="mt-6 space-y-5">
              {Array.isArray(reviews) && reviews.length === 0 ? (
                <p className={`text-base ${themeMode === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  No reviews available for this product.
                </p>
              ) : (
                reviews?.interaction?.map((reviewObj) => {
                  let ratingColor =
                    reviewObj.rating < 2
                      ? "text-red-500 dark:text-red-400"
                      : reviewObj.rating < 3.5
                      ? "text-amber-500 dark:text-amber-300"
                      : "text-green-600 dark:text-green-400";
  
                  const fullStars = Math.floor(reviewObj.rating);
  
                  return (
                    <div
                      key={reviewObj._id}
                      className={`rounded-xl p-5 shadow-lg transition-all ${
                        themeMode === "dark"
                          ? "bg-gray-800 border border-gray-700 text-gray-100"
                          : "bg-gray-100 border border-gray-300 text-gray-900"
                      }`}
                    >
                      <p className="text-lg font-semibold italic mb-2">"{reviewObj.review}"</p>
                      <p className="text-sm flex items-center gap-2">
                        Rating:{" "}
                        <span className={`font-bold ${ratingColor}`}>
                          {reviewObj.rating} / 5 ⭐
                        </span>
                        <span className="flex">
                          {Array.from({ length: fullStars }).map((_, idx) => (
                            <span key={idx}>⭐</span>
                          ))}
                        </span>
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;

};

export default SellerProduct;





