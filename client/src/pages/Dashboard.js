import React from "react";
import {Container, Typography, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Email Marketing Dashboard
            </Typography>
            <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/flow-editor")}
            >
                Create Email Sequence
            </Button>
        </Container>
    );
};

export default Dashboard;