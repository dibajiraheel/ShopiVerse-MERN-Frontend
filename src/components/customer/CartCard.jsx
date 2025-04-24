import React from 'react'
import Button from '../Button'
import CheckBox from '../CheckBox'

const CartCard = ({
    themeMode = 'dark',
    itemName,
    itemPrice,
    itemImageUrl,
    itemQuantity,
    itemAmount,
    itemId,
    handleRemoveItemFromCart,
    itemChecked,
    handleItemChecked
}) => {
  
    return (
    
    <div className='p-5 mt-5 flex flex-col md:flex-row justify-around items-center scale-90 hover:scale-100 duration-700 border-transparent rounded-2xl shadow-lg hover:shadow-2xl shadow-cyan-300 backdrop-blur-lg'>

        <div className='md:mb-0 mb-5 '>
            <CheckBox id={itemId} checked={itemChecked} onChange={handleItemChecked} />
        </div>

        <div className='md:px-24 flex flex-col md:flex-row gap-10 w-full  justify-around '>
            
            <div className='flex flex-row justify-center items-center'>

                <div className=''>
                    <img className='w-36 h-36 rounded-2xl border-transparent shadow-2xl shadow-purple-500 scale-90 hover:scale-95 duration-700' src={itemImageUrl ? itemImageUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHzkKrwEuqKsStB-5EDKzTuZ_SR3NQnTGjKQ&s"} />
                </div>
                
                <div className='px-10'>
                    <h1 className='font-bold text-xl'>{itemName ? itemName : 'Mobile'}</h1>
                    <h1 className='text-lg'>{`Rs: ${itemPrice ? itemPrice : '1000'}`}</h1>
                </div>

            </div>
            
            <div className='flex flex-col justify-around items-center'>
                <h1 className='tetx-lg font-bold'>{`Quantity: ${itemQuantity ? itemQuantity : 2}`}</h1>
                <h1 className='text-lg font-bold'>{`Total Amount: ${itemAmount ? itemAmount : 2000}`}</h1>
                <Button onClick={() => handleRemoveItemFromCart(itemId)} text={'Remove'} classes= {`${themeMode == "dark" ? "bg-transparent border border-red-500" : "bg-red-500"} rounded-md hover:bg-red-600 hover:bg-red-800 mt-5`} />
            </div>


        </div>
        
    </div>
  
)

}

export default CartCard