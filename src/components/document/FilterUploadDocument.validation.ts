import * as yup from "yup";

export const SelectAssociateValidationSchema = yup.object().shape({
    empId: yup.string(),
    associateName: yup.string().required("Please select an associate to view the documents"),
    
});


export const FilterUploadDocumentValidationSchema = yup.object().shape({
    empId: yup.string(),
    documentType: yup.string().required("Please select document type"),
    
});


export const CommentValidationSchema = yup.object().shape({
    empId: yup.string(),
    associateName: yup.string().required("Please select an associate to view the comments"),
    
});

export const addCommentValidationSchema = yup.object().shape({
    ssssss: yup.string().required("XXXXXXXXXXXXXXX"),
    comments: yup.string().required("Please provide comments"),
    
});