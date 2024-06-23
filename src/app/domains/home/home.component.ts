import { Component } from '@angular/core';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { HeroComponent } from './ui/hero/hero.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, HeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
