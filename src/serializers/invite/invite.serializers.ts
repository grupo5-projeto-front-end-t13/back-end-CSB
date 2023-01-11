import * as yup from 'yup'
import { iInviteRequest, iInviteResponse } from '../../interfaces/invites.interfaces'

export const returnInviteSerializer: yup.SchemaOf<iInviteResponse> = yup.object().shape({
  id: yup.string().uuid().required(),
  userIdReceive: yup.object().shape({
    id: yup.string().uuid().required(),
  }),
  userIdSend: yup.object().shape({
    id: yup.string().uuid().required(),
  }),
  // userIdReceive: yup.string().uuid().required(),
  // userIdSend:  yup.string().uuid().required(),
  createdAt: yup.date().required()
})

export const createInviteSerializer: yup.SchemaOf<iInviteRequest> = yup.object().shape({
  userIdReceive: yup.object().shape({
    id: yup.string().uuid().required(),
  }),
  userIdSend: yup.object().shape({
    id: yup.string().uuid().required(),
  }),
})