import React from "react";
import { Container, Loader } from "semantic-ui-react";

export const LoadingError = () => (
    <Container style={{ marginTop: "20em" }}>
        <Loader inline="centered" active indeterminate size="massive">
            Could not fetch content
        </Loader>
    </Container>
);
