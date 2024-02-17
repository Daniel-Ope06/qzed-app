import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SchoolService } from '../../../data-access/school.service';
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
  private schoolService = inject(SchoolService);

  courseCode: string = '';
  timeInMins: number = 0;
  numOfQuestions: number = 0;
  pointsPerQuestion: number = 0;

  async ngOnInit() {
    const currentRoute = this.router.url.substring(1);
    const segments = currentRoute.split('/');
    const schoolId = segments[2];
    const courseId = segments[3];

    await this.schoolService.getCourse(schoolId, courseId).then((course) => {
      this.courseCode = course!['code'];
      this.timeInMins = course!['quiz']['time_in_mins'];
      this.numOfQuestions = course!['quiz']['num_of_questions'];
      this.pointsPerQuestion = 100 / this.numOfQuestions;
    });
  }
}
