import { collection, doc, addDoc, getDoc, getDocs } from "firebase/firestore";
import { db } from '@/firebase-config'
import { Project } from "@/lib/types";

export async function createProject(project: Project) {
    try {
      const projectRef = collection(db, "projects");
      const docRef = await addDoc(projectRef, {
        name: project.name,
        type: project.type,
        hooks: project.hooks,
        yarn: project.yarn,
        notes: project.notes,
      });
      console.log("Project added with ID:", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Error adding project:", error);
      throw error;
    }
  }

  export async function getProjectById(id: string) {
    try {
      const ref = doc(db, "projects", id);
      const projectSnapshot = await getDoc(ref);
  
      if (projectSnapshot.exists()) {
        const project = { id, ...projectSnapshot.data() } as Project;
        console.log("Retrieved project:", project);
        return project;
      } else {
        console.log("No such project exists!");
        return null;
      }
    } catch (error) {
      console.error("Error retrieving project:", error);
      throw error;
    }
  }

  export async function getAllProjects() {
    try {
      const projectsRef = collection(db, "projects");
      const querySnapshot = await getDocs(projectsRef);
  
      const projects: Project[] = [];
      querySnapshot.forEach((doc) => {
        projects.push({ id: doc.id, ...doc.data() } as Project);
      });
  
      console.log("Retrieved all projects:", projects);
      return projects;
    } catch (error) {
      console.error("Error retrieving all projects:", error);
      throw error;
    }
  }