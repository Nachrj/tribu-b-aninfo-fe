import { useEffect, useState } from "react";
import { BASE_URL } from "@/pages/constants";
import { Client } from "@/pages/types";

export function useClientData() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    fetch(`${BASE_URL}/v1/clients`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((data) => {
        try {
          const transformedData = data.map((item) => ({
            id: item.id,
            cuit: item.CUIT,
            social_reason: item["razon social"],
          }));
          setClients(transformedData);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      });
  }, []);

  return clients;
}
