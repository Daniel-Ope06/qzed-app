import { Component, inject } from '@angular/core';
import { QuizResultService } from './quiz-result.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-result',
  standalone: true,
  imports: [],
  templateUrl: './quiz-result.component.html',
  styleUrl: './quiz-result.component.scss'
})
export class QuizResultComponent {
  private quizResultService = inject(QuizResultService);
  private router = inject(Router);
  result: number = 0;

  ngOnInit() {
    this.quizResultService.result.subscribe((result) => {
      this.result = result;
    });
  }

  routeToQuiz() {
    const currentRoute = this.router.url.substring(1);
    const segments = currentRoute.split('/');
    const uid = segments[1];
    const schoolId = segments[3];
    const courseId = segments[4];
    this.router.navigate([`study/${uid}/quiz/${schoolId}/${courseId}`]);
  }
}
