import jwt from "jsonwebtoken";
import { iLogin } from "../../interfaces/login.intefaces";
import { userRepository } from "../../repositories/userRepository";

export const loginService = async (data: iLogin)  => {
    const { email } = data;
    const user = await userRepository.findOneBy({ email: email });

    const token = jwt.sign(
        {
            type: user?.type
        },
        process.env.SECRET_KEY!,
        { expiresIn: "24h", subject: user?.id}
    );

    return {token: token};
}