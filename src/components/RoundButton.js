import React from "react";

const RoundButton = ({ option, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-block",
        padding: "0.5rem 1rem",
        margin: "0.5rem",
        borderRadius: "50px",
        border: isSelected ? "2px solid #02353C" : "2px solid #ccc",
        backgroundColor: isSelected ? "#02353C" : "#fff",
        color: isSelected ? "#fff" : "#02353C",
        cursor: "pointer",
        transition: "all 0.3s ease",
        fontSize: "1rem",
        fontWeight: "bold",
      }}
    >
      {option}
    </button>
  );
};

export default RoundButton;
