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
      routeTo: '/employer/dashboard',
      icon: 'pi-home'
    },
    {
      label: 'Jobs',
      routeTo: '/employer/jobs'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
