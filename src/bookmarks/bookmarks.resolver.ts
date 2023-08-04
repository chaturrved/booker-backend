import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Bookmark } from './models/bookmark.model';
import { BookmarksService } from './bookmarks.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CreateBookmarkInput } from './dto/input/create-bookmark-input.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/users/models/user.model';
import { getBookmarkArgs } from './dto/args/get-bookmark-args.dto';
import { UpdateBookmarkInput } from './dto/input/update-bookmark-input.dto';

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
    @Mutation(() => Bookmark)
    async updateBookmark(
        @Args('updateBookmarkData') updateBookmarkData: UpdateBookmarkInput,
        @CurrentUser() user: User,
    ) {
        return this.bookmarkService.updateBookmark(updateBookmarkData, user._id);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [Bookmark], {name: 'bookmarks'})
    async getBookmarks(
        @CurrentUser() user: User
    ){
        return this.bookmarkService.getBookmarks(user._id);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => Bookmark, { name: "bookmark"} )
    async getBookmark(
        @Args() getBookmarkArgs: getBookmarkArgs,
        @CurrentUser() user: User,
    ){
        return this.bookmarkService.getBookmark(getBookmarkArgs, user._id);
    }
}
