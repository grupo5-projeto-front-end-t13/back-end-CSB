import { AppDataSource } from "../../data-source"
import User from "../../entities/user.entity"

export const listBandsService = async () => {
    const bandRepository = AppDataSource.getRepository(User)

    const bands = await bandRepository.findBy({
        type:"Band"
    })

    return bands
}