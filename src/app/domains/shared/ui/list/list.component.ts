import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { Router } from '@angular/router';
import { IsGridService } from './is-grid.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  @Input({required: true}) items: {long:string, short:string, id:string}[] = [];
  @Input({required: true}) heading: string = '';
  @Input() previousRoute: string = '';
  @Output() selectItemEvent = new EventEmitter<string>();

  private router = inject(Router);
  private isGridService = inject(IsGridService);

  isGrid: boolean = false;

  ngOnInit(): void {
    this.isGridService.isGrid.subscribe((isGrid) => {
      this.isGrid = isGrid;
    });
  }

  toggleGrid() {
    this.isGrid = !this.isGrid;
    this.isGridService.setIsGrid(this.isGrid);
  }

  returnId(id: string) {
    this.selectItemEvent.emit(id);
  }

  canBackNavigate(): boolean {
    const currentRoute = this.router.url.substring(1);
    const segments = currentRoute.split('/');
    if (segments.length >= 4) {
      return true;
    }
    return false;
  }

  backNavigate() {
    const currentRoute: string = this.router.url.substring(1);
    const segments: string[] = currentRoute.split('/');
    let newSegments: string[] = [];
    // if in year list
    if (segments.length == 6) {
      newSegments = segments.slice(0, -2);
      this.router.navigate(newSegments);
    }
    // if in course list
    else if (segments.length == 4) {
      newSegments = segments.slice(0, -1);
      this.router.navigate(newSegments);
    }
  }
}
