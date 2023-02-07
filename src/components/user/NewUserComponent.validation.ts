import * as yup from "yup";
import { UIConstants } from "../constants/UIConstants";

export const NewUserValidationSchema = yup.object().shape({
    employeeId: yup
        .string()
        .required(`Please enter IBM ${UIConstants.employeeIdLabel} in 6 character. Eg: xxxxxx`)
        .min(6, `${UIConstants.employeeIdLabel} must be 6 char only`)
        .max(6, `${UIConstants.employeeIdLabel} must be 6 char only`),
    email: yup
        .string()
        .email(`Please enter ${UIConstants.emailIdLabel} in valid format, i.e. 'xyz@ibm.com'`)
        .matches(
            /^gg@ibm.com$/,
            `${UIConstants.emailIdLabel} must be IBM email, i.e. 'xyz@ibm.com / xyz@in.ibm.com'`
        )
        .required(`Please enter ${UIConstants.emailIdLabel}`),
    firstName: yup
        .string()
        .required(`Please enter ${UIConstants.firstNameLabel}`)
        .trim()
        .min(2)
        .max(60),
    lastName: yup
        .string()
        .required(`Please enter ${UIConstants.lastNameLabel}`)
        .trim()
        .min(2)
        .max(60),
    password: yup
        .string()
        .required(`Please generate the ${UIConstants.passwordLabel}`),
    roleId: yup
        .string()
        .required(`Please select ${UIConstants.selectUser}`),
    reviewerEmpId: yup
        .string()
        .when("roleId", {
            is: "63bbedee42fd516ddaf2e7be",
            then: yup.string().required(`Please select ${UIConstants.selectReviewer}`)
        }),
    managerEmpId: yup.string().when("roleId", {
        is: (val: string) => val === "63885ca42c2a9f5a595f487a" || val === "63bbedee42fd516ddaf2e7be",
        then: yup.string().required(`Please select ${UIConstants.selectManager}`)
    }),
});