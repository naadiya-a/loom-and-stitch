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
import { db, storage } from '@/firebase-config';
import { Project } from '@/lib/types';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';

export async function createProject(
  userId: string,
  project: Omit<Project, 'id'>,
  imageFile?: File
) {
  if (!userId || userId === '') {
    throw new Error('User is invalid');
  }

  const projectRef = collection(db, 'projects');
  const docRef = await addDoc(projectRef, { ...project, userId });
  const projectId = docRef.id;

  if (imageFile) {
    const imageUrl = await uploadImageToStorage(userId, projectId, imageFile);
    await updateDoc(doc(db, 'projects', projectId), { imageUrl });
  }

  return projectId;
}

export async function updateProject(
  userId: string,
  project: Project,
  imageFile?: File
) {
  if (!userId || userId === '') {
    throw new Error('User is invalid');
  }

  const docRef = doc(db, 'projects', project.id);

  if (imageFile) {
    const existingProject = await getProjectById(userId, project.id);
    if (existingProject?.imageUrl) {
      await deleteImageFromStorage(existingProject.imageUrl);
    }
    project.imageUrl = await uploadImageToStorage(
      userId,
      project.id,
      imageFile
    );
  }

  await updateDoc(docRef, project);
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

async function uploadImageToStorage(
  userId: string,
  projectId: string,
  file: File
): Promise<string> {
  const storageRef = ref(storage, `projects/${userId}/${projectId}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}

async function deleteImageFromStorage(imageUrl: string): Promise<void> {
  const storageRef = ref(storage, imageUrl);
  await deleteObject(storageRef);
}
