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

  menuItems: { [key: string]: { route: string; selected: boolean; title: string } } = {
    dashboard: { route:'/dashboard', selected: false, title: 'Dashboard' },
    question: { route: '/question-bank', selected: false, title: 'Question Bank' },
    download: { route: '/download', selected: false, title: 'Download' }
  };

  isCollapsed: boolean = true;
  currentRoute = this.router.url.substring(1);

  ngOnInit() {
    const lastSegment: string = this.currentRoute.split('/').pop()!;
    this.setSelected(lastSegment);
  }


  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  setSelected(subRoute: string) {
    this.menuItems[subRoute].selected = true;
  }

  switchRoute(subRoute: string) {
    for (let key in this.menuItems) {
      this.menuItems[key].selected = false;
    }
    this.menuItems[subRoute].selected = true;
    this.changeTabEvent.emit(this.menuItems[subRoute].title);

    let segments = this.currentRoute.split('/');
    segments[segments.length - 1] = this.menuItems[subRoute].route;
    let newRoute = segments.join('/');
    this.router.navigate([newRoute]);
  }
}
