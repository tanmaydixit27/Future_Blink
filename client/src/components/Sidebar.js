import React from "react";
import { Box, List, ListItem, ListItemText } from "@mui/material";

const Sidebar = ({ onNodeAdd }) => {
  const nodes = ["Cold Email", "Wait/Delay", "Lead Source"];

  return (
    <Box>
      <List>
        {nodes.map((node) => (
          <ListItem
            key={node}
            onClick={() => onNodeAdd(node)}
            sx={{ cursor: "pointer" }} // Highlight on hover
            component="li"
          >
            <ListItemText primary={node} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
