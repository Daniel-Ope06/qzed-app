import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'testimonial-list',
  standalone: true,
  imports: [],
  templateUrl: './testimonial-list.component.html',
  styleUrl: './testimonial-list.component.scss',
})
export class TestimonialListComponent implements AfterViewInit {
  @ViewChild('scroll') scroll!: ElementRef;
  @ViewChild('innerScroll') innerScroll!: ElementRef;

  testimonials = [1, 2, 3, 4, 5, 6];

  ngAfterViewInit() {
    // If a user hasn't opted in for reduced motion, then we add the animation
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.addAnimation();
    }
  }

  addAnimation() {
    this.scroll.nativeElement.setAttribute('data-animated', true);
    let content = Array.from(this.innerScroll.nativeElement.children);
    content.forEach((item) => {
      let duplicatedItem = (item as HTMLElement).cloneNode(true) as HTMLElement;
      duplicatedItem.setAttribute('aria-hidden', 'true');
      this.innerScroll.nativeElement.appendChild(duplicatedItem);
    });
  }
}
