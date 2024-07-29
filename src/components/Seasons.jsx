"use client";

import React from 'react'

 const Seasons = ({data}) => {
    if(!data) return <div>Loading ...</div>
  return (
    <div className='w-full  flex flex-col gap-4 p-[20px]'>
        <h1 className='text-[30px] font-semibold'>More Seasons</h1>
        <div className='flex gap-5 flex-wrap '>
        {data.map((item) => (
            <div key={item.id} className='w-[150px] h-[70px] flex relative overflow-hidden rounded-xl' style={{ backgroundImage: `url(${item.poster})` }}>
                <div className='SeasonImage w-[150px] h-[70px] rounded-xl absolute'></div>
                    <p className='z-10 text-[14px] font-semibold grid place-items-center w-full text-center'>{item.title}</p>
            </div>
        ))}
        </div>
    </div>
  )
}

export default Seasons;
