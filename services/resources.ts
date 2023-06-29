import { useEffect, useState } from "react";
import { Resource } from "@/utils/types";

export function useResourceData() {
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    fetch('https://recursos-squad12.onrender.com/recursos')
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((data) => {
        try {
          setResources(data);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      });
  }, []);

  return resources;
}