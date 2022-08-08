import { Component, OnInit } from '@angular/core';
import { JobDetail } from 'src/app/data/models/job-detail.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {
  Jobs: JobDetail={
    PostJobDetailId: 1,
    EmployerId: 1,
    JobTitle: "Software Engineer",
    Description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem odio explicabo aut molestiae facilis tenetur voluptatum laborum, obcaecati est optio itaque labore iste vero quo, unde, consectetur qui cupiditate corporis? Amet dignissimos, omnis eum vel modi ab possimus earum error corporis officia dolores qui quam ipsam natus asperiores quas sunt culpa magni! Fuga cum veritatis perferendis. Deleniti iusto magni vero! Aliquam inventore error numquam sapiente officiis sint suscipit neque animi aperiam vero illo architecto quia laboriosam temporibus facere sequi natus repellat illum voluptatum molestias iste, quis quam soluta. Pariatur, repudiandae. Amet, error omnis ipsa est repellat sapiente obcaecati quis perspiciatis animi, numquam minima sint? Aliquam pariatur explicabo, tempore consequatur unde quo quas voluptate, officia iusto, labore eum voluptates odio voluptatem?",
    ExperienceNeeded:3,
    Salary: 30000,
    JobType: "Full Time",
    MinimumQualification: "Bachelors degree",
    Location: "Chennai",
    CompanyName:"Accenture",
  }
  constructor() { }

  ngOnInit(): void {
  }

}
