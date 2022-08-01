import { Component, OnInit } from '@angular/core';
import { SidebarItems } from 'src/app/data/models/sidebar-items.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  sidebarItems: SidebarItems[] = [
    {
      label: 'Dashboard',
      routeTo: '/job-seeker/dashboard'
    },
    {
      label: 'My Jobs',
      routeTo: '/job-seeker/jobs'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
