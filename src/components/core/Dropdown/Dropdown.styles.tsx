import { Select } from "@mui/material";
import { styled } from "@mui/material/styles";

export const SelectInput = styled(Select)<any>`
    input {
        color: ${(props) => props.textcolor};
    }
`;
