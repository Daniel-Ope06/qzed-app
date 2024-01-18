import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  @Output() changeTabEvent = new EventEmitter<string>();
  private router: Router = inject(Router);

  menuItems: { [key: string]: { route: string; isSelected: boolean; title: string } } = {
    'dashboard': { route:'/dashboard', isSelected: false, title: 'Dashboard' },
    'question-bank': { route: '/question-bank', isSelected: false, title: 'Question Bank' },
    'download': { route: '/download', isSelected: false, title: 'Download' }
  };

  isCollapsed: boolean = true;
  currentRoute = this.router.url.substring(1);

  ngOnInit() {
    // set initial route on page load
    const lastSegment: string = this.currentRoute.split('/').pop()!;
    this.menuItems[lastSegment].isSelected = true;
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  switchRoute(selected: string) {
    // update menu item selection
    for (let key in this.menuItems) {
      this.menuItems[key].isSelected = false;
    }
    this.menuItems[selected].isSelected = true;
    this.changeTabEvent.emit(this.menuItems[selected].title);

    // update route
    let segments = this.currentRoute.split('/');
    segments[segments.length - 1] = this.menuItems[selected].route;
    let newRoute = segments.join('/');
    this.router.navigate([newRoute]);
  }
}
