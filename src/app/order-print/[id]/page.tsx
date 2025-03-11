import OrderDetailsArea from '@/app/components/order-details/order-details-area'
import React from 'react'

export default async function page({params}:any) {
    const {id} = await params;
  return (
    <OrderDetailsArea id={id} print={true} />
  )
}
