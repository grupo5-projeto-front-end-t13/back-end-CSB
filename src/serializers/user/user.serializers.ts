import * as yup from 'yup'
import { iUserRequest, iUserResponse, iUserUpdateRequest } from '../../interfaces/user.interfaces';
import { returnInviteSerializer } from "../invite/invite.serializers";


export const createUserSerializer: yup.SchemaOf<iUserRequest> = yup.object().shape({
  name:  yup.string().required(),
  email: yup.string().email().required(),
  password:  yup.string().required(),
  skill: yup.object().shape({
    id: yup.string().uuid().required(),
    name:  yup.string().required(),
  })
})

export const createUserResponseSerializer: yup.SchemaOf<iUserResponse> =  yup.object().shape({
  id: yup.string().uuid().required(),
  email: yup.string().email().required(),
  type: yup.string().required(),
  username: yup.string().notRequired(),
  name:  yup.string().required(),
  bio: yup.string().required(),
  genre: yup.string().notRequired(),
  image: yup.string().required(),
  isAdm: yup.boolean().required(),
  social_media: yup.string().required(),
  state: yup.string().required(),
  createdAt: yup.date().required(),
  updatedAt: yup.date().required(),
  invites: yup.array(returnInviteSerializer),
  skill: yup.object().shape({
    id: yup.string().uuid().required(),
    name:  yup.string().required(),
  })
})

export const updateUserSerializer: yup.SchemaOf<iUserUpdateRequest> =  yup.object().shape({
  name:  yup.string().notRequired(),
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
})

