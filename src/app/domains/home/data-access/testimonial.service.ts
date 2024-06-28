import { Injectable, inject } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { Testimonial } from './testimonial.model';

@Injectable({
  providedIn: 'root',
})
export class TestimonialService {
  firestore: Firestore = inject(Firestore);

  async getTestimonials(): Promise<Testimonial[]> {
    let testimonials: Testimonial[] = [];
    const querySnapshot = await getDocs(
      collection(this.firestore, 'testimonials')
    );
    querySnapshot.forEach((doc) => {
      testimonials.push(doc.data() as Testimonial);
    });
    return testimonials;
  }
}
