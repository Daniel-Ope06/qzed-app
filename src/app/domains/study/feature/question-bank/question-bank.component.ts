import { Component } from '@angular/core';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'question-bank',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './question-bank.component.html',
  styleUrl: './question-bank.component.scss'
})
export class QuestionBankComponent {
  isGrid: boolean = false;
}
