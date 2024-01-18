import { Timestamp } from "@angular/fire/firestore";

export interface Notification {
    title: string;
    content: string;
    date: Timestamp;
}