import { iUserRequest } from "../../../interfaces/user.interfaces";

export const mockedUserRequest: iUserRequest = {
  name: "bruno",
  email: "bruno@gmail.com",
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




