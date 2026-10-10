import React, { useState } from 'react';
import { AlertBox } from 'components/Alert/Validation';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { getAiQuestionReviewed } from '../../../slices/ParticipantSlice';

const SUBMIT_BUTTON_CLASS = [
  'inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-5',
  'text-sm font-semibold text-white shadow-[0_9px_20px_rgba(15,127,131,0.15)] transition',
  'hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-700/15 sm:w-auto sm:min-w-[132px]',
].join(' ');

function AiQuestion({
  aiQuestion, moveToScreener, vendorId, studyId, userLandingUrl, userId, PID,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pastedContent, setPastedContent] = useState(0);
  const [aiAnswer, setAiAnswer] = useState('');
  const dispatch = useDispatch();
  const { t } = useTranslation();

  async function handleSubmit() {
    if (aiAnswer !== '' && aiAnswer !== 'undefined') {
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
        await moveToScreener();
      } else {
        setCurrentIndex(currentIndex + 1);
        setAiAnswer('');
      }
    } else {
      AlertBox(t('home.alert.title'), t('home.alert.enterAnswer'), t);
    }
  }

  const total = aiQuestion.length;
  const current = currentIndex + 1;
  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className='flex min-h-[70vh] items-center justify-center py-6'>
      <div className='w-full max-w-[820px] rounded-[18px] border border-slate-200 bg-white px-4 py-6 shadow-[0_18px_48px_rgba(16,24,40,0.08)] sm:px-8 sm:py-8'>
        <div className='mb-4 flex items-center gap-3.5'>
          <div className='h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200'>
            <span className='block h-full rounded-full bg-teal-700 transition-[width] duration-300' style={{ width: `${progress}%` }} />
          </div>
          <span className='min-w-[54px] text-right text-xs font-bold text-slate-600'>
            {current}
            {' / '}
            {total}
          </span>
        </div>

        <h3 className='my-5 break-words text-[18px] font-bold leading-7 text-slate-900 sm:text-[20px]'>{aiQuestion[currentIndex].question}</h3>
        <input
          type='text'
          className='w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-[14px] text-slate-900 outline-none transition focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10'
          onPaste={() => setPastedContent(1)}
          value={aiAnswer}
          onChange={(e) => setAiAnswer(e.target.value)}
        />

        <div className='mt-5 flex justify-end'>
          <button
            type='submit'
            onClick={handleSubmit}
            className={SUBMIT_BUTTON_CLASS}
          >
            {t('home.question.submit')}
            <span className='text-base'>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AiQuestion;
