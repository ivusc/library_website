import { NextPage } from 'next'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button, Loader, Title } from '../../components'
import { Address, Library } from '../../interface'

interface IGeolocation {
  latitude: number,
  longitude: number
}

const Nearby : NextPage = () => {
  const [geolocation, setGeolocation] = useState<IGeolocation>({ latitude: NaN, longitude: NaN });
  const [libraries, setLibraries] = useState<Library[]>([]);
  const [address, setAddress] = useState<Address>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // console.log("Latitude is : ", position.coords.latitude);
          // console.log("Longitude is :", position.coords.longitude);
          
          if (position.coords.latitude !== NaN) {
            setGeolocation({ latitude: position.coords.latitude, longitude: position.coords.longitude })
            // console.log('finding libraries and current location',position.coords.latitude, position.coords.longitude)
            setLoading(true)
            fetch(`https://libraryapp-ivusc.vercel.app/api/lib/${position.coords.latitude},${position.coords.longitude}`).then((res) => res.json())
              .then((libraries) => setLibraries(libraries.libraries));
            fetch(`https://libraryapp-ivusc.vercel.app/api/geocode/${position.coords.latitude},${position.coords.longitude}`).then((res) => res.json())
              .then((address) => setAddress(address.geocode));
            setLoading(false)
          }
        },
        (error) => {
          console.error("Error Code = " + error.code + " - " + error.message);
        }
      )
    }
  }, [])

  if (loading) return <Loader />
  
  return (
    <div className='mx-10 flex flex-col space-y-1 h-full min-h-screen xl:mx-[10em]'>
      <Title classStyles='mt-5 dark:text-gray-300 text-gray-700 mt-[4em]'>Nearby Libraries</Title>
      <p className='font-fira text-lg'>Your current location: {geolocation.latitude} {geolocation.longitude} ({address?.formatted_address})</p>
      { libraries.length > 0 && libraries.map((library) => <p className='font-fira text-lg'>{library.name} ({library.vicinity}) {library.opening_hours.open_now ? 'Open' : 'Closed' } </p>) }
      <div className="flexCenter pt-5 pb-8">
        <Link href='/services'>
          <Button type='button'> ← Back</Button>
        </Link>
      </div>
    </div>
  )
}

export default Nearby