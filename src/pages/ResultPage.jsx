import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { QuizNavbar } from '../Components';
import GoogleLogo from '/Google Logo.png';
import { IoIosArrowForward } from "react-icons/io";
import Confetti from 'react-confetti';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const ResultPage = () => {
  const query = useQuery();
  const correctAnswers = useSelector((state) => state.quiz.correct);
  const attemptedAnswers = useSelector((state) => state.quiz.attempted);
  const resultsArray = useSelector((state) => state.quiz.quizResults);

  const [showConfetti, setShowConfetti] = useState(false);

  const handleClick = () => {
    // window.flutter_inappwebview.callHandler('MessageChannel', 'navigateToNewScreen');
    // Toaster.postMessage('buttonClicked');
    window.location.href = 'onehub://callback';
  }

  const [rewardsData, setRewardsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://gcptest.testexperience.site/getContestRewards_testingStore?contest_id=${query.get("contest_id")}&territory_id=${query.get("territory_id")}&user_points=${query.get("user_points")}&store_name=${query.get("store_name")}`);
        setRewardsData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const toggleConfetti = () => {
      setTimeout(() => {
        setShowConfetti(true);
      }, 1500);
      setTimeout(() => {
        setShowConfetti(false);
      }, 6500);
    }

    toggleConfetti();
    fetchData();
  }, []);

  // useEffect(() => {
  //   const postAnalytics = async () => {
  //     const result = {
  //       data: {
  //         territory_id: query.get("territory_id"),
  //         contest_id: query.get("contest_id"),
  //         store_name: query.get("store_name"),
  //         results: resultsArray,
  //       }
  //     }
  //     console.log(result);
  //     try {
  //       const response = await axios.post(`https://onehub-quiz-analytics.testexperience.site/analytic/${query.get("territory_id")}`, result)
  //       console.log(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   postAnalytics();
  // }, [])

  return (
    <div className='w-full font-googleSans min-h-screen relative bg-slate-50'>
      <QuizNavbar />
      <div className='w-full h-full absolute top-0 left-0 bg-black opacity-30 z-10'></div>

      <div className='w-full absolute bottom-0 flex flex-col justify-center items-center z-50 bg-white px-4 pt-4 rounded-t-2xl'>
        <div className='w-full flex justify-start items-center gap-3'>
          <div className='border-[1px] p-1.5 rounded-full'>
            <img src={GoogleLogo} alt="Google" className='w-7 h-7' />
          </div>
          <h2 className='font-medium text-xl'>Pixel Quiz</h2>
        </div>

        <div className='mt-4'>
          <h1 className='text-2xl font-medium'>Congratulations!</h1>
          <p className='text-sm font-medium mt-1'>You answered {query.get("user_points") / 50} questions correctly, and received {query.get("user_points")} points.</p>
        </div>

        <div className='my-10'>
          <button
            className='bg-[#4285F4] text-white font-medium px-5 py-3 rounded-xl flex justify-center items-center gap-2'
            onClick={handleClick}
          >
            Back to Home
            <IoIosArrowForward size={16} />
          </button>
        </div>
      </div>

      <div className='h-60 w-60 sm:h-72 sm:w-72 lg:h-96 lg:w-96 bg-white rounded-lg absolute top-[15%] left-[50%] translate-x-[-50%] z-50 overflow-hidden flex justify-center items-center shadow-xl'>
        <img src='/rewardPage/lower right.png' className='absolute object-cover bottom-0 right-0 animate-goBottomRight z-40' />
        <img src='/rewardPage/upper right.png' className='absolute object-cover top-0 right-0 animate-goTopLeft z-40' />
        <img src='/rewardPage/left.png' className='absolute object-cover top-0 left-0 animate-goLeft z-40' />
        <img src='rewardPage/yellow dot.png' className='absolute w-16 h-16 right-[10%] top-[45%] animate-fadeOut z-40' />
        <div className='w-full h-full flex justify-center items-center animate-popup'>
          {showConfetti && <Confetti className='w-full h-full animate-confetti z-0' />}
          <img src='/rewardPage/coin.png' className='h-40 w-40 sm:h-48 sm:w-48 lg:h-64 lg:w-64 z-10' />
          <div className='absolute flex gap-2 justify-center items-center bg-white bottom-8 lg:bottom-10 px-4 py-1 border-2 rounded-full z-10'>
            <img src={GoogleLogo} alt='Google' className='h-4 w-4' />
            <p className='text-lg lg:text-2xl font-bold'>{query.get("user_points")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
