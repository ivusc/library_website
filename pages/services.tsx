import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import { Heading, Progress, Title } from '../components'
import { ILibData } from '../interface'

interface IService {
  libraryData: ILibData[];
}

const env = process.env.NODE_ENV;
let baseURL : string = 'https://libraryapp.ivuschua.com/api/crowd';

if(env == "development"){
  baseURL = 'http://localhost:3000/api/crowd';
}
export const getServerSideProps : GetServerSideProps = async () => {
  console.log(env)
  const response = await fetch(baseURL).then((res) => res.json());
  return {
    props: {
      libraryData: response.libraryData
    }
  }
}

const Services : NextPage<IService> = ({ libraryData }) => {
  console.log(env)
  return (
    <div className='mx-10 flex flex-col space-y-3 h-screen xl:mx-[10em]'>
      <Heading>Sevices</Heading>
      <div className='w-full flex flex-col justify-center'>
        <Title classStyles='mt-5 dark:text-gray-300 text-gray-700'>Crowd Level</Title>
        {libraryData.map((library) => (
          <div className='grid grid-cols-12' key={library.name}>
            <p className='col-span-3 font-fira text-lg'>{ library.name }</p>
            <Progress progress={library.crowdLevel?.toString().concat('%')} classStyles={'w-[70%] col-span-9 '}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Services
