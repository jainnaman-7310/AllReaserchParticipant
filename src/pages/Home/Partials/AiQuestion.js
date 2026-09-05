import React, { useState } from 'react';
import { AlertBox } from 'components/Alert/Validation';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { getAiQuestionReviewed } from '../../../slices/ParticipantSlice';

function AiQuestion({
  aiQuestion, moveToScreener, vendorId, studyId, userLandingUrl, userId, PID,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pastedContent, setPastedContent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [aiAnswer, setAiAnswer] = useState('');
  const dispatch = useDispatch();
  const { t } = useTranslation();
  // save participant reply
  async function handleSubmit() {
    if (aiAnswer !== '' && aiAnswer !== 'undefined') {
      // review the answer whether the content is pasted or not
      const obj = {
        studyId,
        vendorId,
        userAnswer: aiAnswer,
        question: aiQuestion[currentIndex].question,
        questionsId: aiQuestion[currentIndex].id,
        userId,
        userLandingUrl,
        pastedContent,
        type: 'ai_question',
        PID,
        userSpId: localStorage.getItem('spfjkshdfjbnvcbj'),
      };
      const result = await dispatch(getAiQuestionReviewed(obj));
      if (result.payload.success) {
        window.location.href = result.payload.redirectUrl;
      } else if (currentIndex === aiQuestion.length - 1) {
        // move toward screenar Question after last Ai Question
        await moveToScreener();
      } else {
        setCurrentIndex(currentIndex + 1);
        setAiAnswer('');
      }
    } else {
      AlertBox(t('home.alert.title'), t('home.alert.enterAnswer'), t);
    }
  }

  const handleChange = (e) => {
    setAiAnswer(e.target.value);
  };
  const handleMouseOver = () => {
    setHovered(true);
  };
  const handleMouseOut = () => {
    setHovered(false);
  };
  return (
    <div
      className='w-full bg-white shadow-md flex flex-col gap-[30px] mb-[50px] rounded-[10px] p-[30px] px-[5vw] mt-20'
    >

      <div className='flex flex-col gap-[20px] justify-center'>
        <p className='text-[20px] font-bold'>{`${aiQuestion[currentIndex].question}`}</p>
        <div className='h-[50px]'>
          <input
            type='text'
            className={`w-full outline-none p-[10px] box-border focus:bg-[#F4F8FD] rounded-md
              ${hovered ? 'border-2 border-[#056E9C]' : 'border border-black'} 
              hover:border-2 hover:border-[#056E9C]`}
            onPaste={() => setPastedContent(1)}
            onMouseOver={handleMouseOver} // Triggered on mouse hover
            onMouseOut={handleMouseOut} // Triggered when mouse leaves
            onFocus={handleMouseOver} // Triggered when input is focused (keyboard users)
            onBlur={handleMouseOut}
            value={aiAnswer}
            onChange={handleChange}
          />
        </div>

      </div>

      <button
        type='submit'
        onClick={handleSubmit}
        className='w-max bg-[#056E9C] p-[10px] px-[30px] rounded-[5px] text-white'
      >
        {t('home.question.submit')}
      </button>
    </div>

  );
}

export default AiQuestion;
