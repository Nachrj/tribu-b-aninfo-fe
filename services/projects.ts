import { useEffect, useState } from "react";

interface Project {
  id: number;
  nombre: string;
  estado: string;
}

export function useProjectsData() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("https://aninfo-backend-proyectos.onrender.com/projects")
    .then((res) => {
        console.log("res", res)
        return res.json()
    })
    .then((data) => {
        console.log("Got projects: ", data)
        setProjects(data.map((project: any) => {
            return {
                id: project.id,
                nombre: project.name,
                estado: project.state,
            }
        }))
    })
  }, []);

  return projects;
}