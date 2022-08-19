import { Status } from "../enums/status.enum"

export interface Appliers {
    jobSeekerId:number
    appliedJobId: number
    fullName: string
    userName: string
    profilePicture: string
    email: string
    status: Status
    gender: string
    dateOfBirth: Date
}