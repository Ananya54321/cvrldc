"use client";
import React from "react";

const QuizDetailsForm = ({
  quizData,
  handleQuizDataChange,
  proceedToQuestions,
  error,
}) => {
  return (
    <form onSubmit={proceedToQuestions} className="space-y-8">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 animate-pulse">
          {error}
        </div>
      )}

      <div className="mb-6">
        <label className="block text-lg font-medium mb-2 text-primary">
          <span className="text-highlight">Quiz Topic/Title</span>{" "}
          <span className="text-accent">*</span>
        </label>
        <input
          type="text"
          name="title"
          value={quizData.title}
          onChange={handleQuizDataChange}
          className="w-full p-3 border-2 border-accent/30 rounded-lg focus:border-accent custom-focus bg-white/80 text-primary transition-all duration-300"
          placeholder="Enter an engaging quiz title"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-lg font-medium mb-2 text-primary">
          <span className="text-highlight">Description</span>{" "}
          <span className="text-accent">*</span>
        </label>
        <textarea
          name="description"
          value={quizData.description}
          onChange={handleQuizDataChange}
          className="w-full p-3 border-2 border-accent/30 rounded-lg focus:border-accent custom-focus bg-white/80 text-primary transition-all duration-300"
          rows="4"
          placeholder="Provide a brief description of your quiz"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-lg font-medium mb-2 text-primary">
            <span className="text-highlight">Number of Questions</span>{" "}
            <span className="text-accent">*</span>
          </label>
          <div className="relative">
            <input
              type="number"
              name="numQuestions"
              value={quizData.numQuestions}
              onChange={handleQuizDataChange}
              min="1"
              max="50"
              className="w-full p-3 pl-12 border-2 border-accent/30 rounded-lg focus:border-accent custom-focus bg-white/80 text-primary transition-all duration-300"
              required
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                />
              </svg>
            </span>
          </div>
          <p className="mt-1 text-sm text-ternary/70 italic">
            Recommended: 5-20 questions
          </p>
        </div>

        <div>
          <label className="block text-lg font-medium mb-2 text-primary">
            <span className="text-highlight">Time Limit (minutes)</span>{" "}
            <span className="text-accent">*</span>
          </label>
          <div className="relative">
            <input
              type="number"
              name="timeLimit"
              value={quizData.timeLimit}
              onChange={handleQuizDataChange}
              min="1"
              className="w-full p-3 pl-12 border-2 border-accent/30 rounded-lg focus:border-accent custom-focus bg-white/80 text-primary transition-all duration-300"
              required
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
          </div>
          <p className="mt-1 text-sm text-ternary/70 italic">
            Recommended: 1-2 minutes per question
          </p>
        </div>
      </div>

      <div className="pt-6 border-t border-accent/20">
        <button
          type="submit"
          className="px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-slate-500 transition-all duration-300 shadow-md w-full md:w-auto">
          <span className="flex items-center justify-center">
            Continue to Add Questions
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </span>
        </button>
      </div>
    </form>
  );
};

export default QuizDetailsForm;
