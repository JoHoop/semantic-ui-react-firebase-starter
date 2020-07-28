import React from "react";
import { Container, Message } from "semantic-ui-react";

export const WipWarning = () => {
    return (
        <Container style={{ marginTop: "7em" }}>
            <Message
                color="teal"
                content="https://github.com/JoHoop/semantic-ui-firebase-starter"
            />
        </Container>
    );
};
