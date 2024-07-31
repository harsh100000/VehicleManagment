// src/app/models/advisors-response.model.ts
export interface Advisor {
  id: string;
  name: string;
  // Add other properties if needed
}

export interface AdvisorsResponse {
  $id: string;
  $values: Advisor[];
}
