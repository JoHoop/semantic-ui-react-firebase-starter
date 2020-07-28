import React, { useCallback, useContext, useState } from "react";
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
import { signIn } from "../helpers/Auth.js";
import { UserContext } from "../helpers/UserProvider.js";
import { SignInProviders } from "../components/SignIn/SignInProviders";
import { emailIsValid, emptyElement } from "../helpers/Validators";

export default () => {
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const [errorMessage, setErrorMessage] = useState("");
    const showError = (error) => {
        setErrorMessage(`${error.message} (Code: ${error.code})`);
    };
    const [isLoading, setIsLoading] = useState(false);

    const handleSignIn = useCallback(async () => {
        setIsLoading(true);
        try {
            await signIn(emailInput, passwordInput);
            return <Redirect to="/account" />;
        } catch (error) {
            showError(error);
        }
        setIsLoading(false);
    }, [emailInput, passwordInput]);

    const { currentUser } = useContext(UserContext);

    if (currentUser) {
        return <Redirect to="/account" />;
    }

    const emailInputValid = () => {
        return emptyElement([emailInput]) || emailIsValid(emailInput);
    };
    const allInputsFilled = () => {
        return !emptyElement([emailInput, passwordInput]);
    };

    return (
        <Container style={{ marginTop: "10em" }} text>
            <Grid className="limitWidthToContainer">
                <Grid.Column style={{ maxWidth: 650 }}>
                    <Header as="h1">Sign in</Header>
                    <p>to your account</p>
                    <Menu pointing secondary>
                        <Menu.Item active>Sign in</Menu.Item>
                        <Menu.Item as={NavLink} to={"/signup"}>
                            Sign up
                        </Menu.Item>
                        <Menu.Item as={NavLink} to={"/reset"} position="right">
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
                        <Form.Input
                            fluid
                            icon="lock"
                            iconPosition="left"
                            placeholder="Password"
                            type="password"
                            value={passwordInput}
                            onChange={(event) =>
                                setPasswordInput(event.target.value)
                            }
                        />
                        <Button
                            color="teal"
                            fluid
                            loading={isLoading}
                            size="large"
                            disabled={!emailInputValid() || !allInputsFilled()}
                            onClick={() => handleSignIn()}
                        >
                            Sign in
                        </Button>
                    </Form>
                    <Message
                        error
                        hidden={!errorMessage}
                        header={errorMessage}
                    />
                    <SignInProviders />
                </Grid.Column>
            </Grid>
        </Container>
    );
};
