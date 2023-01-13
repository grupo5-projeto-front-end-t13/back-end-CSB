import { iLogin } from "../../../interfaces/login.intefaces";
import { iUserRequest } from "../../../interfaces/user.interfaces";

export const mockedUserAdmRequest: iUserRequest = {
  name: "bruno",
  email: "bruno@gmail.com",
  password: "123456",
  skills: {
    id: "4e99808c-c06d-4109-9b95-1a2fef3f8ea7",
  },
  type: "band",
  isAdm: true,
};

export const mockedUserNotAdmRequest: iUserRequest = {
  name: "bruno2",
  email: "bruno2@gmail.com",
  password: "123456",
  skills: {
    id: "4e99808c-c06d-4109-9b95-1a2fef3f8ea7",
  },
  type: "band",
};

export const mockedUserInvalidBodyRequest: Omit<
  iUserRequest,
  "password" | "email"
> = {
  name: "bruno",
  skills: {
    id: "ddb450d2-60e4-4508-92b6-6baa4f4d3858",
  },
  type: "band",
  isAdm: false,
};

export const mockedUserInvalidBodyResponse = {
  message: ["email is a required field", "password is a required field"],
};

export const mockedUserUniqueEmailResponse = {
  message: "User already exists",
};

export const mockedLoginAdmRequest: Omit<
  iUserRequest,
  "name" | "skills" | "type" | "isAdm"
> = {
  email: "bruno@gmail.com",
  password: "123456",
};

export const mockedLoginNotAdmRequest: Omit<
  iUserRequest,
  "name" | "skills" | "type" | "isAdm"
> = {
  email: "bruno2@gmail.com",
  password: "123456",
};

export const mockedMusician1: iUserRequest = {
  name: "Mario K.",
  email: "mario@mail.com",
  password: "SuperSafe123",
  type: "musician",
  skills: {
    id: "123791287391827",
  },
};

export const mockedBand1: iUserRequest = {
  name: "Larissa L.",
  email: "larissa@mail.com",
  password: "SuperSafe123",
  type: "band",
  skills: {
    id: "123791287391827",
  },
};

export const mockedBand1Login: iLogin = {
  email: "larissa@mail.com",
  password: "SuperSafe123"
}