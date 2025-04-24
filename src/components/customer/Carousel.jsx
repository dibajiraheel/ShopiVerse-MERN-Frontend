import { Link } from 'lucide-react';
import React, { useEffect } from 'react'

const Carousel = ({
    itemImageOneUrl,
    itemImageTwoUrl
}) => {

    useEffect(() => {
        console.log('Page Rerendered');
        
    })

  return (
    <div className=''>
        
        <div className="carousel h-96 shadow-2xl shadow-purple-300 rounded-4xl">
            <div id="slide1" className="carousel-item relative w-full">
                <img
                src={itemImageOneUrl ? itemImageOneUrl : "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"}
                className="w-full object-cover" />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide4" className="btn btn-circle">❮</a>
                <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
                <img
                src={itemImageTwoUrl ? itemImageTwoUrl : "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"}
                className="w-full object-cover" />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide1" className="btn btn-circle">❮</a>
                <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
            </div>
        </div>
        

        {/* <div className="carousel carousel-center bg-transparent shadow-2xl h-120 shadow-purple-400 rounded-box max-w-md space-x-4 p-4 scale-90 hover:scale-100 duration-700">

            <div className="carousel-item">
                <img
                src={itemImageOneUrl ? itemImageOneUrl : "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"}
                className="rounded-box object-cover w-full h-full" />
            </div>
            <div className="carousel-item">
                <img
                src={itemImageTwoUrl ? itemImageTwoUrl : "https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"}
                className="rounded-box object-cover w-full h-full" />
            </div>
        
        </div> */}

    </div>
  )
}

export default Carousel