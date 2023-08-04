import { Args, Query, Resolver } from '@nestjs/graphql';
import { Link } from './link.model';
import { LinksService } from './links.service';
import { GetLinksArgs } from './dto/args/get-link-args.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';

@Resolver(() => Link)
export class LinksResolver {
    constructor(
        private readonly linkService: LinksService,
    ) {}

    @UseGuards(GqlAuthGuard)
    @Query(() => [Link], {name: 'links'})
    async getLinks(@Args() getLinksArgs: GetLinksArgs){
        return this.linkService.getLinks(getLinksArgs);
    }
}
