import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
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
  private auth: Auth = inject(Auth);

  menuItems: { [key: string]: { route: string; isSelected: boolean; title: string } } = {
    'dashboard': { route:'/dashboard', isSelected: false, title: 'Dashboard' },
    'question-bank': { route: '/question-bank', isSelected: false, title: 'Question Bank' },
    'download': { route: '/download', isSelected: false, title: 'Download' }
  };

  isCollapsed: boolean = true;
  currentRoute = this.router.url.substring(1);
  uid: string = '';

  ngOnInit() {
    const segments = this.currentRoute.split('/');
    this.uid = segments[1];
    segments.forEach((segment) => {
      if (this.menuItems[segment]) {
        this.menuItems[segment].isSelected = true;
      }
    });
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
    this.router.navigate([`study/${this.uid}/${selected}`]);
  }

  logOut() {
    signOut(this.auth);
    this.router.navigate(['/login']);
  }
}
