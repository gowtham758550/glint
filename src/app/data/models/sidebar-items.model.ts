export interface SidebarItems {
    type: string
    label: string,
    icon?: any,
    routeTo?: string,
    children?: {
        label: string,
        icon?: any,
        routeTo: string
    }[]
}