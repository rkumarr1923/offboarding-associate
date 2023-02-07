import { render } from "@testing-library/react";
import { FormProvider } from "react-hook-form";
import { validateAttributeVisibility } from "../common/utils/test-helper";
import { withForm } from "../common/utils/withForm";
import { LabelVisibilityTestCaseType } from "../constants/type";
import NewUserComponent from "./NewUserComponent";
import { NewUserValidationSchema } from "./NewUserComponent.validation";
// import { LabelVisibilityTestCaseType } from "../../Constants/application.type";
// import { validateAttributeVisibility } from "../../utils/test-helper";
// import { withForm } from "../../utils/withForm";
// import { projectDetailsValidationSchema } from "../../validation/projectDetailsValidation";
// import AddProjectDetailsForm from "./AddProjectDetailsForm";

describe("NewUserComponent Test Cases :::", () => {
    // const compRef = () => render(<AddProjectDetailsForm />);
    // const compRef = () =>
    //     render(
    //         <FormProvider
    //             {...({
    //                 register: () => jest.fn(),
    //                 formState: () => jest.fn(),
    //                 errors: {
    //                     projectName: "",
    //                 },
    //             } as any)}
    //         >
    //             <AddProjectDetailsForm />
    //         </FormProvider>,
    //     );

    // Object.freeze(compRef);

    const renderComponent = () => {
        const AddProjectDetailsRenderForm = withForm<null, null>(
            NewUserComponent,
            NewUserValidationSchema,
        );
        render(<AddProjectDetailsRenderForm />);
    };

    describe("Render all labels", () => {
        renderComponent();
        [
            {
                attributeLabel: "First Name",
                visibilityExpectation: true,
            },
        ].forEach((item: LabelVisibilityTestCaseType): void =>
            validateAttributeVisibility(item),
        );
    });
});
