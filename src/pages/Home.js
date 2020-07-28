import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Header, List } from "semantic-ui-react";
import { useTranslation } from "react-i18next";

export default () => {
    const { t } = useTranslation();

    return (
        <Container style={{ marginTop: "10em" }}>
            <Header as="h1">{t("home.header")}</Header>

            <p>{t("home.description")}</p>
            <p>Features:</p>

            <List bulleted>
                <List.Item>Responsive collapsable navbar</List.Item>
                <List.Item>Login</List.Item>
                <List.Item>Login with Google</List.Item>
                <List.Item>Sign up</List.Item>
                <List.Item>Log out</List.Item>
                <List.Item>Account page</List.Item>
                <List.Item>Change username, email, password</List.Item>
                <List.Item>Verify email</List.Item>
                <List.Item>Reset password</List.Item>
                <List.Item>Avatar upload</List.Item>
                <List.Item>Delete account</List.Item>
                <List.Item>Form validation</List.Item>
                <List.Item>Localization / translation</List.Item>
            </List>

            <Button color="teal" as={NavLink} to={"/signin"}>
                {t("home.competeButton")}
            </Button>
        </Container>
    );
};
