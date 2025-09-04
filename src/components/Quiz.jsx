import React, { useState } from "react";
import Results from "./Results";

export default function Quiz() {
  const questionBank = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      answer: "Paris",
    },
    {
      question: "Which is Language is used for web apps?",
      options: ["PHP", "Python", "Javascript", "ALL"],
      answer: "ALL",
    },

    {
      question: "What does JSX stands for?",
      options: [
        "JavaScript XHL",
        "Java Syntax eXtension",
        "Jusr a Simple eXample",
        "None of the above",
      ],
      answer: "JavaScript XHL",
    },
  ];

  const initialAnswers = ["null", "null", "null"];

  const [userAnswers, setUserAnswers] = useState(initialAnswers);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const selectedAnswer = userAnswers[currentQuestion]; // null

  function handleSelectOption(option) {
    // Handle option click logic here
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = option;

    setUserAnswers(newUserAnswers);
  }

  function goToNext() {
    if (currentQuestion === questionBank.length - 1) {
      setIsQuizFinished(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  function goToPrevious() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }

   function restartQuiz(){
       setUserAnswers(initialAnswers)
       setCurrentQuestion(0); 
       setIsQuizFinished(false);
    }

  if (isQuizFinished) {
    return <Results userAnswers={userAnswers}  questionBank={questionBank} 
    restartQuiz={restartQuiz}/>;
  }

  return (
    <div>
      <h2>Question {currentQuestion + 1}</h2>
      <p className="question">{questionBank[currentQuestion].question}</p>
      {questionBank[currentQuestion].options.map((option) => (
        <button
          key={option}
          className={"option" + (selectedAnswer === option ? " selected" : "")}
          onClick={() => handleSelectOption(option)}
        >
          {option}
        </button>
      ))}

      <div className="nav-buttons">
        <button onClick={goToPrevious} disabled={currentQuestion === 0}>
          Previous
        </button>
        <button onClick={goToNext} disabled={!selectedAnswer}>
          {currentQuestion === questionBank.length - 1 ? "Finish Quiz" : "Next"}
        </button>
      </div>
    </div>
  );
}
