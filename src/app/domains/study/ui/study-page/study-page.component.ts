import { Component, Input } from '@angular/core';
import { DashboardComponent } from "../../feature/dashboard/dashboard.component";
import { HeaderComponent } from '../../feature/header/header.component';
import { MenuComponent } from '../../feature/menu/menu.component';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'study-page',
    standalone: true,
    templateUrl: './study-page.component.html',
    styleUrl: './study-page.component.scss',
    imports: [DashboardComponent, HeaderComponent, MenuComponent, RouterModule]
})
export class StudyPageComponent {
  title: string = 'Dashboard';

  receiveTab(tabTitle: string) {
    this.title = tabTitle;
  }
}
