import { Component, OnInit, inject } from '@angular/core';
import { UserCountService } from '../../data-access/user-count.service';

@Component({
  selector: 'user-count',
  standalone: true,
  imports: [],
  templateUrl: './user-count.component.html',
  styleUrl: './user-count.component.scss',
})
export class UserCountComponent implements OnInit {
  userCountService: UserCountService = inject(UserCountService);
  userCount: number = 0;

  ngOnInit(): void {
    this.userCountService.getUserCount().then((userCount) => {
      this.userCount = userCount;
    });
  }
}
