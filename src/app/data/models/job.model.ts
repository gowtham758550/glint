export interface Job {
    postJobDetailId?: number
    companyName?:string
    companyProfilePicture?: string
    employerID?: number
    jobTitle: string
    description: string
    experienceNeeded: number
    salary: number
    jobType: string
    minimumQualification: string
    location: string
    createdDate: Date
    companyDescription: string
}