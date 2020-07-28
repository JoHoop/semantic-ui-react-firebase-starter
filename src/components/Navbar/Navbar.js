import React, { useState } from "react";
import { Button, Grid, Icon, Container, Menu, Image } from "semantic-ui-react";
import "../../styles/Navbar.css";
import { NavLink } from "react-router-dom";
import { AccountButton } from "./AccountButton";
import { NavbarMenuBrand } from "./NavbarMenuBrand";
import { NavbarMenuItems } from "./NavbarMenuItems";
import { LanguageDropdown } from "./LanguageDropdown";

export const Navbar = () => {
    const [showMobileMenu, setMobileMenu] = useState(false);

    return (
        <>
            <Grid padded className="tablet computer only">
                <Menu borderless fixed="top" inverted secondary>
                    <Container>
                        <NavbarMenuBrand />
                        <NavbarMenuItems />
                        <LanguageDropdown />
                        <AccountButton />
                    </Container>
                </Menu>
            </Grid>
            <Grid className="mobile only">
                <Menu borderless fixed="top" inverted>
                    <Image
                        className="brandLogoMobile"
                        size="mini"
                        src="/logo.png"
                    />
                    <Menu.Item
                        as={NavLink}
                        to={"/"}
                        exact
                        header
                        activeClassName=""
                        onClick={() => setMobileMenu(false)}
                    >
                        Project name
                    </Menu.Item>
                    <Menu.Menu position="right">
                        <Menu.Item>
                            <Button
                                icon
                                inverted
                                basic
                                toggle
                                onClick={() => setMobileMenu(!showMobileMenu)}
                            >
                                <Icon name="content" />
                            </Button>
                        </Menu.Item>
                    </Menu.Menu>
                    <Menu
                        borderless
                        fluid
                        vertical
                        inverted
                        onClick={() => setMobileMenu(!showMobileMenu)}
                        style={
                            showMobileMenu
                                ? { display: "flex" }
                                : { display: "none" }
                        }
                    >
                        <NavbarMenuItems />
                        <AccountButton mobile />
                        <LanguageDropdown />
                    </Menu>
                </Menu>
            </Grid>
        </>
    );
};
