import { AppDataSource } from "../../data-source"
import  Band  from "../../entities/band.entity"

export const bandUpdateIdService = async (payload:any,bandId:string) => {
    const bandRepo = AppDataSource.getRepository(Band)

    const band = await bandRepo.findOneBy({id: bandId})

    const updateBand = bandRepo.create({
        ...band,...payload
    })

    await bandRepo.save(updateBand)

    return updateBand
}