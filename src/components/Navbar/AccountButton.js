import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Image } from "semantic-ui-react";
import { UserContext } from "../../helpers/UserProvider.js";

export const AccountButton = (props) => {
    const { currentUser } = useContext(UserContext);
    if (props.mobile) {
        if (currentUser) {
            return (
                <Menu.Item as={NavLink} to={"/account"} activeClassName="">
                    Account
                </Menu.Item>
            );
        } else {
            return (
                <Menu.Item as={NavLink} to={"/signin"} activeClassName="active">
                    Sign in
                </Menu.Item>
            );
        }
    }
    if (currentUser) {
        return (
            <Menu.Item
                as={NavLink}
                to={"/account"}
                activeClassName=""
                position="right"
            >
                <Image avatar spaced="right" src={currentUser.photoURL} />
                {currentUser.displayName}
            </Menu.Item>
        );
    } else {
        return (
            <Menu.Item
                as={NavLink}
                to={"/signin"}
                activeClassName="active"
                position="right"
            >
                Sign in
            </Menu.Item>
        );
    }
};
