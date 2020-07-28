import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Image } from "semantic-ui-react";

export const NavbarMenuBrand = () => {
    return (
        <>
            <Image className="brandLogo" size="mini" src="/logo.png" />
            <Menu.Item as={NavLink} to={"/"} exact activeClassName="active">
                Project name
            </Menu.Item>
        </>
    );
};
