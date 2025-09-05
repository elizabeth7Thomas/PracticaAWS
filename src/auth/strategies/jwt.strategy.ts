import { Injectable } from "@nestjs/common";
import { PassportSerializer, PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { emit } from "process";
import { ProductoController } from "src/producto/producto.controller";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'jwt-secret',
        });
    }

    async validate(payload: any){
        return { 
            userId: payload.sub,
             email: payload.email,
      rol: payload.rol};
    }
}