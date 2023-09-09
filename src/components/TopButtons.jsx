import React from 'react'

function TopButtons({handleQuery}) {

    const cities = [
        {
            id:1,
            title:"Sydney"
        },
        {
            id:2,
            title:"Toronto"
        },
        {
            id:3,
            title:"London"
        },
        {
            id:4,
            title:"Paris"
        },
        {
            id:5,
            title:"Tokyo"
        },
    ]
  
  return (
    <div className="flex items-center justify-around my-6"> 
        {cities.map((city)=>(
            <button key={city.id} className='text-white text-lg font-medium' onClick={()=> handleQuery(city.title)}>{city.title}</button>
        ))}
    </div>
  )
}

export default TopButtons