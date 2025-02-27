import * as bcrypt from 'bcrypt'


export function checkPasswordConfirm(password: string, passwordConfirm: string): boolean {
    return password === passwordConfirm ? true : false
}

export async function comparePassword(password: string, hasedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hasedPassword)
}

export async function encryptPassword(plainTextPassword: string): Promise<string> {
    const salt = await bcrypt.genSalt()
    const hasedPassword = await bcrypt.hash(plainTextPassword, salt)

    return hasedPassword
}