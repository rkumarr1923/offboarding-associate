
export type LoginRequest={
    empId: string;
    password: string;
}

export type LoginResponse={
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
}

export interface TextareaType {
    label: string;
    autoFocus?: boolean;
    name: string;
    error: any;
    helperText: any;
}