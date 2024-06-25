import { Component } from '@angular/core';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { HeroComponent } from './ui/hero/hero.component';
import { FeatureListComponent } from './ui/feature-list/feature-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, HeroComponent, FeatureListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
