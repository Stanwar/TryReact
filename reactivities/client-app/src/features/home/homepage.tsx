import React from "react";
import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";

const HomePage = () => {
    return (
        <Container style={{ marginTop: "7em" }}>
            <h1> HOME PAGE </h1>
            <h3>
                Go to <Link to="/activities">activities</Link>
            </h3>
        </Container>
    );
};

export default HomePage;
