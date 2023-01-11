import { listMusiciansService } from "../../services/user/listMusicians.service";

export const listMusiciansController = async () => {
  const data = await listMusiciansService();

  return data;
};
