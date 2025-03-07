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
  loading,
}) => {
  return (
    <div className="space-y-2 md:space-y-4 px-2 sm:px-0">
      <div className="mb-4 md:mb-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1">
          <h2 className="text-xl md:text-3xl font-semibold text-primary bangers">
            Question {questionIndex + 1} of {quizData.numQuestions}
          </h2>
          <div className="text-xs md:text-sm text-primary">
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

      <div className="mb-4 md:mb-6">
        <label className="block text-base md:text-lg font-medium mb-1 md:mb-2 text-primary">
          <span className="text-highlight">Question</span>{" "}
          <span className="text-accent">*</span>
        </label>
        <input
          type="text"
          value={currentQuestion.question}
          onChange={handleQuestionChange}
          className="w-full p-2 md:p-3 border-2 border-accent/30 rounded-lg focus:border-accent custom-focus bg-white/80 text-primary transition-all duration-300 text-sm md:text-base"
          placeholder="Enter your question"
          required
        />
      </div>

      <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
        <label className="block text-base md:text-lg font-medium text-primary">
          <span className="text-highlight">Options</span>{" "}
          <span className="text-accent">*</span>
          <span className="text-xs md:text-sm font-normal ml-1 md:ml-2 text-ternary italic block sm:inline">
            (Select one correct answer)
          </span>
        </label>

        {currentQuestion.options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2 md:space-x-3">
            <input
              type="radio"
              name="correctOption"
              checked={option.isCorrect}
              onChange={() => handleCorrectOptionChange(index)}
              className="h-4 w-4 md:h-5 md:w-5 text-accent focus:ring-accent"
            />
            <input
              type="text"
              value={option.option}
              onChange={(e) => handleOptionChange(index, e)}
              className={`flex-1 p-2 md:p-3 border-2 rounded-lg custom-focus transition-all duration-300 text-sm md:text-base
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

      <div className="flex justify-between pt-3 md:pt-4 border-t border-accent/20">
        <button
          type="button"
          onClick={goToPreviousQuestion}
          disabled={questionIndex === 0}
          className={`px-3 py-2 md:px-6 md:py-3 rounded-lg transition-all duration-300 text-sm md:text-base ${
            questionIndex === 0
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-primary text-secondary hover:bg-primary/80"
          }`}>
          ← Prev
        </button>

        <button
          type="button"
          onClick={saveCurrentQuestion}
          disabled={loading}
          className="px-4 py-2 md:px-8 md:py-3 bg-accent text-white rounded-lg hover:bg-[#daab59] transition-all duration-300 shadow-md text-sm md:text-base">
          {loading
            ? "Saving..."
            : questionIndex === quizData.numQuestions - 1
            ? "Save & Finish ✓"
            : "Next →"}
        </button>
      </div>
    </div>
  );
};

export default QuestionForm;
