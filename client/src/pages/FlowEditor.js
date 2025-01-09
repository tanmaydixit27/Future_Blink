import React, { useState } from "react";
import { Grid, Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Flowchart from "../components/FlowChart";

const FlowEditor = () => {
  const [selectedNodeType, setSelectedNodeType] = useState(null);

  const handleNodeAdd = (nodeType) => {
    setSelectedNodeType(nodeType);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Sidebar onNodeAdd={handleNodeAdd} />
      </Grid>
      <Grid item xs={9}>
        <Box height="80vh" border={1} borderColor="grey.300">
          <Flowchart selectedNodeType={selectedNodeType} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default FlowEditor;
