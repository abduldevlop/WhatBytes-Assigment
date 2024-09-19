"use client";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import target from "../assets/target.png";
import Image from "next/image";
const Syllabus = () => {
  const [correctAnswers, setCorrectAnswers] = useState<number>(0); // State to store correct answers
  const totalQuestions = 15; // Total number of questions

  // Fetch data from localStorage when component mounts
  useEffect(() => {
    const storedData = localStorage.getItem("formData");

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      // Ensure the correct data is being fetched, assuming "correctAnswer" exists in the formData
      const correctAnswerFromStorage = parsedData.correctAnswer
        ? parseInt(parsedData.correctAnswer, 10)
        : 0;
      setCorrectAnswers(correctAnswerFromStorage); // Set correct answers from localStorage
    }
  }, []);

  const incorrectAnswers = totalQuestions - correctAnswers;

  // Data for the pie chart
  const data = [
    { category: "Correct Answers", count: correctAnswers },
    { category: "Incorrect Answers", count: incorrectAnswers },
  ];

  const COLORS = ["#3B7DF4", "#E9F1FD"]; // Define the colors for the pie chart

  return (
    <div className="mt-20">
      <div className="border border-[#E7EBEF] px-5 p-4 mr-5 rounded-md ">
        <h1 className="font-bold">Syllabus Wise Analysis</h1>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2 mt-5">
            <p className="text-sm font-bold text-[#656E7A]">
              HTML Tools, Forms, History
            </p>
            <div className="flex items-center gap-2">
              <div className="relative flex-1 h-2 bg-[#E7EBEF] rounded">
                <div
                  className="absolute top-0 left-0 h-full rounded"
                  style={{ width: "80%", backgroundColor: "#3B7DF4" }} // Fill color and width
                />
              </div>
              <span className="text-sm font-bold text-[#3B7DF4]">80%</span>{" "}
              {/* Percentage display */}
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <p className="text-sm font-bold text-[#656E7A]">
              Tags & References in HTML
            </p>
            <div className="flex items-center gap-2">
              <div className="relative flex-1 h-2 bg-[#E7EBEF] rounded">
                <div
                  className="absolute top-0 left-0 h-full rounded"
                  style={{ width: "60%", backgroundColor: "#FE8339" }}
                />
              </div>
              <span className="text-sm font-bold text-[#FE8339]">60%</span>{" "}
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <p className="text-sm font-bold text-[#656E7A]">
              Tables & References in HTML
            </p>
            <div className="flex items-center gap-2">
              <div className="relative flex-1 h-2 bg-[#E7EBEF] rounded">
                <div
                  className="absolute top-0 left-0 h-full rounded"
                  style={{ width: "24%", backgroundColor: "#F95352" }}
                />
              </div>
              <span className="text-sm font-bold text-[#F95352]">24%</span>{" "}
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <p className="text-sm font-bold text-[#656E7A]">
              Tables & CSS Bascis
            </p>
            <div className="flex items-center gap-2">
              <div className="relative flex-1 h-2 bg-[#E7EBEF] rounded">
                <div
                  className="absolute top-0 left-0 h-full rounded"
                  style={{ width: "96%", backgroundColor: "#22BA5E" }}
                />
              </div>
              <span className="text-sm font-bold text-[#22BA5E]">96%</span>{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col  mt-5 border border-[#E7EBEF] px-5 p-4 mr-5 rounded-md ">
        <div className="flex justify-between">
          <h1 className="font-bold">Question Alalysis</h1>
          <p className="font-bold text-blue-600">{correctAnswers} /15</p>
        </div>
        <p className="mt-2 text-sm">
          <b>You scored {correctAnswers} question correct out of 15.</b> However
          it still needs some improvements
        </p>
        <div style={{ position: "relative", width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                labelLine={false}
                dataKey="count"
                innerRadius="50%" // Creates a hole in the center
                outerRadius="70%" // Adjust the outer radius as needed
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <Image
            src={target}
            alt="target"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "50px", // Adjust the size of the image as needed
              height: "50px",
              borderRadius: "50%", // Optional: Make the image circular
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Syllabus;
