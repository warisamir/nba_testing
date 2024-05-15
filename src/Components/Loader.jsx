import React from 'react'

const Loader = () => {
    return (
        <div className='h-screen w-full flex justify-center items-center'>
            <div className='bg-white w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin'></div>
        </div>
    )
}

export default Loader