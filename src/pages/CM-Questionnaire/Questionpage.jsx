/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-debugger */
import React, { useState, useEffect } from 'react';
import { saveCMQuestionnaire } from 'slices/ParticipantAnswerSlice';
import { useDispatch } from 'react-redux';
import CustomLoader from 'components/Utility/CustomLoader';
import Questionsec1 from './Questionsec1';
import ChuckMiller from '../../assets/images/Chuck-miller.png';

function Questionpage({
  result, studyId, vendorId, onCMComplete,
}) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [intervelId, setIntervelId] = useState(0);
  const dispatch = useDispatch();
  const [time, setTime] = useState(0);
  const startTimer = () => {
    const intervel = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    setIntervelId(intervel);
  };

  useEffect(() => {
    const transformedQuestions = result.map((question) => ({
      questionId: question.id,
      questionText: question.question,
      options: question.options.map((option) => ({
        id: option.id,
        answer: option.answer,
      })),
      type: question.input_type,
      data_type: question.data_type,
      isExclusive: question.is_exclusive_answer || false,
      levels: question.levels,
    }));
    setQuestions(transformedQuestions);
    setIsLoading(false);
    startTimer();
  }, [studyId, vendorId]);

  const answerQuestion = (data) => {
    dispatch(saveCMQuestionnaire({
      answer: data.answer,
      levels: data.levels,
      question_id: data.question_id,
      TID: vendorId,
      study_id: studyId,
      spend_time: time,
      userSpId: localStorage.getItem('spfjkshdfjbnvcbj'),
    }));
    if (currentQuestionIndex < questions.length - 1) {
      if (intervelId !== 0) {
        clearInterval(intervelId);
        setIntervelId(0);
        startTimer();
      } else {
        startTimer();
      }
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTime(0);
    } else {
      onCMComplete();
    }
  };

  const activitiesArray = (questions.length > 0 && questions[currentQuestionIndex].levels)
    ? questions[currentQuestionIndex].levels.split(',')
    : '';
  return (
    <div className='md:flex md:justify-center md:items-center'>
      <div className='md:w-[1490px] flex justify-center items-center md:p-2 pl-1'>
        <div className='lg:flex flex-col gap-4 justify-center items-center w-[40%] h-[97vh] bg-gradient-to-tl from-[#1A6508] via-[#1f739d] to-[#0970A4] text-white rounded-l-3xl px-4 hidden'>
          <div className='flex flex-col justify-center items-center'>
            <div className='text-4xl text-white font-poppins'>Keep it Up!</div>
            <div className='mt-2 text-2xl text-white text-center'>
              Your input makes a difference
            </div>
          </div>
          <div className='flex flex-col items-center text-center w-full max-w-[500px]'>
            <img
              src={ChuckMiller}
              alt='logo'
              className='rounded-lg w-full h-auto object-contain'
            />
          </div>
        </div>
        {/* Right Side */}
        <div className='w-[98vw] h-[97vh] lg:w-[60%] lg:rounded-r-3xl lg:rounded-l-none rounded-3xl bg-slate-200 overflow-y-auto'>
          {isLoading ? (
            <CustomLoader />
          ) : (
            <Questionsec1
              questionId={questions[currentQuestionIndex].questionId}
              question={questions[currentQuestionIndex].questionText}
              options={questions[currentQuestionIndex].options || []}
              activities={activitiesArray}
              type={`${questions[currentQuestionIndex].type}-${activitiesArray.length}`}
              progress={((currentQuestionIndex + 1) / questions.length) * 100}
              onNext={answerQuestion}
              isExclusive={questions[currentQuestionIndex].isExclusive || false}
              dataType={questions[currentQuestionIndex].data_type || false}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Questionpage;
