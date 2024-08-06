"use client";

import { faClock, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';

export const Chapters = ({data,id}) => {
  return (
    <div className='flex w-full justify-center items-center'>
        <div className='w-[95%] flex justify-center flex-col gap-4 bg-zinc-800/50 rounded-lg border border-zinc-500/50'>
            <h1 className='text-[35px] w-full p-[15px] font-semibold max-md:text-[25px]'>Chapters</h1>
            <div className='flex flex-col gap-4 p-[10px] w-full font-semibold max-md:text-[12px]'>
                {data.chapterList.map((item, index) => (
                    <Link href={`/Manga/Read/${id}/${item.id}`} key={index} className='flex w-full justify-between items-center bg-zinc-700/50 rounded-lg p-[10px] z-10'>
                        <div className='flex justify-center items-center gap-2 bg-white text-black py-[5px] w-[100px] max-md:w-min max-md:px-[5px] rounded-lg'>
                            <FontAwesomeIcon icon={faEye}/>
                            <p>{item.view}</p>
                        </div>
                        <p>{item.name}</p>
                        <div className='flex justify-center items-center gap-2 bg-white text-black py-[5px] w-[120px] max-md:w-max max-md:px-[5px] rounded-lg'>
                            <FontAwesomeIcon icon={faClock}/>
                            <p>{item.createdAt}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </div>
  )
}
