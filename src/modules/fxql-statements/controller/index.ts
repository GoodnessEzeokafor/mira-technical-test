import { Body, Controller, Post, Res } from "@nestjs/common";
import { Response } from 'express'
import { FxQlDto } from "../dto";
import { IFxQl } from "../type";
import { FxQlServices } from "../fxql.service";

@Controller('fxql-statements')
export class FxQlController {
    constructor(private readonly service: FxQlServices) { }

    @Post()
    async fxqlStatements(
        @Body() body: FxQlDto,
        @Res() res: Response,
    ) {
        const payload: IFxQl = { ...body }
        const response = await this.service.fxqlStatements(payload);
        return res.status(response.status).json(response);
    }

}