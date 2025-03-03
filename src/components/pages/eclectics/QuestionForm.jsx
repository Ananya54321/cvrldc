"use client";
import React from "react";

const QuestionForm = ({
  currentQuestion,
  handleQuestionChange,
  handleOptionChange,
  handleCorrectOptionChange,
  questionIndex,
  quizData,
  goToPreviousQuestion,
  saveCurrentQuestion,
  error,
  loading,
}) => {
  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 animate-pulse">
          {error}
        </div>
      )}

      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-3xl font-semibold text-primary bangers">
            Question {questionIndex + 1} of {quizData.numQuestions}
          </h2>
          <div className="text-sm text-primary">
            {Math.round((questionIndex / quizData.numQuestions) * 100)}%
            complete
          </div>
        </div>

        <div className="w-full bg-[#ecdebc]/30 rounded-full h-2.5">
          <div
            className="bg-accent h-2.5 rounded-full transition-all duration-500"
            style={{
              width: `${Math.max(
                5,
                (questionIndex / quizData.numQuestions) * 100
              )}%`,
            }}></div>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-lg font-medium mb-2 text-primary">
          <span className="text-highlight">Question</span>{" "}
          <span className="text-accent">*</span>
        </label>
        <input
          type="text"
          value={currentQuestion.question}
          onChange={handleQuestionChange}
          className="w-full p-3 border-2 border-accent/30 rounded-lg focus:border-accent custom-focus bg-white/80 text-primary transition-all duration-300"
          placeholder="Enter your question"
          required
        />
      </div>

      <div className="space-y-4 mb-8">
        <label className="block text-lg font-medium text-primary">
          <span className="text-highlight">Options</span>{" "}
          <span className="text-accent">*</span>
          <span className="text-sm font-normal ml-2 text-ternary italic">
            (Select one correct answer)
          </span>
        </label>

        {currentQuestion.options.map((option, index) => (
          <div key={index} className="flex items-center space-x-3 ">
            <input
              type="radio"
              name="correctOption"
              checked={option.isCorrect}
              onChange={() => handleCorrectOptionChange(index)}
              className="h-5 w-5 text-accent focus:ring-accent"
            />
            <input
              type="text"
              value={option.option}
              onChange={(e) => handleOptionChange(index, e)}
              className={`flex-1 p-3 border-2 rounded-lg custom-focus transition-all duration-300
                ${
                  option.isCorrect
                    ? "border-accent bg-accent/10"
                    : "border-ternary/20 bg-white/80"
                }`}
              placeholder={`Option ${String.fromCharCode(65 + index)}`}
              required
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-4 border-t border-accent/20">
        <button
          type="button"
          onClick={goToPreviousQuestion}
          disabled={questionIndex === 0}
          className={`px-6 py-3 rounded-lg transition-all duration-300 ${
            questionIndex === 0
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-primary text-secondary hover:bg-primary/80"
          }`}>
          ← Previous
        </button>

        <button
          type="button"
          onClick={saveCurrentQuestion}
          disabled={loading}
          className="px-8 py-3 bg-accent text-white rounded-lg hover:bg-[#daab59] transition-all duration-300 shadow-md">
          {loading
            ? "Saving..."
            : questionIndex === quizData.numQuestions - 1
            ? "Save & Finish ✓"
            : "Save & Next →"}
        </button>
      </div>
    </div>
  );
};

export default QuestionForm;
