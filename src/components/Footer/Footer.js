import React from "react";
import { Container, List, Segment } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

export const Footer = () => (
    <Segment vertical inverted>
        <Container className="footerContainer">
            <List floated="right" horizontal inverted divided link>
                <List.Item
                    as={NavLink}
                    to={"/contact"}
                    activeClassName="active"
                >
                    Contact
                </List.Item>
                <List.Item as={NavLink} to={"/terms"} activeClassName="active">
                    Terms
                </List.Item>
                <List.Item
                    as={NavLink}
                    to={"/privacy"}
                    activeClassName="active"
                >
                    Privacy
                </List.Item>
                <List.Item
                    as={NavLink}
                    to={"/impressum"}
                    activeClassName="active"
                >
                    Impressum
                </List.Item>
            </List>

            <List horizontal inverted divided link>
                <List.Item as={NavLink} to={"/"} exact activeClassName="">
                    &copy; {new Date().getFullYear()} Project name
                </List.Item>
            </List>
        </Container>
    </Segment>
);
