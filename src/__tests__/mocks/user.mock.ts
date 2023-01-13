import { iUserRequest } from "../../interfaces/user.interfaces";

export const mockedMusician1: iUserRequest = {
  name: "Mario K.",
  email: "mario@mail.com",
  password: "SuperSafe123",
  type: "musician",
  skills: {
    id: "123791287391827",
  },
};

export const mockedMusician2: iUserRequest = {
  name: "Lima M.",
  email: "lima@mail.com",
  password: "SuperSafe123",
  type: "musician",
  skills: {
    id: "9877858176254351",
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

export const mockedBand2: iUserRequest = {
  name: "Roberto A.",
  email: "roberto@mail.com",
  password: "SuperSafe123",
  type: "band",
  skills: {
    id: "123791287391827",
  },
};

export const mockedAdmin: iUserRequest = {
  name: "Alex D.",
  email: "alex@mail.com",
  password: "SuperSafe123",
  type: "band",
  skills: {
    id: "123791287391827",
  },
  isAdm: true,
};

export const difUser: iUserRequest = {
  name: "Miro A.",
  email: "miro.com",
  password: "",
  type: "",
  skills: {},
  isAdm: true,
};
