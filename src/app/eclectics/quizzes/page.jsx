"use client";
import React, { useEffect, useState } from "react";
import { getAllQuizzes } from "../../../../actions/quizActions";
import Link from "next/link";

const page = () => {
  const [quizzes, setQuizzes] = useState([]);
  useEffect(() => {
    const fetchQuizzes = async () => {
      const response = await getAllQuizzes();
      if (response.success) {
        setQuizzes(response.quizzes);
      } else {
        console.error("Error fetching quizzes" + response.message);
      }
    };
    fetchQuizzes();
  }, []);
  return (
    <>
      <div>
        <h1>Quizzes</h1>
        {quizzes.length > 0 ? (
          <ul>
            {quizzes.map((quiz) => (
              <li key={quiz._id}>
                <Link href={`/eclectics/quizzes/${quiz._id}`}>
                  <h3>{quiz.title}</h3>
                  <p>{quiz.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No quizzes found</p>
        )}
      </div>
    </>
  );
};

export default page;
