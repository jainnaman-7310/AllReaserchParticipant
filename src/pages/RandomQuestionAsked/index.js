/* eslint-disable */
import React, { useState, useEffect } from 'react';
import alertIcon from '../../assets/redwarning.png';

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

  // Automatically adjust textarea height
  const handleInputChange = (e) => {
    setUserAnswer(e.target.value);
    setError('');
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };
  const handlePasteChange = (e) => {
    setPasteContent(e.clipboardData.getData("text"));
  }

  // Submit answer with validation
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
    <div className="flex flex-col items-center px-4 md:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-md p-6 w-full max-w-3xl">
        <div className="flex items-center mb-4">
          <img src={alertIcon} alt="alert icon" className="w-6 h-6 mr-2" />
          <h4 className="text-red-600 font-medium text-sm">
            Please provide a relevant, original answer. Irrelevant or AI-generated responses may end the session!
          </h4>
        </div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          {questions[0]?.questionText}
        </h3>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-4"
          value={userAnswer}
          placeholder="Type your answer here..."
          onChange={handleInputChange}
          onPaste={handlePasteChange}
          rows="1"
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="flex justify-end">
          <button
            type="button"
            className="btn btn-primary px-4 py-2 text-white font-semibold rounded-md hover:bg-blue-600"
            onClick={submitAnswer}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default RandomQuestionPage;
