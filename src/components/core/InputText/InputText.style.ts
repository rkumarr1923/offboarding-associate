import { styled, TextField } from "@mui/material";


export const StyledInput= styled(TextField)<any>`
input {
    color: ${(props) => props.textcolor};
}
`;