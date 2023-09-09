import React from 'react';
import { iconUrlFromCode } from '../services/weatherService';

function Forecast({title,items}) {
    console.log("umm->", items);
  return (
        <div>
            <div className='flex items-center justify-start mt-6 '>
                <p className='text-white font-medium uppercase'>{title}</p>
            </div>
                <hr className='my-2'/>
            <div className='flex flex-row items-center justify-between text-white'>
        {
            items.map((i)=>(
                    <div className='flex flex-col items-center justify-center'>
                        <p className='font-light text-sm mb-2'> {i.title}</p>
                        <img src={iconUrlFromCode(i.icon)} alt="" className="w-12 my-1"/>
                        <p className='font-medium mt-2'>{`${i.temp.toFixed()}°`}</p>
                    </div>
                
        ))}
        </div>        
    </div>
  )
}

export default Forecast