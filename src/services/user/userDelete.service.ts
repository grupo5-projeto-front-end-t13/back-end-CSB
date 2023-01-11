export const deleteService = async(id: String): Promise<void> => {
  const user = await userRepository.findOneBy({id})
  return await userRepository.remove(user)
}