import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsGridService {
  private isGridSource = new BehaviorSubject<boolean>(false);
  isGrid = this.isGridSource.asObservable();

  constructor() { }

  setIsGrid(isGrid: boolean) {
    this.isGridSource.next(isGrid);
  }
}
