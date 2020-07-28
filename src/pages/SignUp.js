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
import { signUp, changeUsername } from "../helpers/Auth.js";
import { UserContext } from "../helpers/UserProvider.js";
import { useForm } from "../components/useForm";
import {
    emailIsValid,
    emptyElement,
    stringsEqual,
} from "../helpers/Validators";
import { SignInProviders } from "../components/SignIn/SignInProviders";

export default () => {
    const [values, handleChange] = useForm({
        username: "",
        email: "",
        password: "",
        password2: "",
    });
    const { username, email, password, password2 } = values;

    const showError = (error) => {
        setErrorMessage(`${error.message} (Code: ${error.code})`);
    };

    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSignUp = useCallback(async () => {
        setIsLoading(true);
        try {
            await signUp(email, password);
            await changeUsername(username);
            return <Redirect to="/account" />;
        } catch (error) {
            showError(error);
        }
        setIsLoading(false);
    }, [email, password, username]);

    const { currentUser } = useContext(UserContext);

    if (currentUser) {
        return <Redirect to="/account" />;
    }

    const emailInputValid = () => {
        return email === "" || emailIsValid(email);
    };
    const passwordInputValid = () => {
        return stringsEqual(password, password2);
    };
    const allInputsFilled = () => {
        return !emptyElement([username, email, password, password2]);
    };

    return (
        <Container style={{ marginTop: "10em" }} text>
            <Grid className="limitWidthToContainer">
                <Grid.Column style={{ maxWidth: 650 }}>
                    <Header as="h1">Sign up</Header>
                    <p>for an account</p>
                    <Menu pointing secondary>
                        <Menu.Item as={NavLink} to={"/signin"}>
                            Sign in
                        </Menu.Item>
                        <Menu.Item active>Sign up</Menu.Item>
                        <Menu.Item as={NavLink} to={"/reset"} position="right">
                            Forgot password?
                        </Menu.Item>
                    </Menu>
                    <Form size="large" success>
                        <Form.Input
                            fluid
                            icon="user"
                            iconPosition="left"
                            placeholder="Username"
                            name="username"
                            type="text"
                            value={username}
                            onChange={handleChange}
                        />
                        <Form.Input
                            fluid
                            icon="at"
                            iconPosition="left"
                            placeholder="Email"
                            name="email"
                            type="email"
                            value={email}
                            error={!emailInputValid()}
                            onChange={handleChange}
                        />
                        <Form.Input
                            fluid
                            icon="lock"
                            iconPosition="left"
                            placeholder="Password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                        />
                        <Form.Input
                            fluid
                            icon="lock"
                            iconPosition="left"
                            placeholder="Confirm password"
                            type="password"
                            name="password2"
                            value={password2}
                            error={!passwordInputValid()}
                            onChange={handleChange}
                        />
                        <Button
                            color="teal"
                            fluid
                            loading={isLoading}
                            size="large"
                            disabled={
                                !emailInputValid() ||
                                !passwordInputValid() ||
                                !allInputsFilled()
                            }
                            onClick={() => handleSignUp()}
                        >
                            Sign up
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
