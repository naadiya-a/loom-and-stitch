import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/firebase-config';
import { Project } from '@/lib/types';

export async function createProject(project: Omit<Project, 'id'>) {
  const projectRef = collection(db, 'projects');
  const docRef = await addDoc(projectRef, project);
  return docRef.id;
}

export async function updateProject(project: Project) {
  const docRef = doc(db, 'projects', project.id);
  await updateDoc(docRef, project);
  return project.id;
}

export async function getProjectById(id: string) {
  const ref = doc(db, 'projects', id);
  const projectSnapshot = await getDoc(ref);

  if (projectSnapshot.exists()) {
    const project = { id, ...projectSnapshot.data() } as Project;
    return project;
  } else {
    console.log('No such project exists!');
    return null;
  }
}

export async function getAllProjects() {
  const projectsRef = collection(db, 'projects');
  const querySnapshot = await getDocs(projectsRef);

  const projects: Project[] = [];
  querySnapshot.forEach((doc) => {
    projects.push({ id: doc.id, ...doc.data() } as Project);
  });
  return projects;
}
