import React from 'react'
import ShopPage from '../../components/ShopPage'

const Shop = ({params}) => {
  return (
    <div className=''>
        <ShopPage category={params.category} />
    </div>
  )
}

export default Shop