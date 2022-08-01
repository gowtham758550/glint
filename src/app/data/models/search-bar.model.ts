import { Option } from "./options.model"

export interface SearchBar {
    type: string
    options?: Option[]
    label: string
    formControlName: string
}
