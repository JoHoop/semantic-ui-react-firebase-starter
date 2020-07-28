import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";

export const NavbarMenuItem = (props) => (
    <Menu.Item as={NavLink} to={props.link} activeClassName="active">
        {props.name}
    </Menu.Item>
);
