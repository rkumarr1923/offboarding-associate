import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
} from "@mui/material";
import React from "react";
import { DropdownType } from "../../constants/type";
import { UIConstants } from "../../constants/UIConstants";
import { SelectInput } from "./Dropdown.styles";

const formControlDefaultProps = {
    fullWidth: true,
};

const selectDefaultProps = {
    variant: "filled",
    fullWidth: true,
    textcolor: "black",
    label: "inputText",
};

export const Dropdown: React.FC<any> = React.forwardRef(
    (props: DropdownType, ref) => {
        const { name, label, helperText, options } = props;

        return (
            <FormControl
                variant="filled"
                {...formControlDefaultProps}
                error={helperText}
            >
                <InputLabel id={name}>{label}</InputLabel>
                <SelectInput {...selectDefaultProps} {...props} ref={ref}>

                    {props.selectAnOption && (
                        <MenuItem value="">
                            <em>{UIConstants.selectAnOption}</em>
                        </MenuItem>
                    )}

                    {options?.map((items: any) => (
                        <MenuItem value={items.id}>{items.name}</MenuItem>
                    ))}
                </SelectInput>
                <FormHelperText>{helperText}</FormHelperText>
            </FormControl>
        );
    },
);
