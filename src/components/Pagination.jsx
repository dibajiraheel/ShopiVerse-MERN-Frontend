import { LogIn } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const Pagination = ({
    totalPages,
    pagesFromTo,
    activePageNo,
    handlePaginationClick
}) => {

    const [pages, setPages] = useState([])
    const [firstPageNo, setFirstPageNo] = useState(null)
    const [lastPageNo, setLastPageNo] = useState(null)

    useEffect(() => {
        
        if (pagesFromTo) {

            const currentPages = []
            
            const pagesToStartFrom = pagesFromTo[0]
            const pagesToEndOn = pagesFromTo[1]
            
            const noOfPagesFromTo = pagesToEndOn - pagesToStartFrom
            
            for (let i = 0; i <= noOfPagesFromTo; i++) {
                const currentPage = pagesToStartFrom + i
                currentPages.push(currentPage)
            }
    
            setPages(currentPages)
            console.log('CURRENT PAGES', currentPages);
            setFirstPageNo(pagesFromTo[0])
            setLastPageNo(pagesFromTo[1])
            
        }

    }, [pagesFromTo, totalPages])

    useEffect(() => {
        if (totalPages) {
            const currentPages = []
            for (let i = 0; i < totalPages; i++) {
                currentPages.push(i + 1)
            }
            setPages(currentPages)
            setFirstPageNo(1)
            setLastPageNo(totalPages)
        }
    }, [totalPages, pagesFromTo])

  return (

    <div>

        <div className="join flex flex-row flex-wrap mx-5">

            {
                activePageNo == firstPageNo ? 
                
                <input className="join-item btn rounded-full bg-gray-700  mx-1" type="radio" name="options" aria-label={'Previous'} />

                :
                
                <input onClick={handlePaginationClick} className="join-item btn rounded-full bg-yellow-700 hover:bg-yellow-800 mx-1" type="radio" name="options" aria-label={'Previous'} />
            }

                {
                    totalPages ? pages.map((page) => {
                        
                        if ((activePageNo) == page) {
                            return (
                                <input key={page} onClick={handlePaginationClick} className="join-item btn btn-square rounded-full mx-1" type="radio" name="options" aria-label={page} checked="checked" />
                            )
                        }
                        else {
                            return (
                                <input key={page} onClick={handlePaginationClick} className="join-item btn btn-square rounded-full mx-1" type="radio" name="options" aria-label={page} />
                            )
                        }

                    }) : null
                }

                {
                    pagesFromTo ? pages.map((page) => {
                        if ((activePageNo) == page) {
                            return (
                                <input key={page} onClick={handlePaginationClick} className="join-item btn btn-square rounded-full mx-1" type="radio" name="options" aria-label={page} checked="checked" />
                            )
                        }
                        else {
                            return (
                                <input key={page} onClick={handlePaginationClick} className="join-item btn btn-square rounded-full mx-1" type="radio" name="options" aria-label={page} />
                            )
                        }
                    }) : null
                }

            {
                activePageNo == lastPageNo ? 
                
                <input className="join-item btn rounded-full bg-gray-700  mx-1" type="radio" name="options" aria-label={'Next'} />
                
                :
            
                <input onClick={handlePaginationClick} className="join-item btn rounded-full bg-green-700 hover:bg-green-800 mx-1" type="radio" name="options" aria-label={'Next'} />
            
            }
            

        </div>

    </div>

  )

}

export default Pagination