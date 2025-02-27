import { Injectable, ForbiddenException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from '../../modules/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private usersService: UsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secretKey'
        })
    }

    async validate(payload: any) {
        try{
            const { sub } = payload
            const user = await this.usersService.findUserByEmail(sub)
            const { password, ...rest } = user
            return rest
        }
        catch(err) {
            throw new ForbiddenException('알 수 없는 에러 발생')
        }
    }
}