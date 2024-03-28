import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSuccess = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <div className="flex items-center justify-center mb-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-16 h-16 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm4.293 7.293l-6 6a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 1.414-1.414L9 11.586l5.293-5.293a1 1 0 0 1 1.414 1.414z"
                        />
                    </svg>
                    <h2 className="text-2xl font-semibold">Payment Successful!</h2>
                </div>
                <p className="text-gray-600 mb-6">
                    Thank you for your booking. Your payment has been successfully processed.
                </p>
                <div className="flex justify-end">
                    <Link to='/home' className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Go Back to home
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default CheckoutSuccess;
