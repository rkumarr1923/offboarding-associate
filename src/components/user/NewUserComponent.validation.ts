import * as yup from "yup";

export const NewUserValidationSchema = yup.object().shape({
    employeeId: yup.string().required("Please enter IBM employee ID in 6 character. Eg: xxxxxx"),
    email: yup.string().required("Please enter email for exapmle 'xyz@ibm.com'"),
    firstName: yup.string().required("Please enter First Name"),
    lastName: yup.string().required("Please enter Last Name"),
    password: yup.string().required("Please enter Password"),
    roleId: yup.string().required("Please select Role"),
    reviewerEmpId: yup.string().required("Please select Reviewer"),
    managerEmpId: yup.string().required("Please select Manager"),
});