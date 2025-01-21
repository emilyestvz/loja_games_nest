import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class Bcrypt{

    // Saltos significa qts vezes o algoritmo vai ser aplicado sobre a string que quero criptografar
    async encryptPassword(password: string): Promise<string> {

        let jumps: number = 10;
        return await bcrypt.hash(password, jumps)

    }

    // Comparação de senhas digitada com a senha criptografada no bd
    async comparePasswords(passwordEntered: string, passwordBank: string): Promise<boolean> {
        return await bcrypt.compare(passwordEntered, passwordBank);
    }

}