import { iInviteRequest } from "../../interfaces/invites.interfaces"
import { inviteRepository } from "../../repositories/inviteRepository"
import { returnInviteSerializer } from "../../serializers/invite/invite.serializers"


export const userCreateInviteService = async(body: iInviteRequest) =>{
  const newInvite = inviteRepository.create({userIdReceive: body.userIdReceive, userIdSend: body.userIdSend})
  await inviteRepository.save(newInvite)
  const returnNewInvite = await returnInviteSerializer.validate(newInvite, {stripUnknown: true})
  return returnNewInvite
}
