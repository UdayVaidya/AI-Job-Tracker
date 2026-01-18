import React from 'react'
import { Loader } from 'rsuite';

const LoaderComponent = () => {
    return (
        <div className='flex justify-center items-center h-full'>
            <Loader size="lg" content="Loading..." />
        </div>
    )
}

export default LoaderComponent