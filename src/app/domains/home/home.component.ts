import { Component } from '@angular/core';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { HeroComponent } from './ui/hero/hero.component';
import { FeatureListComponent } from './ui/feature-list/feature-list.component';
import { BenefitListComponent } from './ui/benefit-list/benefit-list.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    FeatureListComponent,
    BenefitListComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
