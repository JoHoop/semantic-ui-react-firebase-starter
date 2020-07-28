import { useState } from "react";

export const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);

    return [
        values,
        (event) => {
            setValues({
                ...values,
                [event.target.name]: event.target.value,
            });
        },
    ];
};
