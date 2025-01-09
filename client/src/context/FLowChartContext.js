import React, { createContext, useContext, useState } from "react";

const FlowChartContext = createContext();

export const FlowChartProvider = ({ children }) => {
  const [flowData, setFlowData] = useState({ elements: [] });

  const updateFlowData = (data) => setFlowData(data);

  return (
    <FlowChartContext.Provider value={{ flowData, updateFlowData }}>
      {children}
    </FlowChartContext.Provider>
  );
};

export const useFlowChart = () => useContext(FlowChartContext);
