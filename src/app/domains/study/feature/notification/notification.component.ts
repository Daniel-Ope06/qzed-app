import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Notification } from '../../data-access/notification.model';

@Component({
  selector: 'notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent {
  @Input({required: true}) notification!: Notification;
}
