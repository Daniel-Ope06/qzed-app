import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../../feature/header/header.component';
import { MenuComponent } from '../../feature/menu/menu.component';

@Component({
  selector: 'study-page',
  standalone: true,
  imports: [HeaderComponent, MenuComponent],
  templateUrl: './study-page.component.html',
  styleUrl: './study-page.component.scss'
})
export class StudyPageComponent {
  @Input() uid: string = '';
  title: string = 'Question Bank';

  receiveTab(tabTitle: string) {
    this.title = tabTitle;
  }
}
