import React, { useState, useEffect } from 'react';
import { questions } from './Questions';
import "./Quiz.css"


const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [wrongQuestions, setWrongQuestions] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    setCurrentOptions(shuffleArray([...questions[currentQuestionIndex].options]));
  }, [currentQuestionIndex]);

  const handleAnswerClick = (option) => {
    if (showAnswer) return;

    setSelectedOption(option);
    setShowAnswer(true);

    setTimeout(() => {
      if (option === questions[currentQuestionIndex].answer) {
        setScore(score + 1);
      } else {
        setWrongQuestions([
          ...wrongQuestions,
          {
            ...questions[currentQuestionIndex],
            selected: option,
          },
        ]);
      }

      setShowAnswer(false);
      setSelectedOption(null);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setIsGameOver(true);
      }
    }, 2000);
  };

  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setWrongQuestions([]);
    setIsGameOver(false);
    shuffleArray(questions);
  };

  if (isGameOver) {
    return (
      <div className='gameOver'>
        <h2>Game Over</h2>
        <p className='score'>Your score: {score}</p>
        <h3>Wrong Answers</h3>
        <ul>
          {wrongQuestions.map((q, index) => (
            <li key={index}>
              {q.question}
              <br />
              <p className='rightAns'>Correct Answer: {q.answer}</p>
              <br />
              <p className='wrongAns'>Your Answer: {q.selected}</p>
            </li>
          ))}
        </ul>
        <button onClick={resetGame}>Reset Game</button>
      </div>
    );
  }

  return (
    <div className='quiz'>
      <h2>Quiz App</h2>
      <p>Score: {score}</p>
      <div className='questions'>
      <p>Question {currentQuestionIndex + 1} out of {questions.length}</p>
        <p className='question'>{questions[currentQuestionIndex].question}</p>
        <div className='options'>
          {currentOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(option)}
              disabled={showAnswer}
              style={{
                backgroundColor:
                  showAnswer && option === questions[currentQuestionIndex].answer
                    ? 'green'
                    : showAnswer && option === selectedOption
                    ? 'red'
                    : '',
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
