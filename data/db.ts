import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
} from 'firebase/firestore';
import { db } from '@/firebase-config';
import { Project } from '@/lib/types';

export async function createProject(
  userId: string,
  project: Omit<Project, 'id'>
) {
  if (!userId || userId === '') {
    throw new Error('User is invalid');
  }

  const projectRef = collection(db, 'projects');
  const docRef = await addDoc(projectRef, { ...project, userId });
  return docRef.id;
}

export async function updateProject(userId: string, project: Project) {
  if (!userId || userId === '') {
    throw new Error('User is invalid');
  }

  const docRef = doc(db, 'projects', project.id);
  await updateDoc(docRef, { ...project, userId });
  return project.id;
}

export async function getProjectById(userId: string, id: string) {
  if (!userId || userId === '') {
    throw new Error('User is invalid');
  }

  const ref = doc(db, 'projects', id);
  const projectSnapshot = await getDoc(ref);

  if (projectSnapshot.exists() && projectSnapshot.data().userId === userId) {
    const project = { id, ...projectSnapshot.data() } as Project;
    return project;
  } else {
    throw new Error('No such project exists');
  }
}

export async function getAllProjects(userId: string) {
  if (!userId || userId === '') {
    throw new Error('User is invalid');
  }

  const projectsRef = collection(db, 'projects');
  const projectsQuery = query(projectsRef, where('userId', '==', userId));
  const querySnapshot = await getDocs(projectsQuery);

  const projects: Project[] = [];
  querySnapshot.forEach((doc) => {
    projects.push({ id: doc.id, ...doc.data() } as Project);
  });
  return projects;
}
