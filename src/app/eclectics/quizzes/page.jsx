"use client";
import React, { useEffect, useState } from "react";
import { getAllQuizzes } from "../../../../actions/quizActions";
import Link from "next/link";
import LoadingAnimation from "@/components/loading";

const QuizzesPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await getAllQuizzes();
        if (response.success) {
          setQuizzes(response.quizzes);
        } else {
          console.error("Error fetching quizzes: " + response.message);
        }
      } catch (error) {
        console.error("Failed to fetch quizzes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <div className="container mx-auto    px-4 py-12  fade-up">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="titlefont text-4xl md:text-5xl text-secondary mb-3">
          Explore Our{" "}
          <span className="text-highlight text-accent">Quizzes</span>
        </h1>
        <p className="text-secondary max-w-2xl mx-auto">
          Test your knowledge and challenge yourself with our collection of
          interactive quizzes.
        </p>
      </div>

      {/* Quizzes List */}
      {loading ? (
        // Loading state
        <LoadingAnimation />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* // Quizzes cards */}
          {quizzes.length > 0 ? (
            quizzes.map((quiz) => (
              <Link
                href={`/eclectics/quizzes/${quiz._id}`}
                key={quiz._id}
                className="block hover-lift">
                <div className="bg-secondary rounded-lg shadow-md border border-accent/20 overflow-hidden h-full transition-all">
                  <div className="bg-accent h-2"></div>
                  <div className="p-6">
                    <h3 className="titlefont text-xl text-primary mb-2">
                      {quiz.title}
                    </h3>
                    <p className="text-ternary text-sm mb-4 line-clamp-3">
                      {quiz.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-ternary/70">
                        {quiz.questions?.length || 0} Questions
                      </span>
                      <button className="px-4 py-1 bg-primary text-secondary rounded-full text-sm">
                        Start Quiz
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            // Empty state
            <div className="col-span-full text-center py-16 bg-secondary/30 rounded-lg">
              <p className="text-ternary text-lg mb-4">No quizzes found</p>
              <p className="text-ternary/70">
                Check back later for new challenges!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizzesPage;
