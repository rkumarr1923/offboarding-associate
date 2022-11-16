
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