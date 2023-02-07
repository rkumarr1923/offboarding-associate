
import { RegExTestCaseType } from "../../constants/type";
import { validateRegExValue } from "./test-helper";
import { alphaNumeric, alphaNumericSpecialCharacter } from "./util";

describe("Util Test Cases :::", () => {
    describe("alphaNumeric testcase", () => {
        [
            {
                value: "SampleText",
                isMatch: true,
            },
            {
                value: "Sample Text",
                isMatch: true,
            },
            {
                value: "SampleText1",
                isMatch: true,
            },
            {
                value: "Sample Text 1",
                isMatch: true,
            },
            {
                value: "Sample Text #",
                isMatch: false,
            },
            {
                value: "Sample Text&T",
                isMatch: false,
            },
        ].forEach((item: RegExTestCaseType) =>
            validateRegExValue(item, alphaNumeric),
        );
    });

    describe("alphaNumericSpecialCharacter testcase", () => {
        [
            {
                value: "SampleText",
                isMatch: true,
            },
            {
                value: "Sample Text",
                isMatch: true,
            },
            {
                value: "SampleText1",
                isMatch: true,
            },
            {
                value: "Sample Text 𓀁",
                isMatch: false,
            },
            {
                value: "Sample Text #",
                isMatch: true,
            },
            {
                value: "Sample Text&T",
                isMatch: true,
            },
        ].forEach((item: RegExTestCaseType) =>
            validateRegExValue(item, alphaNumericSpecialCharacter),
        );
    });
});
