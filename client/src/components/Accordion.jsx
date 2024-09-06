import React, { useState } from "react";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";

const AccordionItem = ({ week, topic, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-300 rounded-lg shadow-md mb-2 overflow-hidden">
      <button
        className="w-full px-4 py-2 text-left font-bold focus:outline-none flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          Week {week}: {topic}
        </span>
        {isOpen ? (
          <MdOutlineExpandLess
            size={20}
            className="transition-transform duration-300"
          />
        ) : (
          <MdOutlineExpandMore
            size={20}
            className="transition-transform duration-300"
          />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 bg-gray-100 text-black">
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

const Accordion = ({ syllabus }) => {
  if (!syllabus) return null;

  return (
    <div className="max-w-3xl md:pl-12 px-4 md:px-0">
      {syllabus.map(({ week, topic, content, _id }) => (
        <AccordionItem key={_id} week={week} topic={topic} content={content} />
      ))}
    </div>
  );
};

export default Accordion;
