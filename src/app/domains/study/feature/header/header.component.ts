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
  private firestore: Firestore = inject(Firestore);
  user: { displayName: string, photoURL: string } = { displayName: '', photoURL: '' };

  ngOnInit() {
    this.getUserDetails();
  }

  async getUserDetails(): Promise<void> {
    const userDoc = await getDoc(doc(this.firestore, `users/${this.uid}`));
    const userData = userDoc.data()?.['user'];
    if (userData) {
      this.user['displayName'] = userData['displayName'];
      this.user['photoURL'] = userData['photoURL'];
    }
  }
}