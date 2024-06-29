import { Component, OnInit, inject } from '@angular/core';
import { FaqService } from '../../data-access/faq.service';
import { Faq } from '../../data-access/faq.model';
import { LoadingSpinnerComponent } from '../../../shared/ui/loading-spinner/loading-spinner.component';

@Component({
  selector: 'faq-list',
  standalone: true,
  imports: [LoadingSpinnerComponent],
  templateUrl: './faq-list.component.html',
  styleUrl: './faq-list.component.scss',
})
export class FaqListComponent implements OnInit {
  faqService: FaqService = inject(FaqService);
  faqs: Faq[] = [];
  isFaqCollapsed: boolean[] = [];

  ngOnInit(): void {
    this.faqService.getFaqs().then((faqs) => {
      this.faqs = faqs;
      this.isFaqCollapsed = new Array(this.faqs.length).fill(true);
    });
  }

  toggleCollapse(index: number): void {
    this.isFaqCollapsed[index] = !this.isFaqCollapsed[index];
  }
}
