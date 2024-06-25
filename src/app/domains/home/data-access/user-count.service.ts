import { Injectable, inject } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserCountService {
  firestore: Firestore = inject(Firestore);

  async getUserCount(): Promise<number> {
    let userCount: number = 0;
    const querySnapshot = await getDocs(collection(this.firestore, 'users'));
    querySnapshot.forEach((doc) => {
      userCount++;
    });
    return userCount;
  }
}
