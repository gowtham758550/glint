import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
  })
export class JobsList {
    jobList: any = [{
        id: 1,
        image: '/assets/Conzio.jpg',
        Company_Name: 'Conzio Constructions',
        Job_title: 'Software Engineer',
        Location: 'Coimbatore',
        CTC: 25000,
        Job_Type: 'Full Time',
        Experience: 'Fresher',
        MinimumQualification: 'Bachelors Degree',
        Description: ' This role includes analyzing and modifying existing software as well as designing, constructing and testing end-user applications that meet user needs — all through software programming languages.'

    }, {
        id: 2,
        image: '/assets/Midway Overline.jpg',
        Company_Name: 'Midway Overline',
        Job_title: 'Software Engineer',
        Location: 'Coimbatore',
        CTC: 50000,
        Job_Type: 'Full Time',
        Experience: 'Experienced',
        MinimumQualification: 'Bachelors Degree',
        Description: ' This role includes analyzing and modifying existing software as well as designing, constructing and testing end-user applications that meet user needs — all through software programming languages.'

    },
    {
        id: 3,
        image: '/assets/Midway Overline.jpg',
        Company_Name: 'Midway Overline',
        Job_title: 'IOS Developer',
        Location: 'Coimbatore',
        CTC: 50000,
        Job_Type: 'Full Time',
        Experience: 'Fresher',
        MinimumQualification: 'Bachelors Degree',
        Description: ' This role includes analyzing and modifying existing software as well as designing, constructing and testing end-user applications that meet user needs — all through software programming languages.'

    },
    {
        id: 4,
        image: '/assets/Midway Overline.jpg',
        Company_Name: 'Midway Overline',
        Job_title: 'Android Developer',
        Location: 'Chennai',
        CTC: 50000,
        Job_Type: 'Full Time',
        Experience: 'Experienced',
        MinimumQualification: 'Bachelors Degree',
        Description: ' This role includes analyzing and modifying existing software as well as designing, constructing and testing end-user applications that meet user needs — all through software programming languages.'

    },
    {
        id: 5,
        image: '/assets/Midway Overline.jpg',
        Company_Name: 'Midway Overline',
        Job_title: 'Full Stack Developer',
        Location: 'Coimbatore',
        CTC: 50000,
        Job_Type: 'Full Time',
        Experience: 'Experienced',
        MinimumQualification: 'Bachelors Degree',
        Description: ' This role includes analyzing and modifying existing software as well as designing, constructing and testing end-user applications that meet user needs — all through software programming languages.'

    }];
    getJobs() {
        return this.jobList;
    }
    appliedJobs:any=[];
}