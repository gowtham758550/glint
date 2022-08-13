import { Status } from "../enums/status.enum"

export interface Appliers {
    fullName: string
    userName: string
    profilePicture: string
    email: string
    status: Status
    gender: string
    dateOfBirth: Date
}