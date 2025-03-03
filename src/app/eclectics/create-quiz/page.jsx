"use client";
import React, { useState } from "react";
import { addQuiz } from "@/../actions/quizActions";
import { useRouter } from "next/navigation";
import QuizDetailsForm from "@/components/pages/eclectics/QuizDetailsForm";
import QuestionForm from "@/components/pages/eclectics/QuestionForm";

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
    <div className=" bg-primary min-h-screen p-6 fade-up">
      <h1 className="text-5xl mb-8 titlefont text-accent text-center">
        Create New Quiz
      </h1>

      <div className="bg-secondary max-w-4xl mx-auto h-full rounded-lg p-8 shadow-lg ">
        {step === 1 ? (
          <QuizDetailsForm
            quizData={quizData}
            handleQuizDataChange={handleQuizDataChange}
            proceedToQuestions={proceedToQuestions}
            error={error}
          />
        ) : (
          <QuestionForm
            currentQuestion={currentQuestion}
            handleQuestionChange={handleQuestionChange}
            handleOptionChange={handleOptionChange}
            handleCorrectOptionChange={handleCorrectOptionChange}
            questionIndex={questionIndex}
            quizData={quizData}
            goToPreviousQuestion={goToPreviousQuestion}
            saveCurrentQuestion={saveCurrentQuestion}
            error={error}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default CreateQuizPage;
