import { Component, Input, OnInit, inject } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';

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
  private auth: Auth = inject(Auth);
  private router = inject(Router);
  user: { displayName: string, email: string, photoURL: string } = { displayName: '', email: '', photoURL: '' };

  ngOnInit() {
    onAuthStateChanged(this.auth, (userData) => {
      if (userData) {
        this.user['displayName'] = userData['displayName']?? 'Guest User';
        this.user['email'] = userData['email']?? 'guest@email.com';
        this.user['photoURL'] = userData['photoURL']?? 'https://drive.google.com/thumbnail?id=1IzYvnObDukiNA2Bz0I2YnzRkU5OvVSx3';
        this.correctUserID(userData['uid']);
      }
    });
  }

  replaceImage() {
    this.user['photoURL'] = '../../../../../assets/study/cat.jpg';
  }

  correctUserID(uid: string) {
    if (this.uid === uid) { return; }
    const currentRoute: string = this.router.url.substring(1);
    const segments: string[] = currentRoute.split('/');
    segments[1] = uid;
    this.router.navigate(segments);
  }
}