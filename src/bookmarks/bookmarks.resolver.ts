import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Bookmark } from './models/bookmark.model';
import { BookmarksService } from './bookmarks.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CreateBookmarkInput } from './dto/input/create-bookmark-input.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/users/models/user.model';

@Resolver(() => Bookmark)
export class BookmarksResolver {
    constructor(private readonly bookmarkService: BookmarksService) {}

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Bookmark)
    async createBookmark(
        @Args('createBookmarkData') createBookmarkData: CreateBookmarkInput,
        @CurrentUser() user: User
    ) {
        return this.bookmarkService.createBookmark(createBookmarkData, user._id);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [Bookmark], {name: 'bookmarks'})
    async getBookmarks(
        @CurrentUser() user: User
    ){
        return this.bookmarkService.getBookmarks(user._id);
    }
}
