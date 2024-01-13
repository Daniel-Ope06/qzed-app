import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, GoogleAuthProvider, User, getRedirectResult, signInAnonymously, signInWithRedirect } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  private googleProvider: GoogleAuthProvider = new GoogleAuthProvider();
  private router = inject(Router);

  ngOnInit() {
    getRedirectResult(this.auth).then((result) => {
      if (!result) { return; }
      this.updateUserData(result!.user);
      this.router.navigate([`study/${result.user.uid}`])
    });
  }

  private updateUserData(result: User) {
    const userRef = doc(this.firestore, `users/${result.uid}`);
    const user = {
      uid: result.uid!,
      email: result.email!,
      photoURL: result.photoURL!,
      displayName: result.displayName!,
    };
    return setDoc(userRef, { user }, { merge: true });
  }

  loginDemo() {
    this.router.navigate([`study/demo`])
  }

  loginGoogle() {
    signInWithRedirect(this.auth, this.googleProvider);
  }
}
