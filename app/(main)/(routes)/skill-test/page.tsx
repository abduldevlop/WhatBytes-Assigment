import SkillTest from "@/components/SkillTest";
import Syllabus from "@/components/Syllabus";
import React from "react";

const SkillTextPage = () => {
  return (
    <div className="flex flex-col md:flex-row gap-2">
      {/* SkillTest component takes 2/3 of the space on larger screens and full width on smaller screens */}
      <div className="flex-1 md:flex-[3.2]">
        <SkillTest />
      </div>

      {/* Syllabus component takes 1/3 of the space on larger screens and full width on smaller screens */}
      <div className="flex-1 md:flex-[2]">
        <Syllabus />
      </div>
    </div>
  );
};

export default SkillTextPage;
