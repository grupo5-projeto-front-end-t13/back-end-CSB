import { listMusiciansService } from "../../services/user/listMusicians.controller";

export const listMusiciansController = async () => {
  const data = await listMusiciansService();

  return data;
};
