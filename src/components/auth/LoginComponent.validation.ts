import * as yup from "yup";

export const LoginValidationSchema = yup.object().shape({
    empId: yup.string(),
    pswd: yup.string().required("Password is required!"),
});