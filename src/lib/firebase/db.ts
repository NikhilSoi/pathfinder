import { db } from './config';
import { collection, doc, setDoc, getDoc, updateDoc, query, where, getDocs } from 'firebase/firestore';

export interface Student {
  id: string; // Session/UUID
  name: string;
  archetype: string;
  startedAt: number;
}

export interface Progress {
  id: string; // generated
  studentId: string;
  archetype: string;
  stage: string;
  decisionIdx: number;
  consequenceTitle: string;
  funnelImpact: Record<string, string>;
  completedAt: number;
}

export const createStudent = async (student: Student) => {
  await setDoc(doc(db, 'students', student.id), student);
};

export const getStudent = async (id: string) => {
  const docRef = doc(db, 'students', id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? (docSnap.data() as Student) : null;
};

export const saveProgress = async (progress: Progress) => {
  await setDoc(doc(db, 'progress', progress.id), progress);
};

export const getProgress = async (studentId: string, archetype: string) => {
  const q = query(
    collection(db, 'progress'),
    where('studentId', '==', studentId),
    where('archetype', '==', archetype)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data() as Progress);
};
