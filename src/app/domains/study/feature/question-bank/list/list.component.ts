import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() selectItemEvent = new EventEmitter<string>();

  isGrid: boolean = false;

  toggleGrid() {
    this.isGrid = !this.isGrid;
  }

  returnId(id: string) {
    this.selectItemEvent.emit(id);
  }
}
