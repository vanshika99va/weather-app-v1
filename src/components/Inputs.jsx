import React, { useState } from 'react'
import { UilSearch,UilLocationPoint  } from '@iconscout/react-unicons'
import { toast } from 'react-toastify';

function Inputs({handleQuery,  handleUnits}) {

    const [city,setCity] = useState("");

    const handleKeyDown = (event) => {
        if(city != "" && event.key === 'Enter'){
            handleQuery(event.target.value);
        }
    }
    const handleSearchClick =(event) =>{
        if(city !== '')
            handleQuery(city)
    } 
    const handleLocationClick = () =>{
        if(navigator.geolocation){
            toast.info('Fetching users location');
            navigator.geolocation.getCurrentPosition((position)=>{
                toast.success('Location fetched!');
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                handleQuery(lat,lon);
            })
        }
    }

  return (
    <div className='flex flex-row justify-center my-6'>
        <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
            <input 
                type='text' 
                value={city}
                onChange={(e)=>setCity(e.currentTarget.value)}
                className='text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase'
                placeholder='Search for city ..'
                onKeyDown={handleKeyDown}
            />
            <UilSearch size={25} className="text-white cursor-pointer transition ease-out hover:scale-125" onClick={(e)=> handleQuery(e.target.value)}/>
            <UilLocationPoint size={25} className="text-white cursor-pointer transition ease-out hover:scale-125" onClick={handleLocationClick}/>

        </div>
        <div className='flex flex-row w-1/4 items-center justify-center'>
            <button name="metric" className='text-xl text-white font-light cursor-pointer transition ease-out hover:scale-125' onClick = {()=>handleUnits('metric')}>°C</button>
            <p className='text-xl text-white mx-2'>|</p>
            <button name="imperial" className='text-xl text-white font-light cursor-pointer transition ease-out hover:scale-125' onClick = {()=>handleUnits('imperial')}>°F</button>
        </div>

    </div>
  )
}

export default Inputs