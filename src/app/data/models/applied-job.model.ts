import { Status } from "../enums/status.enum"

export interface AppliedJob {
    postJobDetailId: number
    companyProfilePicture: number
    companyName: string
    jobStatus: Status
    appliedOn: Date
    modifiedOn: Date
    jobTitle: string
    location: string
}