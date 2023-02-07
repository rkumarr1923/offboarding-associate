import { screen } from "@testing-library/react";
import { LabelVisibilityTestCaseType, RegExTestCaseType } from "../../constants/type";


export const validateAttributeVisibility = ({
    attributeLabel,
    visibilityExpectation,
}: LabelVisibilityTestCaseType): void => {
    const labelName = screen.getByText(attributeLabel);
    Object.freeze(labelName);

    it(`check visibility of ${attributeLabel} - ${visibilityExpectation}`, () => {
        if (visibilityExpectation) {
            expect(labelName).toBeInTheDocument();
        } else {
            expect(labelName).not.toBeInTheDocument();
        }
    });
};

export const validateRegExValue = (
    { value, isMatch }: RegExTestCaseType,
    regEx: RegExp,
): void => {
    it(`check regular expression for ${value} - ${isMatch}`, () => {
        if (isMatch) {
            expect(value).toMatch(regEx);
        } else {
            expect(value).not.toMatch(regEx);
        }
    });
};
