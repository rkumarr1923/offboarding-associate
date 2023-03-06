import * as yup from "yup";

export const CommentValidationSchema = yup.object().shape({
    empId: yup.string(),
    associateName: yup.string().required("Please select an associate to view the comments"),
    
});

export const addCommentValidationSchema = yup.object().shape({
    empId: yup.string().required("XXXXXXXXXXXXXXX"),
    comments: yup.string().required("Please provide comments"),
    
});

export const addCommentDefaultValues= {
    empId: '',
    comments: '',
}