import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  @Output() changeTabEvent = new EventEmitter<string>();

  menuItems: { [key: string]: { route: string; selected: boolean; title: string } } = {
    dashboard: { route:'/dashboard', selected: false, title: 'Dashboard' },
    question: { route: '/question-bank', selected: true, title: 'Question Bank' },
    download: { route: '/download', selected: false, title: 'Download' }
  };

  isCollapsed: boolean = true;
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  switchRoute(route: string) {
    for (let key in this.menuItems) {
      this.menuItems[key].selected = false;
    }
    this.menuItems[route].selected = true;
    this.changeTabEvent.emit(this.menuItems[route].title);
  }
}
