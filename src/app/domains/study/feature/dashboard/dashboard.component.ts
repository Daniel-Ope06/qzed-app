import { Component, OnInit, inject } from '@angular/core';
import { NotificationComponent } from '../notification/notification.component';
import { NotificationService } from '../../data-access/notification.service';
import { Notification } from '../../data-access/notification.model';
import { LoadingSpinnerComponent } from '../../../shared/ui/loading-spinner/loading-spinner.component';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [NotificationComponent, LoadingSpinnerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private notificationService: NotificationService = inject(NotificationService);
  notifications!: Notification[];

  ngOnInit() {
    this.notificationService.getAll().then((notifications) => {
      this.notifications = notifications.reverse();
    });
  }
}
