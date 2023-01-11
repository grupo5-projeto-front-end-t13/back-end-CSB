import User from "../../entities/user.entity"
import { AppError } from "../../errors/errors"
import { userRepository } from "../../repositories/userRepository"

export const deleteService = async(id: string): Promise<User> => {
  const user = await userRepository.findOneBy({id: id})
  if(!user){
    throw new AppError(404, 'user not found')
  } 
  return await userRepository.remove(user)
}