import * as yup from "yup";

export const FilterUploadDocumentValidationSchema = yup.object().shape({
    empId: yup.string(),
    associateName: yup.string().required("Please select an associate to view the documents"),
    
});