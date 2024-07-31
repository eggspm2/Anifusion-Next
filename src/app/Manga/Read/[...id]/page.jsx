"use client";

import { MangaChapter } from '@/components/hooks/UseApiFetch';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'

const page = ({ params }) => {
  console.log(params);
  useEffect(() => {
    const Fetching = async () => {
      const response = await MangaChapter(params.id.join('/'));
      if(response){
        console.log(response);
      }
    }
    Fetching();
  },[]);
  return (
    <div>page</div>
  )
}

export default page;
