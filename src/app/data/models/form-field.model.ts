import { Option } from "./options.model";

export interface FormField {
    type: string,
    label: string,
    options?: Option[] | any,
    formControlName?: string,
    class: string[],
    hintMessage?: string,
    customError?: string,
    routeTo?: string,
    disabled?: boolean
    datalist?: string[]
}