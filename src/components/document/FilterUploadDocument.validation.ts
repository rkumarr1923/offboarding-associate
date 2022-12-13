import * as yup from "yup";

export const FilterUploadDocumentValidationSchema = yup.object().shape({
    empId: yup.string(),
    password: yup.string(),
});