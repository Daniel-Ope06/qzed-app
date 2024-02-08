import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { QuizInstructionComponent } from '../quiz-instruction/quiz-instruction.component';
import { QuizQuestionsComponent } from '../quiz-questions/quiz-questions.component';
import { QuizResultService } from '../quiz-result/quiz-result.service';


@Component({
  selector: 'app-quiz-test',
  standalone: true,
  imports: [QuizInstructionComponent, QuizQuestionsComponent, RouterModule],
  templateUrl: './quiz-test.component.html',
  styleUrl: './quiz-test.component.scss'
})
export class QuizTestComponent {
  private quizResultService = inject(QuizResultService);
  private router = inject(Router);
  subscription!: Subscription;

  subscribeToEmitter(componentRef: Component) {
    if (componentRef instanceof QuizInstructionComponent) {
      const quizInstruction = componentRef as QuizInstructionComponent;
      quizInstruction.startQuizEvent.subscribe(() => {
        this.routeToQuizQuestions();
      });
    } else if (componentRef instanceof QuizQuestionsComponent) {
      const quizQuestions = componentRef as QuizQuestionsComponent;
      this.subscription = quizQuestions.submitQuizEvent.subscribe((percentage) => {
        this.quizResultService.setResult(percentage);
        this.routeToQuizResult();
      });
    }
  }

  unsubscribeFromEmitter() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  routeToQuizQuestions() {
    const currentRoute = this.router.url.substring(1);
    const segments = currentRoute.split('/');
    const uid = segments[1];
    const schoolId = segments[3];
    const courseId = segments[4];
    this.router.navigate([`study/${uid}/quiz/${schoolId}/${courseId}/questions`]);
  }

  routeToQuizResult() {
    const currentRoute = this.router.url.substring(1);
    const segments = currentRoute.split('/');
    const uid = segments[1];
    const schoolId = segments[3];
    const courseId = segments[4];
    this.router.navigate([`study/${uid}/quiz/${schoolId}/${courseId}/result`]);
  }
}
