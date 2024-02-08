import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizResultService {
  private resultSource = new BehaviorSubject<number>(-1);
  result = this.resultSource.asObservable();

  constructor() {
    const result = localStorage.getItem('quizResult');
    if (result) {
      this.resultSource.next(parseInt(result));
    }
  }

  setResult(result: number) {
    this.resultSource.next(result);
    this.storeInLocalStorage(result);
  }

  storeInLocalStorage(result: number) {
    localStorage.setItem('quizResult', result.toString());
  }
}
