import { NextPage } from 'next'
import React from 'react'
import { Card, Heading } from '../../components'
import { ServiceItems } from '../../constant'


const Services : NextPage = () => {
  return (
    <div className='mx-10 flex flex-col space-y-3 h-full min-h-screen xl:mx-[10em]'>
      <Heading classStyles='text-center'>Sevices</Heading>
      <div className='flex flex-col items-center justify-center min-h-[70vh]'>
        <div className='w-[40%] gap-4 grid grid-cols-2 '>
          {ServiceItems.map((item) => <Card item={item} key={item.title}/>)}
        </div>
      </div>
    </div>
  )
}

export default Services
