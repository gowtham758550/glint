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
      routeTo: '/employer/dashboard',
      icon: 'pi-home'
    },
    {
      type: 'menu-item',
      label: 'Jobs',
      icon: 'pi-briefcase',
      routeTo: '/employer/jobs'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
