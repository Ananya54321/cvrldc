"use client";
import React, { useState } from "react";
import { addQuiz } from "@/../actions/quizActions";
import { useRouter } from "next/navigation";

const CreateQuizPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    numQuestions: 10,
    timeLimit: 30,
    questions: [],
    isCompleted: false,
  });
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    options: [
      { option: "", isCorrect: false },
      { option: "", isCorrect: false },
      { option: "", isCorrect: false },
      { option: "", isCorrect: false },
    ],
  });
  const [questionIndex, setQuestionIndex] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes for quiz details
  const handleQuizDataChange = (e) => {
    const { name, value } = e.target;
    setQuizData({
      ...quizData,
      [name]:
        name === "numQuestions" || name === "timeLimit" ? Number(value) : value,
    });
  };

  // Handle question text change
  const handleQuestionChange = (e) => {
    setCurrentQuestion({
      ...currentQuestion,
      question: e.target.value,
    });
  };

  // Handle option text change
  const handleOptionChange = (index, e) => {
    const updatedOptions = [...currentQuestion.options];
    updatedOptions[index].option = e.target.value;
    setCurrentQuestion({
      ...currentQuestion,
      options: updatedOptions,
    });
  };

  // Handle correct option selection
  const handleCorrectOptionChange = (index) => {
    const updatedOptions = currentQuestion.options.map((option, i) => ({
      ...option,
      isCorrect: i === index,
    }));
    setCurrentQuestion({
      ...currentQuestion,
      options: updatedOptions,
    });
  };

  // Proceed to question input after initial details
  const proceedToQuestions = (e) => {
    e.preventDefault();

    if (!quizData.title || !quizData.description) {
      setError("Please fill all required fields");
      return;
    }

    if (quizData.numQuestions < 1) {
      setError("Number of questions must be at least 1");
      return;
    }

    setError("");
    setStep(2);

    // Initialize questions array with the specified number of empty questions
    setQuizData({
      ...quizData,
      questions: Array(quizData.numQuestions)
        .fill()
        .map(() => ({
          question: "",
          options: [
            { option: "", isCorrect: false },
            { option: "", isCorrect: false },
            { option: "", isCorrect: false },
            { option: "", isCorrect: false },
          ],
        })),
    });
  };

  // Save current question and move to next
  const saveCurrentQuestion = () => {
    // Validate current question
    if (!currentQuestion.question) {
      setError("Question text is required");
      return;
    }

    if (currentQuestion.options.some((opt) => !opt.option)) {
      setError("All options must be filled");
      return;
    }

    if (!currentQuestion.options.some((opt) => opt.isCorrect)) {
      setError("Please select a correct answer");
      return;
    }

    setError("");

    // Update questions array
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[questionIndex] = currentQuestion;
    setQuizData({
      ...quizData,
      questions: updatedQuestions,
    });

    // Move to next question or finish
    if (questionIndex < quizData.numQuestions - 1) {
      setQuestionIndex(questionIndex + 1);

      // If the next question has already been filled, load it
      if (updatedQuestions[questionIndex + 1].question) {
        setCurrentQuestion(updatedQuestions[questionIndex + 1]);
      } else {
        // Otherwise reset to empty question
        setCurrentQuestion({
          question: "",
          options: [
            { option: "", isCorrect: false },
            { option: "", isCorrect: false },
            { option: "", isCorrect: false },
            { option: "", isCorrect: false },
          ],
        });
      }
    } else {
      // All questions completed
      submitQuiz(updatedQuestions);
    }
  };

  // Handle previous question button
  const goToPreviousQuestion = () => {
    if (questionIndex > 0) {
      // Save current question first
      const updatedQuestions = [...quizData.questions];
      updatedQuestions[questionIndex] = currentQuestion;

      setQuizData({
        ...quizData,
        questions: updatedQuestions,
      });

      // Go to previous question
      setQuestionIndex(questionIndex - 1);
      setCurrentQuestion(updatedQuestions[questionIndex - 1]);
      setError("");
    }
  };

  // Submit final quiz
  const submitQuiz = async (finalQuestions) => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const quizToSubmit = {
        title: quizData.title,
        description: quizData.description,
        questions: finalQuestions,
        timeLimit: quizData.timeLimit,
        isCompleted: true,
      };

      const response = await addQuiz(quizToSubmit, token);

      if (response.success) {
        router.push("/eclectics/quizzes");
      } else {
        setError(response.message || "Failed to create quiz");
        setStep(1);
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create New Quiz</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {step === 1 ? (
        // Step 1: Quiz Details Form
        <form onSubmit={proceedToQuestions} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Quiz Topic/Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={quizData.title}
              onChange={handleQuizDataChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={quizData.description}
              onChange={handleQuizDataChange}
              className="w-full p-2 border rounded"
              rows="3"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Number of Questions <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="numQuestions"
                value={quizData.numQuestions}
                onChange={handleQuizDataChange}
                min="1"
                max="50"
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Time Limit (minutes) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="timeLimit"
                value={quizData.timeLimit}
                onChange={handleQuizDataChange}
                min="1"
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Continue to Add Questions
            </button>
          </div>
        </form>
      ) : (
        // Step 2: Question Input Form
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              Question {questionIndex + 1} of {quizData.numQuestions}
            </h2>
            <div className="text-sm text-gray-500">
              {Math.round((questionIndex / quizData.numQuestions) * 100)}%
              complete
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{
                width: `${(questionIndex / quizData.numQuestions) * 100}%`,
              }}></div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Question <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={currentQuestion.question}
              onChange={handleQuestionChange}
              className="w-full p-2 border rounded"
              placeholder="Enter your question"
              required
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium">
              Options <span className="text-red-500">*</span>
              <span className="text-sm font-normal ml-2">
                (Select one correct answer)
              </span>
            </label>

            {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="correctOption"
                  checked={option.isCorrect}
                  onChange={() => handleCorrectOptionChange(index)}
                  className="h-4 w-4"
                />
                <input
                  type="text"
                  value={option.option}
                  onChange={(e) => handleOptionChange(index, e)}
                  className="flex-1 p-2 border rounded"
                  placeholder={`Option ${index + 1}`}
                  required
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={goToPreviousQuestion}
              disabled={questionIndex === 0}
              className={`px-4 py-2 border rounded ${
                questionIndex === 0
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white text-blue-600 hover:bg-gray-50"
              }`}>
              Previous
            </button>

            <button
              type="button"
              onClick={saveCurrentQuestion}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              {loading
                ? "Saving..."
                : questionIndex === quizData.numQuestions - 1
                ? "Save & Finish"
                : "Save & Next"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateQuizPage;
