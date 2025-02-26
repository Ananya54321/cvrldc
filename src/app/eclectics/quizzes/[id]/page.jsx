"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getQuizById } from "@/../actions/quizActions";

const QuizPage = ({ params }) => {
  const router = useRouter();
  const { id } = params; // Get quiz ID from URL params

  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      const response = await getQuizById(id);
      if (response.success) {
        setQuiz(response.quiz);
      } else {
        console.error("Error fetching quiz:", response.message);
      }
    };

    fetchQuiz();
  }, [id]);

  if (!quiz) {
    return <div>Loading...</div>;
  }

  const handleAnswer = () => {
    if (selectedOption === null) return;

    const isAnswerCorrect =
      quiz.questions[currentQuestionIndex].options[selectedOption].isCorrect;

    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setIsCorrect(null);
    setSelectedOption(null);

    if (currentQuestionIndex + 1 < quiz.questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold">{quiz.title}</h2>
      <p className="mb-4 text-gray-600">{quiz.description}</p>

      {!showResult ? (
        <>
          <h3 className="text-lg font-semibold">
            {quiz.questions[currentQuestionIndex].question}
          </h3>
          <div className="mt-4">
            {quiz.questions[currentQuestionIndex].options.map(
              (option, index) => (
                <button
                  key={index}
                  className={`block w-full p-2 border rounded-md mb-2 ${
                    selectedOption === index
                      ? isCorrect === true
                        ? "bg-green-400 text-white"
                        : isCorrect === false
                        ? "bg-red-400 text-white"
                        : "bg-gray-200"
                      : "bg-gray-100"
                  }`}
                  onClick={() => setSelectedOption(index)}>
                  {option.option}
                </button>
              )
            )}
          </div>

          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={handleAnswer}
            disabled={selectedOption === null}>
            Submit Answer
          </button>

          {isCorrect !== null && (
            <p
              className={`mt-2 font-semibold ${
                isCorrect ? "text-green-500" : "text-red-500"
              }`}>
              {isCorrect ? "Correct!" : "Wrong Answer!"}
            </p>
          )}

          {isCorrect !== null && (
            <button
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg"
              onClick={handleNextQuestion}>
              Next Question
            </button>
          )}
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold">Quiz Completed!</h2>
          <p className="text-lg">
            Your Score: {score} / {quiz.questions.length}
          </p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={() => router.push("/eclectics/quizzes")}>
            Go Back to Quizzes
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
