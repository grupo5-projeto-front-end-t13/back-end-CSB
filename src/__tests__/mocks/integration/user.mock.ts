import { iUserRequest } from "../../../interfaces/user.interfaces";

export const mockedUserAdmRequest: iUserRequest = {
  name: "bruno",
  email: "bruno@gmail.com",
  password: "123456",
  skills: {
    id: "ddb450d2-60e4-4508-92b6-6baa4f4d3858"
  },
  type: "band",
  isAdm: true
}

export const mockedUserNotAdmRequest: iUserRequest = {
  name: "bruno2",
  email: "bruno2@gmail.com",
  password: "123456",
  skills: {
    id: "ddb450d2-60e4-4508-92b6-6baa4f4d3858"
  },
  type: "band",
  isAdm: false
}

export const mockedUserInvalidBodyRequest: Omit<iUserRequest, "password" | "email"> = {
  name: "bruno",
  skills: {
    id: "ddb450d2-60e4-4508-92b6-6baa4f4d3858"
  },
  type: "band",
  isAdm: false
}

export const mockedUserInvalidBodyResponse = {
  message: ["email is a required field", "password is a required field" ]
}

export const mockedUserUniqueEmailResponse = {
  message: "User already exists"
}

export const mockedLoginAdmRequest: Omit<iUserRequest, "name" | "skills" | "type" | "isAdm"> = {
  email: "bruno@gmail.com",
  password: "123456",
}

export const mockedLoginNotAdmRequest: Omit<iUserRequest, "name" | "skills" | "type" | "isAdm"> = {
  email: "bruno2@gmail.com",
  password: "123456",
}




