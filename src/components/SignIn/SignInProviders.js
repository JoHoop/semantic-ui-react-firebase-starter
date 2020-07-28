import React, { useState } from "react";
import { Form, Divider, Message } from "semantic-ui-react";
import { ProviderButton } from "./ProviderButton";
import { signInWithGoogle } from "../../helpers/Auth";

export const SignInProviders = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const showError = (error) => {
        setErrorMessage(`${error.message} (Code: ${error.code})`);
    };

    const signInWithProvider = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            showError(error);
        }
    };

    return (
        <>
            <br />
            <Divider horizontal>or sign in with</Divider>
            <br />
            <Form
                onSubmit={() => {
                    signInWithProvider();
                }}
                className="inline"
                widths="equal"
            >
                <Form.Group>
                    <ProviderButton
                        provider="Google"
                        color="google plus"
                        icon="google"
                    />
                    <ProviderButton
                        disabled
                        provider="Apple"
                        color="grey"
                        icon="apple"
                    />
                    <ProviderButton
                        disabled
                        provider="GitHub"
                        color="black"
                        icon="github"
                    />
                    <ProviderButton
                        disabled
                        provider="Mobile"
                        color="teal"
                        icon="mobile"
                    />
                </Form.Group>
            </Form>
            <Message error hidden={!errorMessage} header={errorMessage} />
        </>
    );
};
