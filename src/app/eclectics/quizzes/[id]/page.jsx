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
  const [loading, setLoading] = useState(true);
  const [questionAnimation, setQuestionAnimation] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await getQuizById(id);
        if (response.success) {
          setQuiz(response.quiz);
        } else {
          console.error("Error fetching quiz:", response.message);
        }
      } catch (error) {
        console.error("Failed to fetch quiz:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  // Animation effect when moving between questions
  useEffect(() => {
    setQuestionAnimation(true);
    const timer = setTimeout(() => setQuestionAnimation(false), 500);
    return () => clearTimeout(timer);
  }, [currentQuestionIndex]);

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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl fade-up">
        <div className="bg-secondary/30 rounded-lg p-8 animate-pulse">
          <div className="h-7 bg-accent/20 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-accent/20 rounded w-full mb-8"></div>
          <div className="h-6 bg-accent/20 rounded w-5/6 mb-4"></div>
          <div className="space-y-4 my-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 bg-accent/10 rounded-md"></div>
            ))}
          </div>
          <div className="h-10 bg-accent/20 rounded w-1/3 mt-6"></div>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
        <h2 className="text-primary text-xl mb-4">Quiz not found</h2>
        <button
          className="px-6 py-2 bg-accent text-secondary rounded-lg hover:bg-accent/90 transition-colors"
          onClick={() => router.push("/eclectics/quizzes")}>
          Return to Quizzes
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl fade-up">
      {/* Quiz Card */}
      <div className="bg-secondary rounded-lg shadow-lg overflow-hidden border border-accent">
        {/* Progress bar */}
        <div className="w-full bg-accent h-2">
          <div
            className="h-full bg-accent transition-all duration-500 ease-in-out"
            style={{
              width: !showResult
                ? `${(currentQuestionIndex / quiz.questions.length) * 100}%`
                : "100%",
            }}></div>
        </div>

        <div className="p-4 md:p-8">
          {/* Header */}
          <div className="mb-4 md:mb-8">
            <h2 className="titlefont text-2xl md:text-3xl text-primary mb-2">
              {quiz.title}
            </h2>
            {/* <p className="text-ternary/80">{quiz.description}</p> */}

            {!showResult && (
              <div className="flex justify-between items-center mt-2 text-sm text-ternary/70">
                <span>
                  Question {currentQuestionIndex + 1} of {quiz.questions.length}
                </span>
                <span>Score: {score}</span>
              </div>
            )}
          </div>

          {/* Quiz Content */}
          {!showResult ? (
            <div
              className={`${
                questionAnimation
                  ? "opacity-0 translate-y-4"
                  : "opacity-100 translate-y-0"
              } transition-all duration-500`}>
              {/* Question */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-primary">
                  {quiz.questions[currentQuestionIndex].question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-2 md:space-y-3 mb-3 md:mb-8">
                {quiz.questions[currentQuestionIndex].options.map(
                  (option, index) => (
                    <button
                      key={index}
                      className={`w-full text-left p-2 md:p-4 rounded-lg border transition-all custom-focus
                      ${
                        selectedOption === index
                          ? isCorrect === true
                            ? "bg-[#d4edda] border-[#c3e6cb] text-[#155724]"
                            : isCorrect === false
                            ? index === selectedOption
                              ? "bg-[#f8d7da] border-[#f5c6cb] text-[#721c24]"
                              : "bg-white border-accent/20"
                            : "bg-primary/5 border-accent/20"
                          : "bg-white hover:bg-accent border-accent/10"
                      }
                      ${
                        isCorrect !== null ? "cursor-default" : "cursor-pointer"
                      }`}
                      onClick={() =>
                        isCorrect === null && setSelectedOption(index)
                      }
                      disabled={isCorrect !== null}>
                      <div className="flex items-center">
                        <span
                          className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 flex-shrink-0
                        ${
                          selectedOption === index
                            ? isCorrect === true
                              ? "bg-[#28a745] text-white"
                              : isCorrect === false
                              ? index === selectedOption
                                ? "bg-[#dc3545] text-white"
                                : "bg-accent/20 text-primary"
                              : "bg-accent text-white"
                            : "bg-accent/20 text-primary"
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span>{option.option}</span>
                      </div>
                    </button>
                  )
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <button
                  className={`px-5 py-3 rounded-lg font-medium transition-all
                    ${
                      isCorrect !== null
                        ? "bg-primary/10 text-primary/60 cursor-not-allowed"
                        : "bg-primary text-secondary hover:bg-primary/90"
                    }`}
                  onClick={handleAnswer}
                  disabled={selectedOption === null || isCorrect !== null}>
                  Submit Answer
                </button>

                {isCorrect !== null && (
                  <button
                    className="px-5 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors"
                    onClick={handleNextQuestion}>
                    {currentQuestionIndex + 1 < quiz.questions.length
                      ? "Next Question"
                      : "See Results"}
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Quiz Results */
            <div className="text-center ">
              <div className="inline-block p-4 rounded-full bg-accent/20 md:mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 md:w-12 md:h-12 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <h2 className="titlefont text-2xl md:text-3xl text-primary mb-2">
                Quiz Completed!
              </h2>

              <div className="md:my-8">
                <div className="titlefont text-2xl md:text-3xl font-bold text-accent mb-2">
                  {score} / {quiz.questions.length}
                </div>
                <p className="text-ternary">
                  {score === quiz.questions.length
                    ? "Perfect score! You're amazing!"
                    : score >= quiz.questions.length * 0.7
                    ? "Great job! You did well!"
                    : "Good effort! Keep learning!"}
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <button
                  className="px-6 py-3 bg-primary text-secondary rounded-lg hover:scale-105 transition-transform"
                  onClick={() => {
                    setCurrentQuestionIndex(0);
                    setSelectedOption(null);
                    setIsCorrect(null);
                    setScore(0);
                    setShowResult(false);
                  }}>
                  Try Again
                </button>
                <button
                  className="px-6 py-3 bg-accent text-white rounded-lg hover:scale-105 transition-transform"
                  onClick={() => router.push("/eclectics/quizzes")}>
                  Back to Quizzes
                </button>
              </div>

              {/* Score analysis */}
              <div className="mt-4 md:mt-8 p-4 bg-secondary rounded-lg">
                <h3 className="text-primary font-medium mb-2">
                  Performance Summary
                </h3>
                <div className="w-full bg-secondary/70 rounded-full h-4 mb-2">
                  <div
                    className="bg-accent h-4 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${(score / quiz.questions.length) * 100}%`,
                    }}></div>
                </div>
                <div className="text-sm text-ternary">
                  You scored {Math.round((score / quiz.questions.length) * 100)}
                  %
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
