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

  const handleChange = (e) => {
    setAiAnswer(e.target.value);
  };
  const handleMouseOver = () => {
    setHovered(true);
  };
  const handleMouseOut = () => {
    setHovered(false);
  };

  const total = aiQuestion.length;
  const current = currentIndex + 1;
  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className='survey-special-screen'>
      <div className='survey-special-card'>
        <div className='survey-progress-header'>
          <div className='survey-progress-track'>
            <span className='survey-progress-fill' style={{ width: `${progress}%` }} />
          </div>
          <span className='survey-progress-count'>{current} / {total}</span>
        </div>
        <h3>{`${aiQuestion[currentIndex].question}`}</h3>
        <input
          type='text'
          className={`survey-ai-input ${hovered ? 'is-focused' : ''}`}
          onPaste={() => setPastedContent(1)}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onFocus={handleMouseOver}
          onBlur={handleMouseOut}
          value={aiAnswer}
          onChange={handleChange}
        />
        <div className='survey-special-actions'>
          <button type='submit' onClick={handleSubmit} className='btn btn-primary'>
            {t('home.question.submit')} <span className='survey-button-arrow'>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AiQuestion;
