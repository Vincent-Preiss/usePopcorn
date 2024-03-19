import { useState } from "react";
import "./textExpander.css";
export default function TextExpander({
  children,
  baseOpen = false,
  cutOff = 60,
  showMoreText = "Show More",
  showLessText = "Show Less",
  showMoreClass,
}) {
  const [isOpen, setIsOpen] = useState(baseOpen);
  function getShortText(longtext, cutOff) {
    return longtext.slice(0, cutOff) + "...";
  }
  return (
    <>
      <div className="TextExpander__flexContainer">
        <span>{isOpen ? children : getShortText(children, cutOff)}</span>
        <span
          className={`${showMoreClass} TextExpander__show-more-button`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? showLessText : showMoreText}
        </span>
      </div>
    </>
  );
}
