import { Component } from '@angular/core';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { HeroComponent } from './ui/hero/hero.component';
import { FeatureListComponent } from './ui/feature-list/feature-list.component';
import { BenefitListComponent } from './ui/benefit-list/benefit-list.component';
import { TestimonialListComponent } from './feature/testimonial-list/testimonial-list.component';
import { FaqListComponent } from './feature/faq-list/faq-list.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    FeatureListComponent,
    BenefitListComponent,
    TestimonialListComponent,
    FaqListComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
