import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Header, Button } from "semantic-ui-react";

export default () => (
    <Container style={{ marginTop: "10em" }}>
        <Header as="h1">404 Error</Header>
        <p>The page you requested does not exist.</p>
        <Button color="teal" as={NavLink} to={"/"}>
            Take me home!
        </Button>
    </Container>
);
