import { Injectable, inject } from '@angular/core';
import { DocumentData, Firestore, collection, getDocs, orderBy, where, query, doc, getDoc } from '@angular/fire/firestore';

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

  async getSchoolName(schoolId: string) {
    const schoolDocRef = doc(this.firestore, 'schools', schoolId);
    const docSnap = await getDoc(schoolDocRef);
    const school = docSnap.data();
    return school!['full_name'];
  }

  async getCourses(schoolId: string) {
    const courseRef = collection(this.firestore, 'schools', schoolId, 'courses');
    const querySnapshot = await getDocs(courseRef);
    const courses = querySnapshot.docs.map((doc) => doc.data());
    return courses;
  }

  async getCourse(schoolId: string, courseId: string) {
    const courseDocRef = doc(this.firestore, 'schools', schoolId, 'courses', courseId);
    const docSnap = await getDoc(courseDocRef);
    const course = docSnap.data();
    return course;
  }
}
