import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import { NavLink } from "react-router-dom";

import {
    Button,
    Form,
    Grid,
    Header,
    Message,
    Container,
    Menu,
} from "semantic-ui-react";
import { resetPassword } from "../helpers/Auth";
import { UserContext } from "../helpers/UserProvider.js";
import { emailIsValid, emptyElement } from "../helpers/Validators";

export default () => {
    const [emailInput, setEmailInput] = useState("");
    const [confirmMessage, setConfirmMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const showError = (error) => {
        setErrorMessage(`${error.message} (Code: ${error.code})`);
    };

    const handleResetPassword = async () => {
        try {
            await resetPassword(emailInput);
        } catch (error) {
            showError(error);
        }
        setConfirmMessage("Password reset link has been sent to your email!");
    };

    const { currentUser } = useContext(UserContext);

    if (currentUser) return <Redirect to="/account" />;

    const emailInputValid = () => {
        return emptyElement([emailInput]) || emailIsValid(emailInput);
    };
    const emailInputFilled = () => {
        return !emptyElement([emailInput]);
    };

    return (
        <Container style={{ marginTop: "10em" }} text>
            <Grid className="limitWidthToContainer">
                <Grid.Column style={{ maxWidth: 650 }}>
                    <Header as="h1">Reset password</Header>
                    <p>send a password reset link to your email</p>
                    <Menu pointing secondary>
                        <Menu.Item as={NavLink} to={"/signin"}>
                            Sign in
                        </Menu.Item>
                        <Menu.Item as={NavLink} to={"/signup"}>
                            Sign up
                        </Menu.Item>
                        <Menu.Item
                            active
                            as={NavLink}
                            to={"/reset"}
                            position="right"
                        >
                            Forgot password?
                        </Menu.Item>
                    </Menu>
                    <Form size="large">
                        <Form.Input
                            fluid
                            icon="at"
                            iconPosition="left"
                            placeholder="Email"
                            type="email"
                            value={emailInput}
                            onChange={(event) =>
                                setEmailInput(event.target.value)
                            }
                        />
                        <Button
                            color="teal"
                            fluid
                            size="large"
                            disabled={!emailInputValid() || !emailInputFilled()}
                            onClick={() => handleResetPassword()}
                        >
                            Reset password
                        </Button>
                    </Form>
                    <Message
                        color="teal"
                        hidden={!confirmMessage}
                        header={confirmMessage}
                    />
                    ;
                    <Message
                        error
                        hidden={!errorMessage}
                        header={errorMessage}
                    />
                </Grid.Column>
            </Grid>
        </Container>
    );
};
