import { Component, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, signInAnonymously, signInWithRedirect } from '@angular/fire/auth';

@Component({
  selector: 'login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  auth: Auth = inject(Auth);
  googleProvider: GoogleAuthProvider = new GoogleAuthProvider();

  loginDemo() {
    signInAnonymously(this.auth);
  }

  loginGoogle() {
    signInWithRedirect(this.auth, this.googleProvider);
  }
}
