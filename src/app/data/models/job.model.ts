export interface Job {
    postJobDetailId?: number
    employerID?: number
    jobTitle: string
    description: string
    experienceNeeded: number
    salary: number
    jobType: string
    minimumQualification: string
    location: string
    createdDate: Date
}