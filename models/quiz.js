import mongoose, { Schema } from "mongoose";

const QuizSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      options: [
        {
          option: {
            type: String,
            required: true,
          },
          isCorrect: {
            type: Boolean,
            required: true,
          },
        },
      ],
    },
  ],
  timeLimit: {
    type: Number,
    required: true,
  },
});

const Quiz = mongoose.models?.Quiz || mongoose.model("Quiz", QuizSchema);

export default Quiz;
