import { AppDataSource } from "../../data-source"
import Band from "../../entities/band.entity"

export const bandListIdService = async (bandId:string) => {

    const bandRepo =  AppDataSource.getRepository(Band)

    const band = await bandRepo.findOneBy({id:bandId})

    return band
}