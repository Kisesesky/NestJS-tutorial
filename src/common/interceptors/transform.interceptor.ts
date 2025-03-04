import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class TransformInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const time = new Date();
        return next
        .handle()
        .pipe(
            map((data)=> ({
                ...data,
                success: true,
                time: new Date().getTime() - time.getTime()
                
            }))
        )
    }
}