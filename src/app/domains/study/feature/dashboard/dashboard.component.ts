import { Component, Input } from '@angular/core';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [NotificationComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  @Input({required: true}) uid: string = '';
}
