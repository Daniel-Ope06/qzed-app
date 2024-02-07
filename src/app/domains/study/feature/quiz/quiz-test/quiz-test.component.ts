import { Component, OnInit, inject } from '@angular/core';
import { QuestionService } from '../../../data-access/question.service';
import { QuizInstructionComponent } from '../quiz-instruction/quiz-instruction.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-test',
  standalone: true,
  imports: [QuizInstructionComponent],
  templateUrl: './quiz-test.component.html',
  styleUrl: './quiz-test.component.scss'
})
export class QuizTestComponent implements OnInit {
  courseCode: string = '';
  timeInMins: number = 0;
  numOfQuestions: number = 0;
  quizPool: { question: string, answer: string, options: string[] }[] = [];

  private router = inject(Router);
  private questionService = inject(QuestionService);

  async ngOnInit() {
    const currentRoute = this.router.url.substring(1);
    const segments = currentRoute.split('/');
    const schoolId = segments[3];
    const courseId = segments[4];

    await this.questionService.getCourse(schoolId, courseId).then((course) => {
      this.courseCode = course!['code'];
      this.timeInMins = course!['quiz']['time_in_mins'];
      this.numOfQuestions = course!['quiz']['num_of_questions'];
      for (let quiz of course!['quiz']['pool']) {
        this.quizPool.push({ question: quiz['question'], answer: quiz['answer'], options: quiz['options'] });
      }
      console.log(this.courseCode);
      console.log(this.timeInMins);
      console.log(this.numOfQuestions);
      console.log(this.quizPool);
    });
  }
}
