import React from "react";
import { Button, Form, Icon } from "semantic-ui-react";

export const ProviderButton = (props) => (
    <Form.Field>
        <Button
            disabled={props.disabled}
            color={props.color}
            type="submit"
            fluid
        >
            <Icon name={props.icon} /> {props.provider}
        </Button>
    </Form.Field>
);
