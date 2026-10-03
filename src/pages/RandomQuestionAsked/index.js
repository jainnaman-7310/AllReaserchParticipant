/* eslint-disable */
import React, { useState, useEffect } from 'react';

function RandomQuestionPage({ questionData, studyId, vendorId, submitRandomQuestion }) {
  const [questions, setQuestions] = useState([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [pasteContent, setPasteContent] = useState('')
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
    setPasteContent(e.clipboardData.getData("text"));
  }

  const submitAnswer = async () => {
    if (userAnswer.length < 7 || userAnswer.length > 300) {
      setError('Answer must be between 7 and 300 characters.');
      return;
    }
    let pastedResposne = false;
    if(userAnswer == pasteContent){
      pastedResposne = true;
    }
    setError('');
    submitRandomQuestion({userAnswer, questionsId : questions[0]?.questionId, studyId, vendorId, question: questions[0]?.questionText, pastedContent : pastedResposne})
  };

  return (
    <div className='survey-special-screen'>
      <div className='survey-special-card'>
        <div className='survey-special-note'>
          <span className='survey-special-note-icon'>!</span>
          <span>Please provide a relevant, original answer. Irrelevant or AI-generated responses may end the session.</span>
        </div>
        <h3>{questions[0]?.questionText}</h3>
        <textarea
          className='survey-long-answer'
          value={userAnswer}
          placeholder='Type your answer here...'
          onChange={handleInputChange}
          onPaste={handlePasteChange}
          rows='4'
        />
        <div className='survey-answer-meta'>
          <span>{error || 'Please keep your answer clear and concise.'}</span>
          <span>{userAnswer.length}/300</span>
        </div>
        <div className='survey-special-actions'>
          <button type='button' className='btn btn-primary' onClick={submitAnswer}>
            Submit <span className='survey-button-arrow'>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default RandomQuestionPage;
