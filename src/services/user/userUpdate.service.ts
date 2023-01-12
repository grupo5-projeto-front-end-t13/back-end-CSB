import { AppError } from "../../errors/errors";
import {iUserUpdateRequest, iUserCreateResponse} from "../../interfaces/user.interfaces";
import { skillRepository } from "../../repositories/skillRepository";
import { userRepository } from "../../repositories/userRepository";
import { createUserResponseSerializer } from "../../serializers/user/user.serializers";

export const userUpdateService = async (userData:iUserUpdateRequest,id:string):Promise<iUserCreateResponse>=>{
    const user = await userRepository.findOne({where:{id:id},relations:{skills:true}});

    if(!user){
        throw new AppError (404, 'User not found',);
    }

    const { skills, ...data } = userData;

    const findSkill =skills.id? await skillRepository.findOneBy({
      id: skills.id,
    }):user.skills;

    if(!findSkill){
        throw new AppError (404, 'Skill not found',);
    }

    await userRepository.save({...user,...data,skills:{id:findSkill.id}});

    const updatedUser = await userRepository.findOne({where:{id:user.id},relations:{skills:true}});

    return await createUserResponseSerializer.validate(updatedUser, {
        stripUnknown: true,
      });
}