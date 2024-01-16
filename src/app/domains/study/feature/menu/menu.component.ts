import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  isCollapsed = true;

  menuItems: { [key: string]: { route: string; selected: boolean } } = {
    dashboard: { route:'/dashboard', selected: false },
    question: { route: '/question-bank', selected: true },
    download: { route: '/download', selected: false }
  };

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  switchRoute(route: string) {
    for (let key in this.menuItems) {
      this.menuItems[key].selected = false;
    }
    this.menuItems[route].selected = true;
  }
}
