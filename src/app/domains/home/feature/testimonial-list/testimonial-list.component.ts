import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit,
  inject,
} from '@angular/core';
import { TestimonialService } from '../../data-access/testimonial.service';
import { Testimonial } from '../../data-access/testimonial.model';
import { LoadingSpinnerComponent } from '../../../shared/ui/loading-spinner/loading-spinner.component';

@Component({
  selector: 'testimonial-list',
  standalone: true,
  imports: [LoadingSpinnerComponent],
  templateUrl: './testimonial-list.component.html',
  styleUrl: './testimonial-list.component.scss',
})
export class TestimonialListComponent implements AfterViewInit, OnInit {
  @ViewChild('scroll') scroll!: ElementRef;
  @ViewChild('innerScroll') innerScroll!: ElementRef;

  testimonialService: TestimonialService = inject(TestimonialService);
  testimonials: Testimonial[] = [];

  ngOnInit(): void {
    this.testimonialService.getTestimonials().then((testimonials) => {
      this.testimonials = testimonials;
      // Add testimonials twice for smooth animation
      this.testimonials.push(...this.testimonials);
    });
  }

  ngAfterViewInit(): void {
    // If a user hasn't opted in for reduced motion, then we add the animation
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.scroll.nativeElement.setAttribute('data-animated', true);
    }
  }
}
