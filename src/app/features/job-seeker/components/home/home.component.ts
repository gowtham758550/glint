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
      type: 'menu-item',
      label: 'Dashboard',
      routeTo: '/job-seeker/dashboard',
      icon: 'pi-search'
    },
    {
      type: 'menu-item',
      label: 'My Jobs',
      routeTo: '/job-seeker/jobs',
      icon: 'pi-briefcase'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
