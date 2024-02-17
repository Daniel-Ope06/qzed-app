import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { NavigationEnd, Router } from '@angular/router';

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
  private auth: Auth = inject(Auth);

  menuItems: { [key: string]: { route: string; isSelected: boolean; title: string } } = {
    'dashboard': { route:'/dashboard', isSelected: false, title: 'Dashboard' },
    'question-bank': { route: '/question-bank', isSelected: false, title: 'Question Bank' },
    'quiz': { route: '/quiz', isSelected: false, title: 'Quiz' }
  };

  isCollapsed: boolean = true;
  currentRoute = this.router.url.substring(1);

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = this.router.url.substring(1);
        this.initializeRoute();
      }
    });
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  logOut() {
    signOut(this.auth);
    this.router.navigate(['/login']);
  }

  initializeRoute() {
    for (let key in this.menuItems) {
      this.menuItems[key].isSelected = false;
    }
    const segments = this.currentRoute.split('/');
    segments.forEach((segment) => {
      if (this.menuItems[segment]) {
        this.menuItems[segment].isSelected = true;
      }
    });
  }

  switchRoute(selected: string) {
    // update menu item selection
    for (let key in this.menuItems) {
      this.menuItems[key].isSelected = false;
    }
    this.menuItems[selected].isSelected = true;
    this.changeTabEvent.emit(this.menuItems[selected].title);
    // update route
    this.router.navigate([`study/${selected}`]);
  }
}
