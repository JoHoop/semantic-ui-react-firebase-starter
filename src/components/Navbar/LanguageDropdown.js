import React from "react";
import { Dropdown } from "semantic-ui-react";
import { useTranslation } from "react-i18next";

export const LanguageDropdown = () => {
    const { i18n } = useTranslation();
    return (
        <Dropdown item text="Language" simple className="adjustColorToItems">
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => i18n.changeLanguage("en")}>
                    English
                </Dropdown.Item>
                <Dropdown.Item onClick={() => i18n.changeLanguage("de")}>
                    Deutsch
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};
