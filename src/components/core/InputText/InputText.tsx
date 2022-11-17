import React from "react"
import { StyledInput } from "./InputText.style";

const defaultProps = {
    className: "btn-color",
    type: "text",
    fullWidth: true,
    variant: "standard",
    margin: "dense",
}

export const InputText: React.FC<any> = React.forwardRef((props, ref) => (
    <StyledInput {...defaultProps} {...props} ref={ref} />
));