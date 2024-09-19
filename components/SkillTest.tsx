"use client";
import { useEffect, useState, ChangeEvent } from "react";
import html from "@/assets/html.png";
import trophy from "@/assets/trophy.png";
import notepad from "@/assets/notepad.png";
import done from "@/assets/done.png";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Chart from "./Chart";

interface FormData {
  rank: string;
  percentile: string;
  correctAnswer: string;
}

const SkillTest: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    rank: "",
    percentile: "",
    correctAnswer: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = (): { [key: string]: string } => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.rank) {
      newErrors.rank = "Rank is required";
    } else if (isNaN(Number(formData.rank))) {
      newErrors.rank = "Rank must be a number";
    }

    if (!formData.percentile) {
      newErrors.percentile = "Percentile is required";
    } else if (
      Number(formData.percentile) < 0 ||
      Number(formData.percentile) > 100
    ) {
      newErrors.percentile = "Percentile must be between 0 and 100";
    }
    if (!formData.correctAnswer) {
      newErrors.correctAnswer = "Current score is required";
    } else if (isNaN(Number(formData.correctAnswer))) {
      newErrors.correctAnswer = "Current score must be a number";
    } else {
      const score = Number(formData.correctAnswer);
      if (score > 15) {
        newErrors.correctAnswer = "Max score is 15";
      }
    }

    return newErrors;
  };

  const handleSubmit = () => {
    // e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    localStorage.setItem("formData", JSON.stringify(formData));
    setErrors({});
    setIsDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set mounted to true after the component has mounted
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render null or a loading state during server-side rendering
    return null;
  }
  return (
    <div className="pl-10 py-10 mb-10">
      <h2>Skill Test</h2>
      <div className="flex  items-center gap-3 mt-5 border border-[#E7EBEF] px-5 py-10 mr-10 rounded-md">
        <Image src={html} alt="html" className="w-11" />
        <div>
          <h1 className="font-bold">Hyper Text Markup Language</h1>
          <p className="text-[#7b7b7e] text-sm font-semibold">
            Questions: 08 | Duration: 15 mins | Submitted on 5 June 2021
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger>
            <Button
              className="bg-[#132277] hover:bg-[#6777d4] text-white text-sm px-6 py-2 rounded-md border-2 border-black"
              onClick={handleDialogOpen}
            >
              Update
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center text-2xl font-bold">
                Update scores
                <Image src={html} alt="html" className="w-8" />
              </DialogTitle>
              <DialogDescription>
                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                  {/* Rank Input */}
                  <div className="flex items-center justify-between mt-5">
                    <div className="flex items-center gap-2 text-black">
                      <span className="bg-[#0D1A64] px-2 py-[3px] rounded-full text-white">
                        1
                      </span>
                      <h1>
                        Update your <b>Rank</b>
                      </h1>
                    </div>
                    <div className="flex flex-col">
                      <Input
                        type="number"
                        placeholder="Rank"
                        className={`w-40 focus:border-[#8fa5ce] focus:ring-0 text-black font-bold ${
                          errors.rank && "border-red-500 focus:ring-0 "
                        } `}
                        name="rank"
                        value={formData.rank}
                        onChange={handleInputChange}
                      />
                      {errors.rank && (
                        <span className="text-red-500">{errors.rank}</span>
                      )}
                    </div>
                  </div>

                  {/* Percentile Input */}
                  <div className="flex items-center justify-between mt-5">
                    <div className="flex items-center gap-2 text-black">
                      <span className="bg-[#0D1A64] px-2 py-[3px] rounded-full text-white">
                        2
                      </span>
                      <h1>
                        Update your <b>Percentile</b>
                      </h1>
                    </div>
                    <div className="flex flex-col">
                      <Input
                        type="number"
                        placeholder="Percentile"
                        className={`w-40 focus:border-[#8fa5ce] focus:ring-0 text-black font-bold ${
                          errors.percentile && "border-red-500 focus:ring-0 "
                        } `}
                        name="percentile"
                        value={formData.percentile}
                        onChange={handleInputChange}
                      />
                      {errors.percentile && (
                        <span className="text-red-500">
                          {errors.percentile}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Current Score Input */}
                  <div className="flex items-center justify-between mt-5">
                    <div className="flex items-center gap-2 text-black">
                      <span className="bg-[#0D1A64] px-2 py-[3px] rounded-full text-white">
                        3
                      </span>
                      <h1>
                        Update your <b>Current Score (out of 15)</b>
                      </h1>
                    </div>
                    <div className="flex flex-col">
                      <Input
                        type="number"
                        placeholder="Current Score"
                        className={`w-40 focus:border-[#8fa5ce] focus:ring-0 text-black font-bold ${
                          errors.correctAnswer && "border-red-500 focus:ring-0 "
                        } `}
                        name="correctAnswer"
                        value={formData.correctAnswer}
                        onChange={handleInputChange}
                      />
                      {errors.correctAnswer && (
                        <span className="text-red-500">
                          {errors.correctAnswer}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-5 mt-3 text-sm">
                    <Button
                      variant={"outline"}
                      className="border text-[#0D1A64]"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-[#0D1A64] hover:bg-blue-800 text-white"
                    >
                      Update
                    </Button>
                  </div>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Statistics Section */}
      <div className="mt-5 border border-[#E7EBEF] px-5 py-5 mr-10 rounded-md">
        <h2 className="font-bold">Quick Statistics</h2>
        <div className="mt-3 flex items-center gap-3 justify-between">
          {/* Rank */}
          <div className="flex items-center gap-2">
            <div className="bg-[#F3F6F7] p-2 rounded-full w-fit">
              <Image src={trophy} alt="trophy" className="w-5" />
            </div>
            <div>
              <h1 className="font-bold">{formData.rank || "1"}</h1>
              <p className="text-sm text-[#9B9B9B]">Rank</p>
            </div>
          </div>

          {/* Percentile */}
          <div className="flex items-center gap-2">
            <div className="bg-[#F3F6F7] p-2 rounded-full w-fit">
              <Image src={notepad} alt="notepad" className="w-5" />
            </div>
            <div>
              <h1 className="font-bold uppercase">
                {formData.percentile || "0"}%
              </h1>
              <p className="text-sm text-[#9B9B9B]">Percentile</p>
            </div>
          </div>

          {/* Current Score */}
          <div className="flex items-center gap-2">
            <div className="bg-[#F3F6F7] p-4 rounded-full w-fit">
              <Image src={done} alt="done" className="w-5" />
            </div>
            <div>
              <h1 className="font-bold uppercase">
                {formData.correctAnswer || "0"} / 15
              </h1>
              <p className="text-sm text-[#9B9B9B]">Current Score</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}

      <Chart />
    </div>
  );
};

export default SkillTest;
