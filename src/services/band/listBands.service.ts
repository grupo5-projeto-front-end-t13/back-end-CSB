import { AppDataSource } from "../../data-source"
import User from "../../entities/user.entity"
import { listUserBands } from "../../serializers/user/user.serializers"

export const listBandsService = async () => {
    const bandRepository = AppDataSource.getRepository(User)

    const bands = await bandRepository.find({
    
        relations:{
            skills:true
        },
        where:{
            type:"Band",
            // skills:{
            //     name:"Guitarrista"
            // } Deixei aqui por questões de aprendizado.
        }
    })

    const bandResponse = await listUserBands.validate(bands,{stripUnknown:true})

    return bandResponse
}