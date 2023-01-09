import { DropdownValues } from "../components/constants/type";


export const mapAPItoUIDocTypeDropdown = (allDocType: any, idSrc: string, nameSrc: string): DropdownValues => {

    return allDocType?.map((item: any) =>
    ({
        id: item[idSrc],
        name: item[nameSrc],
    })
    )
} 