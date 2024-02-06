import { Component, Input, OnInit, inject } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @Input({required: true}) uid: string = '';
  @Input({required: true}) tabTitle: string = '';
  private firestore: Firestore = inject(Firestore);
  user: { displayName: string, email: string, photoURL: string } = { displayName: '', email: '', photoURL: '' };

  ngOnInit() {
    this.getUserDetails();
  }

  async getUserDetails(): Promise<void> {
    const userDoc = await getDoc(doc(this.firestore, `users/${this.uid}`));
    const userData = userDoc.data()?.['user'];
    if (userData) {
      this.user['displayName'] = userData['display_name'];
      this.user['email'] = userData['email'];
      this.user['photoURL'] = userData['photo_url'];
    }
  }

  replaceImage() {
    this.user['photoURL'] = '../../../../../assets/study/cat.jpg';
  }
}