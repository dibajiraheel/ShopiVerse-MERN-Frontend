import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({
    themeMode = 'dark',
    itemId,
    itemTitle,
    itemDescription,
    itemPrice,
    itemImageUrl,
    stock,
    sold,
    itemPageNo,
}) => {
  return (
    <div className='shadow-2xl scale-90 shadow-purple-300 duration-700 hover:scale-95 rounded-4xl backdrop-blur-lg'>

        <div className={`w-96 h-130 overflow-hidden card rounded-4xl`}>
            <Link to={`/customer/item/${itemId}/${itemPageNo}`}>
                <figure>
                    <img className='bg-cover w-full h-56'
                    src={itemImageUrl ? itemImageUrl : "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
                    alt="Shoes" />
                </figure>
            </Link>
        <div className="card-body">
            <h2 className="card-title italic font-bold line-clamp-2">{itemTitle ? itemTitle : 'Card Title'}</h2>
            <p className='h-26 text-justify line-clamp-3 overflow-hidden italic'>{itemDescription ? itemDescription : 'A card component has a figure, a body part, and inside body there are title and actions parts'}</p>
            <div className="card-actions justify-end">
            <h1 className='my-3 text-xl font-bold text-green-600'><span className="text-pink-400 px-3">Price</span>{itemPrice ? itemPrice : 1999}</h1>
            <div className='w-full flex flex-row justify-between items-center'>
                <h1>Stock: {stock ? stock : 96}</h1>
                <h1>Sold: {sold ? sold : 14}</h1>
            </div>
            
            </div>
        </div>
        </div>

    </div>
  )
}

export default ProductCard