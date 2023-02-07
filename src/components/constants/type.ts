
export type LoginRequest = {
    empId: string;
    password: string;
}

export type LoginResponse = {
    token?: any;
    data: {
        role: string,
        email: string,
        name: string,
        userId: string,
        associateName?: string,
        associateRole?: string,
        reviewerName?: string,
        reviewerRole?: string,
        managerName?: string,
        managerRole?: string,
        reviewer: {
            empId: string,
            reviewerName: string
        },
        manager: {
            empId: string,
            managerName: string
        },
        token: any
    }

}

export interface DropdownType {
    label: string;
    autoFocus?: boolean;
    name: string;
    renderValue?: any;
    error: any;
    onChange: any;
    helperText: any;
    options: Record<string, any>;
    selectAnOption: boolean;
}

export interface TextareaType {
    label: string;
    autoFocus?: boolean;
    name: string;
    error: any;
    helperText: any;
}

export interface DropdownValues {
    id: string;
    name: string;
}

export interface LabelVisibilityTestCaseType {
    attributeLabel: string;
    visibilityExpectation: boolean;
    testcaseName?: string;
}

export interface RegExTestCaseType {
    value: string;
    isMatch: boolean;
}
