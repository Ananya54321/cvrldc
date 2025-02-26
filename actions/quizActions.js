"use server";
import Quiz from "../models/quiz";
import jwt from "jsonwebtoken";
import connectDB from "../utils/db";
import User from "../models/user";

export async function addQuiz(quizData, token) {
  try {
    await connectDB();

    if (!token) {
      return { success: false, message: "Please login to create a quiz" };
    }

    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
    const createdBy = decoded.id;

    const quiz = new Quiz({
      ...quizData,
      createdBy,
    });

    await quiz.save();
    return { success: true, message: "Quiz created successfully" };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

export async function getAllQuizzes() {
  try {
    await connectDB();
    const quizzes = await Quiz.find().sort({ createdAt: 1 });
    return { success: true, quizzes: JSON.parse(JSON.stringify(quizzes)) };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

export async function getQuizById(id) {
  try {
    await connectDB();
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return { success: false, message: "Quiz not found" };
    }
    return { success: true, quiz: JSON.parse(JSON.stringify(quiz)) };
  } catch (err) {
    return { success: false, message: err.message };
  }
}
