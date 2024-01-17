import { Injectable, inject } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { Notification } from './notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  firestore: Firestore = inject(Firestore);

  async getAll(): Promise<Notification[]> {
    let notifications: Notification[] = [];
    const querySnapshot = await getDocs(collection(this.firestore, 'notifications'));
    querySnapshot.forEach((doc) => {
      notifications.push(doc.data() as Notification);
    })
    return notifications;
  }
}
