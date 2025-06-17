'use client'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { paystackTestKey } from '@/sanity/env'

export default function CheckoutPage() {
  const [isPaystackReady, setPaystackReady] = useState(false)
  const cart = useSelector((state) =>  state.cart.productData)
  console.log(cart);
  
  const router = useRouter()

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://js.paystack.co/v1/inline.js'
    script.async = true
    script.onload = () => setPaystackReady(true)
    document.body.appendChild(script)
  }, [])

  const handlePayment = () => {
    if (!isPaystackReady || !window.PaystackPop) {
      toast.error('Payment system not ready. Please wait...')
      return
    }

    const handler = window.PaystackPop.setup({
      key: paystackTestKey, // Replace with your Paystack public key
      email: 'obichris202@gmail.com',  // Replace with real customer email
      amount: cartTotal * 100, // Paystack uses kobo
      currency: 'NGN',
      metadata: {
        custom_fields: [
          {
            display_name: 'Mobile Number',
            variable_name: 'mobile_number',
            value: '+2348012345678',
          },
        ],
      },
      callback: function (response) {
        toast.success('Payment successful! 🎉')
        console.log('Payment successful', response)
        router.push('/success') // Create this page
      },
      onClose: function () {
        toast('Transaction cancelled')
      },
    })

    handler.openIframe()
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="mb-6 space-y-4">
            {cart.map((item) => (
              <li key={item._id} className="flex justify-between border-b pb-2">
                <span>{item.title} x {item.quantity}</span>
                <span>₦{(item.price * item.quantity).toLocaleString()}</span>
              </li>
            ))}
          </ul>

          <div className="text-right mb-6">
            <p className="text-xl font-semibold">
              Total: ₦{cartTotal.toLocaleString()}
            </p>
          </div>

          <button
            onClick={handlePayment}
            disabled={!isPaystackReady}
            className={`w-full py-3 rounded text-white font-semibold ${
              isPaystackReady ? 'bg-black' : 'bg-gray-500 cursor-not-allowed'
            }`}
          >
            {isPaystackReady ? 'Pay with Paystack' : 'Loading Payment...'}
          </button>
        </>
      )}
    </div>
  )
}
