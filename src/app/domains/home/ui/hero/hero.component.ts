import { Component } from '@angular/core';
import { UserCountComponent } from '../../feature/user-count/user-count.component';

@Component({
  selector: 'hero',
  standalone: true,
  imports: [UserCountComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {}
