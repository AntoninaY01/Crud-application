import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  sidebarMenu = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      routerLink: ['/home'],
      command: () => console.log('tuk sme'),
    },
    {
      label: "Events",
      icon: 'pi pi-calendar',
      routerLink: ['/events'],
      // command: () => this.onHideSidebar(),
    }
  ];
}
