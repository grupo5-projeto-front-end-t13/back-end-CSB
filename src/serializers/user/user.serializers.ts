import * as yup from "yup";
import {
  iUserRequest,
  iUser,
  iUserUpdateRequest,
  iUserCreateResponse,
  iUserBand,
  iUserMusician,
} from "../../interfaces/user.interfaces";
import { returnInviteSerializer } from "../invite/invite.serializers";

export const createUserSerializer: yup.SchemaOf<iUserRequest> = yup
  .object()
  .shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    type: yup.string().required(),
    skills: yup.object().shape({
      id: yup.string().uuid().required(),
      name:yup.string().notRequired()
    }),
  });

export const userSerializer: yup.SchemaOf<iUser> = yup.object().shape({
  id: yup.string().uuid().required(),
  email: yup.string().email().required(),
  type: yup.string().required(),
  username: yup.string().notRequired(),
  name: yup.string().required(),
  bio: yup.string().required(),
  genre: yup.string().notRequired(),
  image: yup.string().required(),
  isAdm: yup.boolean().required(),
  social_media: yup.string().required(),
  state: yup.string().required(),
  createdAt: yup.date().required(),
  updatedAt: yup.date().required(),
  skills: yup.object().shape({
    id: yup.string().uuid().required(),
    name:yup.string().notRequired()
  }),
});

export const musicianSerializer: yup.SchemaOf<iUserMusician> = yup
  .object()
  .shape({
    id: yup.string().uuid().required(),
    email: yup.string().email().required(),
    username: yup.string().nullable(),
    name: yup.string().required(),
    bio: yup.string().nullable(),
    image: yup.string().nullable(),
    social_media: yup.string().nullable(),
    state: yup.string().nullable(),
    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
    skills: yup.object().shape({
      id: yup.string().uuid().required(),
      name: yup.string().notRequired(),
    }),
  });

export const listUserMusician = yup.array(musicianSerializer);

export const bandSerializer: yup.SchemaOf<iUserBand> = yup.object().shape({
  id: yup.string().uuid().required(),
  email: yup.string().email().required(),
  name: yup.string().required(),
  bio: yup.string().nullable(),
  genre: yup.string().nullable(),
  image: yup.string().nullable(),
  social_media: yup.string().nullable(),
  state: yup.string().nullable(),
  createdAt: yup.date().required(),
  updatedAt: yup.date().required(),
  skills: yup.object().shape({
    id: yup.string().uuid().required(),
  }),
});

export const listUserBands = yup.array(bandSerializer);

export const createUserResponseSerializer: yup.SchemaOf<iUserCreateResponse> =
  yup.object().shape({
    id: yup.string().uuid().notRequired(),
    name: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    type: yup.string().notRequired(),
    skills: yup.object().shape({
      id: yup.string().uuid().notRequired(),
      name:yup.string().notRequired()
    }),
    createdAt: yup.date().notRequired(),
    updatedAt: yup.date().notRequired(),
  });
export const updateUserSerializer: yup.SchemaOf<iUserUpdateRequest> = yup
  .object()
  .shape({
    name: yup.string().notRequired(),
    username: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    password: yup.string().notRequired(),
    bio: yup.string().notRequired(),
    state: yup.string().notRequired(),
    genre: yup.string().notRequired(),
    social_media: yup.string().notRequired(),
    image: yup.string().notRequired(),
    createdAt: yup.date().notRequired(),
    updatedAt: yup.date().notRequired(),
    invites: yup.array(returnInviteSerializer),
    skills: yup.object().shape({
      id: yup.string().uuid().notRequired(),
    }).notRequired(),
  });
