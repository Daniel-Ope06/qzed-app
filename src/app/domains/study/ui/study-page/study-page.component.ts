import { Component, Input } from '@angular/core';

@Component({
  selector: 'study-page',
  standalone: true,
  imports: [],
  templateUrl: './study-page.component.html',
  styleUrl: './study-page.component.scss'
})
export class StudyPageComponent {
  @Input() uid: string = '';
}
