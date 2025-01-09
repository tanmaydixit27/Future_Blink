import React from "react";
import { useFlowChart } from "../context/FLowChartContext";
import { saveFlowchartData } from "../services/api";

const SaveButton = () => {
  const { flowData } = useFlowChart();

  const handleSave = async () => {
    try {
      const response = await saveFlowchartData(flowData);
      if (response.status === 200) {
        alert("Flowchart saved successfully!");
      } else {
        alert("Failed to save flowchart. Please try again.");
      }
    } catch (error) {
      console.error("Error saving flowchart:", error);
      alert("An error occurred while saving the flowchart.");
    }
  };

  return (
    <button
      onClick={handleSave}
      style={{
        padding: "10px 20px",
        backgroundColor: "#007BFF",
        color: "#FFFFFF",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Save Flowchart
    </button>
  );
};

export default SaveButton;
