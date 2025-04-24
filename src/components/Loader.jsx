import React from 'react'

const Loader = () => {
  return (
    <div className='mt-20 flex flex-row justify-center items-center gap-10'>
        <span className="loading loading-ball loading-xs bg-red-600 scale-400"></span>
        <span className="loading loading-ball loading-sm bg-green-600 scale-400"></span>
        <span className="loading loading-ball loading-md bg-blue-600 scale-400"></span>
        <span className="loading loading-ball loading-lg bg-purple-600 scale-400"></span>
        <span className="loading loading-ball loading-xl bg-yellow-600 scale-400"></span>
    </div>
  )
}

export default Loader