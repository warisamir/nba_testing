import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GoogleLogo from '/Google Logo.png';
import WelcomeScreenPoster from '/Welcome Screen Poster.png';
import ImageLoader from '../Components/ImageLoader';
import axios from 'axios';
import { Autocomplete, TextField } from '@mui/material';

const contest_id = 1;
const territory_id = "NewYork, NY";

const stores = [
  "VZW CSOK // 507 Us Hwy 77 Unit 1100 - Waxahachie",
  "TMO COR // 3050 Camp Wisdom Rd Suite 100 - Grand Prairie",
  "TMO COR // 109 E. Fm 544 Suite 105 - Murphy",
  "TMO COR // 2501 W Airport Freeway Suite 100 - Irving",
  "VZW WirelessZone // 404 N Interstate 35 E Ste 110 - Lancaster",
  "TMO COR // 9310 Forest Lane - Dallas",
  "TMO COR // 8180 Park Ln Ste C349 - Dallas",
  "TMO COR // 3703 Camp Wisdom Rd - Dallas",
  "VZW COR // 7190 Skillman St Ste 100 - Dallas",
]

const HomePage = () => {
  const navigate = useNavigate();

  const [store, setStore] = useState('');

  return (
    <div className="bg-white min-h-screen w-full flex flex-col justify-start items-center">
      <header className='w-full py-2 gap-2 flex flex-col'>
        <div className='w-full max-w-2xl mx-auto'>
          <ImageLoader src={WelcomeScreenPoster} />
        </div>
      </header>
      <main>
        <div className='max-w-2xl px-4 mx-auto mt-6 text-center flex flex-col gap-0.5 justify-center items-center'>
          <img src={GoogleLogo} alt="" className='h-5 w-5 md:h-8 md:w-8' />
          <h2 className='font-semibold text-xl sm:text-2xl md:text-4xl mt-2'>Welcome to</h2>
          <h1 className='font-semibold text-2xl sm:text-3xl md:text-5xl -mt-0.5'>Pixel Quiz Challenge</h1>
          <p className='font-medium text-sm md:text-xl text-zinc-600 mt-3 leading-tight'>Play Pixel Quiz Challenge and win coupons and many more rewards...</p>
        </div>

        <div className='w-full max-w-md px-4 mx-auto mt-6 flex justify-center items-center'>
          <Autocomplete
            disablePortal
            id='combo-box-demo'
            options={stores}
            sx={{ width: 300 }}
            onChange={(event, newValue) => {
              setStore(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Store" />}
          />
        </div>

        <div className='max-w-2xl px-4 mx-auto mt-6 text-center'>
          <p className='text-xs md:text-lg tracking-tight leading-tight text-zinc-500 text-left'>
            Porem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. quent per conubia nostra, per inceptos himenaeos
            <span className='text-[#4285F4]'>qui temporibus provident quis</span>
          </p>
          <button
            disabled={store === ''}
            onClick={() => navigate(`/quiz?territory_id=${territory_id}&contest_id=${contest_id}&store_name=${store}`)}
            className="bg-[#4285F4] disabled:bg-blue-300 rounded-full w-full mt-4 md:mt-8 shadow-md text-white py-4 md:py-6 font-medium sm:text-3xl"
          >
            Start Playing
          </button>
        </div>
      </main>
    </div>
  )
}

export default HomePage