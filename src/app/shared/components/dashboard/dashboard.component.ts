import { Component, Input, OnInit } from '@angular/core';
import { SidebarItems } from 'src/app/data/models/sidebar-items.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  @Input()
  sidebarItems!: SidebarItems[]; 

  showSidebar: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebarVisibility() {
    this.showSidebar = !this.showSidebar;
  }

}
