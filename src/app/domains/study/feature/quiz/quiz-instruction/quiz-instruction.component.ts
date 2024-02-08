import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'quiz-instruction',
  standalone: true,
  imports: [],
  templateUrl: './quiz-instruction.component.html',
  styleUrl: './quiz-instruction.component.scss'
})
export class QuizInstructionComponent {
  @Input({required: true}) courseCode: string = '';
  @Input({required: true}) timeInMins: number = 0;
  @Input({required: true}) numOfQuestions: number = 0;
  @Input({required: true}) pointsPerQuestion: number = 0;
  @Output() startQuizEvent = new EventEmitter<boolean>();

  startQuiz() {
    this.startQuizEvent.emit(true);
  }
}
