import { Body, Controller, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Movie } from "src/entities/movie.entity";
import { AddMovieDto } from "src/dtos/movie/add.movie.dto";
import { MovieService } from "src/services/movie/movie.service";
import { EditMovieDto } from "src/dtos/movie/edit.movie.dto";
import { AllowToRoles } from "src/misc/allow.to.roles.descriptor";
import { RoleCheckerGuard } from "src/misc/role.checker.guard";

@Controller('api/movie')
@Crud({
    model: {
        type: Movie
    },
    params: {
        id: {
            field: 'movieId',
            type: 'number',
            primary: true
        }
    },
    query: {
        join: {
            moviePrices: {
                eager: false
            },
            comments: {
                eager: false
            },
        }
    },
    // sklanjamo edit mogucnosti preko crud-a
    routes: {
        exclude: [ 'updateOneBase', 'replaceOneBase', 'deleteOneBase' ],
    }
})
export class MovieController {
    constructor(public service: MovieService) {}


    @Post('createFull') // api/movie/createFull
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles('administrator')
    createFullMovie(@Body() data: AddMovieDto) {
        return this.service.createFullMovie(data);
    }

    @Patch(':id') // 'api/movie/2
    @UseGuards(RoleCheckerGuard)
    @AllowToRoles('administrator')
    editFullMovie(@Param('id') id: number, @Body() data: EditMovieDto) {
        return this.service.editFullMovie(id, data);
    }
}