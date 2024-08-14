import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isSidebarClosed = false;
  activeSubmenuIndex: number | null = null;

  constructor (private router: Router) {}

  ngOnInit(): void {
    
  }

  menuItems = [
    { title: 'Report', subItems: [{name: 'Order History', path: "/report/order-history"}, {name: 'Payment settlement', path: "/report/payment-settlement"}] },
    // { title: 'Second submenu', subItems: ['Third sublink', 'Fourth sublink'] }
  ];

  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
  }

  toggleSubmenu(index: number) {
    this.activeSubmenuIndex = this.activeSubmenuIndex === index ? null : index;
  }

  closeSubmenu() {
    this.activeSubmenuIndex = null;
  }

  navigateMenu (path: any) {
    this.router.navigate([path]);
  }

}
