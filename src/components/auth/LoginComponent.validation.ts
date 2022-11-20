import * as yup from "yup";

export const LoginValidationSchema = yup.object().shape({
    empId: yup.string(),
    password: yup.string().required("Password is required!"),
});