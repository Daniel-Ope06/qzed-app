import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, GoogleAuthProvider, User, onAuthStateChanged, signInWithRedirect } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { LoadingSpinnerComponent } from '../../../shared/ui/loading-spinner/loading-spinner.component';

@Component({
  selector: 'login',
  standalone: true,
  imports: [LoadingSpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  private googleProvider: GoogleAuthProvider = new GoogleAuthProvider();
  private router = inject(Router);
 isLoading: boolean = false;

  ngOnInit() {
    this.isLoading = true;
    onAuthStateChanged(this.auth, (user) => {
      if (!user) {
        this.isLoading = false;
        return;
      }
      this.updateUserData(user);
      this.router.navigate([`study/${user.uid}`]);
    });
  }

  private updateUserData(result: User) {
    const userRef = doc(this.firestore, `users/${result.uid}`);
    const user = {
      uid: result.uid!,
      email: result.email!,
      photo_url: result.photoURL!,
      display_name: result.displayName!,
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
