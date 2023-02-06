import * as yup from "yup";

export const NewUserValidationSchema = yup.object().shape({
    employeeId: yup
        .string()
        .required("Please enter IBM employee ID in 6 character. Eg: xxxxxx"),
    email: yup
        .string()
        .email("Please enter email in valid format, i.e. 'xyz@ibm.com'")
        .required("Please enter Email"),
    firstName: yup
        .string()
        .required("Please enter First Name")
        .trim()
        .min(2)
        .max(60),
    lastName: yup
        .string()
        .required("Please enter Last Name")
        .trim()
        .min(2)
        .max(60),
    password: yup
        .string()
        .required("Please enter Password"),
    roleId: yup
        .string()
        .required("Please select Role"),
    reviewerEmpId: yup
        .string()
        .when("roleId", {
            is: "63bbedee42fd516ddaf2e7be",
            then: yup.string().required('Please select Reviewer')
        }),
    managerEmpId: yup.string().when("roleId", {
        is: (val: string) => val === "63885ca42c2a9f5a595f487a" || val === "63bbedee42fd516ddaf2e7be",
        then: yup.string().required('Please select Manager')
    }),
});