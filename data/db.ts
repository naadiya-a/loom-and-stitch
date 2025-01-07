import { collection, doc, addDoc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase-config';
import { Project, ProjectType } from '@/lib/types';

export async function createProject(project: Omit<Project, 'id'>) {
  try {
    const projectRef = collection(db, 'projects');
    const docRef = await addDoc(projectRef, project);
    console.log('Project added with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding project:', error);
    throw error;
  }
}

export async function updateProject(project: Project) {
  const docRef = doc(db, "projects", project.id);
  await updateDoc(docRef, project);
  console.log("Document updated");
}

export async function getProjectById(id: string) {
  try {
    const ref = doc(db, 'projects', id);
    const projectSnapshot = await getDoc(ref);

    if (projectSnapshot.exists()) {
      const project = { id, ...projectSnapshot.data() } as Project;
      console.log('Retrieved project:', project);
      return project;
    } else {
      console.log('No such project exists!');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving project:', error);
    throw error;
  }
}

// TODO
export async function getAllProjects() {
  // try {
  //   const projectsRef = collection(db, 'projects');
  //   const querySnapshot = await getDocs(projectsRef);

  //   const projects: Project[] = [];
  //   querySnapshot.forEach((doc) => {
  //     projects.push({ id: doc.id, ...doc.data() } as Project);
  //   });

  //   console.log('Retrieved all projects:', projects);
  //   return projects;
  // } catch (error) {
  //   console.error('Error retrieving all projects:', error);
  //   throw error;
  // }

  return [
    {
      id: '1',
      name: 'Socks',
      type: ProjectType.Crochet,
      hooks: '4mm',
      yarn: 'Wool',
      notes: '',
      counters: [{id: '1', name: 'Heel', value: 2}]
    },
    {
      id: '2',
      name: 'Sweater',
      type: ProjectType.Knit,
      hooks: '5mm',
      yarn: 'Cotton',
      notes: 'size small',
      counters: [],
    },
  ];
}
