import { useEffect, useState } from "react";
import { SUPPORT_BASE_URL } from "@/constants/support";
import { Client } from "@/utils/types";

export function useClientData() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    fetch(`${SUPPORT_BASE_URL}/v1/clients`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((data) => {
        try {
          const transformedData = data.map((item : any) => ({
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
