import { Component, Input } from '@angular/core';

@Component({
  selector: 'notification',
  standalone: true,
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  @Input({required: true}) title: string = '';
  @Input({required: true}) content: string = '';
  @Input({required: true}) date: string = '';
  @Input({required: true}) uid: string = '';
}
