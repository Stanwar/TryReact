import React from "react";
import { FieldRenderProps } from "react-final-form";
import { DateTimePicker } from "react-widgets/lib";
import { Form, FormFieldProps, Label } from "semantic-ui-react";

interface IProps extends FieldRenderProps<any, HTMLElement>, FormFieldProps {
}

const DateInput: React.FC<IProps> = ({
    input,
    width,
    rows,
    placeholder,
    id = null,
    date = false,
    time = false,
    meta: { touched, error },
    ...rest
}) => {
    const messages: any = {
        dateButton: null,
        timeButton: null,
    };
    return (
        <Form.Field error={touched && !!error} width={width}>
            <DateTimePicker
                placeholder={placeholder}
                value={input.value || null}                
                onChange={input.onChange}
                onBlur={input.onBlur}
                onKeyDown={(e) => e.preventDefault()} // will prevent from typing
                // date={date}
                // time={time}
                messages={messages}
                {...rest}
            />
            {touched && error && (
                <Label basic color="red">
                    {error}
                </Label>
            )}
        </Form.Field>
    );
};

export default DateInput;
