import React, { useEffect, useState } from 'react';
// import { quizQuestions } from '../constants/quizQuestions';

import { useSelector, useDispatch } from 'react-redux';
import { nextQuestion, addCorrect, addAttempted, handleQuizResults, fetchQuizData, resetQuizResults } from '../app/slice/quizSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader, Timer, QuizNavbar } from '../Components/index'

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const QuizPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();

  const status = useSelector((state) => state.quiz.status);
  const quizData = useSelector((state) => state.quiz.quizData);
  const currentIndex = useSelector((state) => state.quiz.index);
  const score = useSelector((state) => state.quiz.correct);

  const [answered, setAnswered] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [timer, setTimer] = useState(null);
  const [remainingTime, setRemainingTime] = useState(35);
  const [territoryId, setTerritoryId] = useState('');
  const [contestId, setContestId] = useState('');
  const [storeName, setStoreName] = useState('');

  const [selectedOption, setSelectedOption] = useState(null);

  const resultsArray = useSelector((state) => state.quiz.quizResults);
  console.log(resultsArray);

  // Fetching Quiz Data
  useEffect(() => {
    dispatch(fetchQuizData());
  }, []);

  // Fetching the current question
  useEffect(() => {
    if (quizData.length > 0) {
      setCurrentQuestion(quizData[currentIndex - 1]);
      // console.log(currentQuestion);
    }
  }, [quizData, currentIndex]);

  // Fetching the correct question
  useEffect(() => {
    if (currentQuestion !== null) {
      setCorrectAnswer(currentQuestion.options[currentQuestion.correctAnswerIndex]);
      // console.log(correctAnswer);
    }
  }, [currentQuestion]);


  const handleNextQuestion = () => {
    if (currentIndex === quizData.length) {
      setTimeout(() => {
        navigate(`/result?territory_id=${territoryId}&contest_id=${contestId}&user_points=${score * 50}&store_name=${storeName}`);
      }, 500);
    } else {
      dispatch(nextQuestion());
      setSelectedAnswer('');
      setRemainingTime(35);
      setAnswered(false);
      setIsCorrectAnswer(false);
      clearInterval(timer);
    }
  };

  useEffect(() => {
    setTerritoryId(query.get("territory_id"));
    setContestId(query.get("contest_id"));
    setStoreName(query.get("store_name"));
    // console.log("Territory ID is: ", territoryId);
    dispatch(resetQuizResults())
  }, [territoryId]);

  useEffect(() => {
    if (!answered && currentIndex <= quizData.length) {
      const interval = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime === 0) {
            clearInterval(interval);
            setRemainingTime(1);
            setAnswered(true);
            setSelectedAnswer('');  // No answer selected
            dispatch(addAttempted());
            dispatch(handleQuizResults({ correct: false, optionIndex: null }))
            // Start a new interval for the 4 seconds to show the correct answer
            const newInterval = setInterval(() => {
              setRemainingTime((prevTime) => {
                if (prevTime === 0) {
                  clearInterval(newInterval);
                  handleNextQuestion();
                  return 35;
                }
                return prevTime - 1;
              });
            }, 1000);
            setTimer(newInterval);

            return 1;  // Set the remaining time to 3 seconds
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [answered, quizData, currentIndex]);


  const handleSubmit = (selected) => {
    setAnswered(true);
    setSelectedAnswer(selected);
    if (selected === correctAnswer) {
      setIsCorrectAnswer(true);
      dispatch(handleQuizResults({ correct: true, optionIndex: selectedIndex }));
      dispatch(addCorrect());
    } else {
      dispatch(handleQuizResults({ correct: false, optionIndex: selectedIndex }));
      setIsCorrectAnswer(false);
    }

    dispatch(addAttempted());
    setSelectedOption(null);
    setRemainingTime(1);
    const newInterval = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(newInterval);
          if (currentIndex === quizData.length) {
            navigate(`/result?territory_id=${territoryId}&contest_id=${contestId}&user_points=${(score + (selected === correctAnswer ? 1 : 0)) * 50}&store_name=${storeName}`);
          } else {
            handleNextQuestion();
          }
          return 35;
        }
        return prevTime - 1;
      });
    }, 1000);
    setTimer(newInterval);
  };

  const handleOptionClick = (option, i) => {
    setSelectedOption(option)
    setSelectedIndex(i)
  }

  const handleSkip = () => {
    handleNextQuestion();
    clearInterval(timer);
  };

  if (status === "loading") {
    return <Loader />
  }

  if (status === "failed") {
    return <p>Error Loading the quiz data. Please Try again later.</p>
  }

  return (
    <div className='w-full font-googleSans min-h-screen bg-slate-50'>
      <QuizNavbar />
      <main className='w-full h-full min-h-screen mt-6 max-w-2xl mx-auto px-4 sm:px-6 md:px-8 lg:max-w-[1440px] flex justify-center items-center'>
        {currentQuestion && (
          <>
            <div className='flex flex-col xl:flex-row xl:gap-8 mt-2 xl:w-full xl:justify-center xl:items-center'>
              <div className='xl:w-1/2'>
                <Timer time={remainingTime} imgsrc={currentQuestion.imageUrl} />
              </div>
              <div className='xl:w-1/2 flex flex-col gap-2 mt-4 xl:mt-0'>
                <div className='flex justify-between font-medium text-slate-400'>
                  <p className='text-sm xl:text-base'>{currentQuestion?.index}/10</p>
                  <p className='text-sm xl:text-base'>(50 Points)</p>
                </div>

                <p className='font-semibold text-center my-2 text-base xl:text-lg'>
                  {currentQuestion.question}
                </p>

                <form className='flex flex-col gap-2.5 justify-start items-start w-full'>
                  {currentQuestion.options.map((option, i) => (
                    <button
                      disabled={answered}
                      className={`w-full flex justify-start items-center gap-2 px-3 py-1 transition border-2
                        ${(selectedOption && option === selectedOption) ? 'border-yellow-500 border-2 rounded-lg bg-gradient-to-b from-yellow-100 via-yellow-100 to-transparent' : ''}
                        ${(answered && isCorrectAnswer && option === correctAnswer) ? 'border-green-500 border-2 rounded-lg bg-gradient-to-b from-green-100 via-green-100 to-transparent' : ''}
                        ${(answered && option === selectedAnswer) && option !== correctAnswer ? 'border-red-500 border-2 rounded-lg bg-gradient-to-b from-red-100 via-red-100 to-transparent' : ''}
                        ${(answered && !isCorrectAnswer) && option === correctAnswer ? 'border-green-500 border-2 rounded-lg bg-gradient-to-b from-green-100 via-green-100 to-transparent' : ''}
                      `}
                      key={i}
                      type='button'
                      onClick={() => handleOptionClick(option, i)}
                    >
                      <p className='font-bold text-base xl:text-lg'>{i + 1}.</p>
                      <p className='text-left text-base xl:text-lg'>{option}</p>
                    </button>
                  ))}
                </form>

                <div className='flex flex-col justify-center items-center gap-2 px-2 w-full mb-6'>
                  <button
                    onClick={() => handleSubmit(selectedOption)}
                    className='bg-[#4285F4] disabled:bg-blue-400 text-white mx-auto px-5 py-2 rounded-full shadow-lg mt-2 transition text-base xl:text-lg'
                    disabled={selectedOption === null}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default QuizPage