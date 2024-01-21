import { CommonModule, Location } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { LoadingSpinnerComponent } from '../../../../shared/ui/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  @Input({required: true}) items: {long:string, short:string, id:string}[] = [];
  @Input({required: true}) heading: string = '';
  @Input() previousRoute: string = '';
  @Output() selectItemEvent = new EventEmitter<string>();

  private location = inject(Location);
  isGrid: boolean = false;

  toggleGrid() {
    this.isGrid = !this.isGrid;
  }

  returnId(id: string) {
    this.selectItemEvent.emit(id);
  }

  canBackNavigate(): boolean {
    if (this.heading.includes('course') || this.heading.includes('year')) {
      return true;
    }
    return false;
  }

  backNavigate() {
    this.location.back();
  }
}
