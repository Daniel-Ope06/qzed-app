import { Injectable, inject } from '@angular/core';
import { DocumentData, Firestore, collection, getDocs, orderBy, where, query } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  firestore: Firestore = inject(Firestore);

  async getSchools() {
    let schools: DocumentData[] = [];
    const schoolsRef = collection(this.firestore, 'schools');
    const q = query(schoolsRef, orderBy('full_name'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      schools.push(doc.data());
    });
    return schools;
  }

  async getCourses(schoolId: string) {
    const courseRef = collection(this.firestore, 'schools', schoolId, 'courses');
    const querySnapshot = await getDocs(courseRef);
    const courses = querySnapshot.docs.map((doc) => doc.data());
    return courses;
  }
}
