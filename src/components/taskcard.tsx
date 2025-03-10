"use client";
import React, { useState, useEffect } from "react";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import ConfettiExplosion from "react-confetti-explosion";

type Props = {};

const workoutRoutine = [
  { id: 1, name: "Benchpress", weight: 40, rep: 10, isComplete: true },
  { id: 2, name: "Dumbbell Press", weight: 25, rep: 10, isComplete: false },
  { id: 3, name: "Deadlift", weight: 100, rep: 8, isComplete: false },
];

export default function TaskCard({}: Props) {
  const [workouts, setWorkouts] = useState(workoutRoutine);
  const [showConfetti, setShowConfetti] = useState<number | null>(null);

  // Reset confetti after animation
  useEffect(() => {
    if (showConfetti !== null) {
      const timer = setTimeout(() => {
        setShowConfetti(null);
      }, 2000); // Match this with the confetti duration
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const toggleComplete = (id: number) => {
    setWorkouts((prev) => {
      const newWorkouts = prev.map((w) =>
        w.id === id ? { ...w, isComplete: !w.isComplete } : w
      );

      // If the workout is being marked as complete, show confetti
      const workout = newWorkouts.find((w) => w.id === id);
      if (workout && workout.isComplete) {
        setShowConfetti(id);
      }

      return newWorkouts;
    });
  };

  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      className="p-5 space-y-3 bg-glass/40 rounded-3xl"
    >
      <div className="flex justify-between items-center mb-7">
        <div className="flex gap-2 items-center">
          <span className="p-2 bg-glass/40 rounded-full">
            <ArrowLeft size={20} />
          </span>
          <p className="text-lg font-extrabold text-gray-200">Your Routine</p>
        </div>
        <span className="p-2 bg-glass/40 rounded-full">
          <FiPlus size={20} />
        </span>
      </div>
      {workouts.map((workout) => (
        <div
          key={workout.id}
          onClick={() => toggleComplete(workout.id)}
          className="bg-glass/40 backdrop-blur-lg shadow-xl p-5 cursor-pointer rounded-lg text-gray-300 w-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-6 text-center">{workout.id}</span>
              <span className="w-32">{workout.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="">{workout.weight} kg</span>
              <span className=" text-center">{workout.rep} reps</span>
              {workout.isComplete ? (
                <MdCheckBox size={20} className="text-green-400" />
              ) : (
                <MdCheckBoxOutlineBlank size={20} />
              )}
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
