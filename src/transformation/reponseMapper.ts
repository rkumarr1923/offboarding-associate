import { DropdownValues } from "../components/constants/type";


export const mapAPItoUIDocTypeDropdown = <T>(allDocType: T[], idSrc: string, nameSrc: string): DropdownValues[] => {

    return allDocType?.map((item: any) =>
    ({
        id: item[idSrc],
        name: item[nameSrc],
    })
    )
} 