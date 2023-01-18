import * as yup from "yup";
import { iLogin } from "../../interfaces/login.intefaces";

export const loginSerializer: yup.SchemaOf<iLogin> = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
