'use client';

import { Toaster } from 'react-hot-toast'

const ToastContainer = () => {
    return (
        <Toaster
            position="bottom-left"
            reverseOrder={false}
            gutter={8}
        />
    )
}

export default ToastContainer