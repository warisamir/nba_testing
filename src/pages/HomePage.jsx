import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import GoogleLogo from '/Google Logo.png';
import WelcomeScreenPoster from '/Welcome Screen Poster.png';
import ImageLoader from '../Components/ImageLoader';
import axios from 'axios';
import { Autocomplete, TextField } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

const contest_id = 2;

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const HomePage = () => {
  const navigate = useNavigate();

  const [store, setStore] = useState('');
  const [alreadyTaken, setAlreadyTaken] = useState(false);
  const [allStores, setAllStores] = useState([]);
  const [existingStores, setExistingStores] = useState([]);

  const query = useQuery();

  const [territoryId, setTerritoryId] = useState('');


  useEffect(() => {
    const getStores = async () => {
      const territoryIdValue = query.get("territory_id");
      setTerritoryId(territoryIdValue);

      try {
        const response1 = await axios.get(`https://stores-test-dot-odin-321417.uc.r.appspot.com/api/data/stores?territory=${query.get("territory_id")}`);
        const response2 = await axios.get(`https://gcptest.testexperience.site/fetch_quiztaken_rsa_testing?territory_id=${query.get("territory_id")}&contest_id=${query.get("contest_id")}`);
        console.log("All Stores : ", response1.data);
        console.log("Stores given quiz : ", response2.data.existingStoreNames);

        const storeNames = response1.data;
        const existingStoreNames = response2.data.existingStoreNames;

        setAllStores(storeNames);
        setExistingStores(existingStoreNames);

      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    }

    getStores();
  }, []);
  return (
    <div className="bg-white font-googleSans min-h-screen w-full flex flex-col justify-start items-center pb-10">
      <header className='w-full py-2 gap-2 flex flex-col'>
        <div className='w-full max-w-2xl mx-auto'>
          <ImageLoader src={WelcomeScreenPoster} />
        </div>
      </header>
      <main>
        <div className='max-w-2xl px-4 mx-auto mt-6 text-center flex flex-col gap-0.5 justify-center items-center'>
          <img src={GoogleLogo} alt="" className='h-5 w-5 md:h-8 md:w-8' />
          <h2 className='font-semibold text-xl sm:text-2xl md:text-4xl mt-2'>
            Welcome to
          </h2>
          <h1 className='font-semibold text-2xl sm:text-3xl md:text-5xl -mt-0.5 max-w-lg mx-auto'>
            The first RSA Facing Pixel AI Quiz (testing)
          </h1>
          <p className='font-medium text-sm md:text-xl text-zinc-600 mt-3 leading-tight max-w-lg mx-auto'>
            You can attempt this quiz multiple times with the RSAs in store.
          </p>
        </div>

        <div className='w-full max-w-md px-4 mx-auto mt-6 flex justify-center items-center'>
          <Autocomplete
            disablePortal
            id='combo-box-demo'
            options={allStores}
            sx={{ width: 300 }}
            onChange={(event, newValue) => {
              if (existingStores.includes(newValue)) {
                Swal.fire({
                  title: "Error",
                  text: "You've already given the quiz once!",
                  icon: "error",
                  confirmButtonColor: "#4285F4",
                });
                // toast.error('You have already given the quiz!');
                setAlreadyTaken(true);
                console.log("Already taken");
              } else {
                setAlreadyTaken(false);
                setStore(newValue);
              }
            }}
            renderInput={(params) => <TextField {...params} label="Store" />}
          />
        </div>

        <div className='max-w-2xl px-4 mx-auto mt-6 text-center'>
          <p className='text-xs md:text-lg tracking-tight leading-tight text-zinc-500 text-left'>
            • You will get 15 seconds to answer each question.<br />
            • Each question awards 50 points.<br />
            {/* • Attempt this quiz with the RSAs in store.<br />
            •{" "}<span className='text-[#4285F4]'>You can attempt this quiz multiple times.</span> */}
          </p>
          {/* <p className='text-xs md:text-lg tracking-tight leading-tight text-zinc-500 text-left mt-4'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam iusto necessitatibus animi enim. <span className='text-[#4285F4]'>illum libero voluptatum, in ullam natus a.</span>
          </p> */}
          <button
            disabled={store === '' || store === null || alreadyTaken}
            onClick={() => navigate(`/quiz?territory_id=${territoryId}&contest_id=${contest_id}&store_name=${store}`)}
            className="bg-[#4285F4] disabled:bg-blue-300 rounded-full w-full mt-4 md:mt-8 shadow-md text-white py-4 md:py-6 font-medium sm:text-3xl"
          >
            Start Playing
          </button>
        </div>
        <Toaster
          position="bottom-center"
          reverseOrder={false}
        />
      </main>
    </div>
  )
}

export default HomePage
