import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { SchoolService } from '../../../data-access/school.service';
import { Router } from '@angular/router';
import { LoadingSpinnerComponent } from "../../../../shared/ui/loading-spinner/loading-spinner.component";

@Component({
    selector: 'quiz-questions',
    standalone: true,
    templateUrl: './quiz-questions.component.html',
    styleUrl: './quiz-questions.component.scss',
    imports: [LoadingSpinnerComponent]
})
export class QuizQuestionsComponent implements OnInit {
  @Output() submitQuizEvent = new EventEmitter<number>();

  private router = inject(Router);
  private schoolService = inject(SchoolService);

  courseCode: string = '';
  timeInMins: number = 0;
  numOfQuestions: number = 0;
  quizPool: { question: string, answer: string, options: string[] }[] = [];

  letters: string[] = ['A', 'B', 'C', 'D'];

  pool: {
    question: string,
    answer: string,
    options: { value: string, isSelected: boolean }[]
  }[] = [];

  canSubmitQuiz: boolean = false;

  async ngOnInit() {
    const currentRoute = this.router.url.substring(1);
    const segments = currentRoute.split('/');
    const schoolId = segments[2];
    const courseId = segments[3];

    await this.schoolService.getCourse(schoolId, courseId).then((course) => {
      this.courseCode = course!['code'];
      this.timeInMins = course!['quiz']['time_in_mins'];
      this.numOfQuestions = course!['quiz']['num_of_questions'];
      for (let quiz of course!['quiz']['pool']) {
        this.quizPool.push({ question: quiz['question'], answer: quiz['answer'], options: quiz['options'] });
      }
      this.initializePool();
    });
  }

  initializePool() {
    this.quizPool = this.shuffleArray(this.quizPool);

    for (let i = 0; i < this.numOfQuestions; i++) {
      let quiz = this.quizPool[i];
      let options: { value: string, isSelected: boolean }[] = [];
      quiz['options'] = this.shuffleArray(quiz['options']);

      for (let option of quiz['options']) {
        options.push({ value: option, isSelected: false });
      }

      this.pool.push({ question: quiz['question'], answer: quiz['answer'], options: options });
    }
  }

  selectOption(questionIndex: number, optionIndex: number) {
    for (let option of this.pool[questionIndex]['options']) {
      option['isSelected'] = false;
    }
    this.pool[questionIndex]['options'][optionIndex]['isSelected'] = true;
    this.canSubmitQuiz = this.canSubmit();
  }

  canSubmit(): boolean {
    for (let question of this.pool) {
      if (question['options'].find(option => option['isSelected'] === true) === undefined) {
        return false;
      }
    }
    return true;
  }

  submitQuiz() {
    let score = 0;
    for (let question of this.pool) {
      if (question['options'].find(option => option['isSelected'] === true)!.value === question['answer']) {
        score++;
      }
    }
    let percentage = (score / this.numOfQuestions) * 100;
    this.submitQuizEvent.emit(percentage);
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
