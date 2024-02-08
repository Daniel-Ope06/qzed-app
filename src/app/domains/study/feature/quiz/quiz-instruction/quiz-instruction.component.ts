import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../../../data-access/question.service';
import { LoadingSpinnerComponent } from '../../../../shared/ui/loading-spinner/loading-spinner.component';

@Component({
  selector: 'quiz-instruction',
  standalone: true,
  imports: [LoadingSpinnerComponent],
  templateUrl: './quiz-instruction.component.html',
  styleUrl: './quiz-instruction.component.scss'
})
export class QuizInstructionComponent {
  @Output() startQuizEvent = new EventEmitter<void>();

  private router = inject(Router);
  private questionService = inject(QuestionService);

  courseCode: string = '';
  timeInMins: number = 0;
  numOfQuestions: number = 0;
  pointsPerQuestion: number = 0;

  async ngOnInit() {
    const currentRoute = this.router.url.substring(1);
    const segments = currentRoute.split('/');
    const schoolId = segments[3];
    const courseId = segments[4];

    await this.questionService.getCourse(schoolId, courseId).then((course) => {
      this.courseCode = course!['code'];
      this.timeInMins = course!['quiz']['time_in_mins'];
      this.numOfQuestions = course!['quiz']['num_of_questions'];
      this.pointsPerQuestion = 100 / this.numOfQuestions;
    });
  }
}
