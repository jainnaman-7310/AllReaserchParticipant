/* eslint-disable */
import React, { useState, useEffect } from 'react';

function RandomQuestionPage({ questionData, studyId, vendorId, submitRandomQuestion }) {
  const [questions, setQuestions] = useState([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [pasteContent, setPasteContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const transformedQuestions = questionData.map((question) => ({
      questionId: question.id,
      questionText: question.question,
      type: 'open-ended',
    }));
    setQuestions(transformedQuestions);
  }, [questionData, studyId, vendorId]);

  const handleInputChange = (e) => {
    setUserAnswer(e.target.value);
    setError('');
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handlePasteChange = (e) => {
    setPasteContent(e.clipboardData.getData('text'));
  };

  const submitAnswer = async () => {
    if (userAnswer.length < 7 || userAnswer.length > 300) {
      setError('Answer must be between 7 and 300 characters.');
      return;
    }
    let pastedResposne = false;
    if (userAnswer == pasteContent) {
      pastedResposne = true;
    }
    setError('');
    submitRandomQuestion({ userAnswer, questionsId: questions[0]?.questionId, studyId, vendorId, question: questions[0]?.questionText, pastedContent: pastedResposne });
  };

  return (
    <div className='flex min-h-[70vh] items-center justify-center py-6'>
      <div className='w-full max-w-[820px] rounded-[18px] border border-slate-200 bg-white px-4 py-6 shadow-[0_18px_48px_rgba(16,24,40,0.08)] sm:px-8 sm:py-8'>
        <div className='flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs leading-5 text-amber-900'>
          <span className='grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-amber-600 text-[10px] font-bold text-white'>!</span>
          <span>Please provide a relevant, original answer. Irrelevant or AI-generated responses may end the session.</span>
        </div>

        <h3 className='my-5 break-words text-[18px] font-bold leading-7 text-slate-900 sm:text-[20px]'>{questions[0]?.questionText}</h3>
        <textarea
          className={ANSWER_TEXTAREA_CLASS}
          value={userAnswer}
          placeholder='Type your answer here...'
          onChange={handleInputChange}
          onPaste={handlePasteChange}
          rows='4'
        />

        <div className='mt-2 flex flex-col gap-1 text-[11px] text-slate-400 sm:flex-row sm:justify-between'>
          <span className={error ? 'text-red-600' : ''}>{error || 'Please keep your answer clear and concise.'}</span>
          <span>{userAnswer.length}/300</span>
        </div>

        <div className='mt-5 flex justify-end'>
          <button
            type='button'
            className={RANDOM_SUBMIT_BUTTON_CLASS}
            onClick={submitAnswer}
          >
            Submit <span className='text-base'>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default RandomQuestionPage;
