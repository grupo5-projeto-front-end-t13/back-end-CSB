export const deleteService = async(id: String) => {
  const user = await userRepository.findOneBy({id})
  return await userRepository.softRemove(user)
}