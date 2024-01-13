import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../../feature/header/header.component';

@Component({
  selector: 'study-page',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './study-page.component.html',
  styleUrl: './study-page.component.scss'
})
export class StudyPageComponent {
  @Input() uid: string = '';
}
