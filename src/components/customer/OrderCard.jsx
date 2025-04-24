import React from 'react'
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";

const OrderCard = ({
    themeMode = 'dark',
    orderId = '34879346738924',
    isCompleted = true,
    orderAmount,
    items = [],
    orderDate,
    orderTime,

    
}) => {
  

    return(
        
        <div className={`w-full lg:w-1/3 border border-transparent rounded-4xl shadow-lg shadow-blue-300 scale-90 duration-700 hover:scale-95 hover:shadow-2xl backdrop-blur-lg `}>

            <div className={`collapse collapse-arrow ${themeMode == 'dark' ? 'bg-transparent' : 'bg-white'}`}>
            <input type="radio" name="my-accordion-2" />

                <div className='collapse-title'>
                    <div className='text-center my-3 text-lg'>Order Date: {orderDate}</div>
                    <div className='text-center my-3 text-lg'>Order Time: {orderTime}</div>
                    <div className='text-center my-3 text-lg'>Order Id: {orderId}</div>
                    <div className='text-center my-3 mx-5 md:mx-10 text-lg'>Order Amount:<span className='font-extrabold text-green-700'> Rs {orderAmount}</span></div>
                    <div className='text-center my-3 mx-5 md:mx-10 text-lg'>Total Unique Items: <span className='text-pink-500 font-extrabold'>{items.length}</span></div>
                    <div className={`text-center mx-10 md:mx-48 font-bold rounded ${isCompleted ? 'border-green-500 hover:border-green-700 hover:bg-green-600' : `border-yellow-500 hover:border-yellow-700 hover:bg-yellow-600 ${themeMode == 'dark' ? 'hover:text-white' : 'text-black'}`} border rounded-2xl px-5 py-3`}>{isCompleted ? 'Completed' : 'Pending'}</div>
                </div>
            
                <div className="collapse-content text-sm">

                <div className='flex flex-col justify-center gap-5 items-center'>

                    {
                        items.map((item) => (
                            
                            <div className={`flex flex-col gap-y-5 w-full border-b-2 ${themeMode == 'dark' ? 'border-white' : 'border-pink-700'} py-5`}>
                                            
                                    <div className='flex flex-row justify-center items-center'>
                        
                                        <div className=''>
                                            <img className='w-36 h-36 rounded-2xl border-transparent shadow-2xl shadow-purple-500 scale-90 hover:scale-95 duration-700' src={item.itemImage ? item.itemImage : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHzkKrwEuqKsStB-5EDKzTuZ_SR3NQnTGjKQ&s"} />
                                        </div>
                                        
                                        <div className='px-10'>
                                            <h1 className='font-bold text-xl'>{item.itemName ? item.itemName : 'Mobile'}</h1>
                                            <h1 className='text-lg'>{`Rs: ${item.itemPrice ? item.itemPrice : '1000'}`}</h1>
                                        </div>
                        
                                    </div>
                                    
                                    <div className='flex flex-col justify-around items-center gap-3'>
                                        <h1 className='tetx-lg font-bold'>{`Quantity: ${item.itemQuantity ? item.itemQuantity : 2}`}</h1>
                                        <h1 className='text-lg font-bold'>{`Total Amount: ${item.totalPrice ? item.totalPrice : 2000}`}</h1>
                                        <h1 className={`mx-5 md:mx-10 font-extrabold rounded ${item.isCompleted ? 'border-green-500 hover:border-green-700 hover:bg-green-600' : `border-yellow-500 hover:border-yellow-700 hover:bg-yellow-600 ${themeMode == 'dark' ? 'hover:text-white' : 'text-black'}`} border rounded-2xl px-5 py-3`}>{item.isCompleted ? 'Completed' : 'Pending'}</h1>
                                    </div>
                            
                            </div>

                        ))
                    }

                </div>


                </div>
             
            </div>

        </div>


    )

}

export default OrderCard