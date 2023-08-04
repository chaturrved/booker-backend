import { Injectable } from '@nestjs/common';
import { CreateBookmarkInput } from './dto/input/create-bookmark-input.dto';
import { BookmarksRepository } from './bookmarks.repository';
import { BookmarkDocument } from './models/bookmark.schema';

@Injectable()
export class BookmarksService {
    constructor(private readonly bookmarksRepository: BookmarksRepository) {}

    async createBookmark(createBookmarkData: CreateBookmarkInput, userId: string) {
        const bookmarkDocument = await this.bookmarksRepository.create({
            ...createBookmarkData,
            links: [],
            userId
        });
        return this.toModel(bookmarkDocument);
    }

    async getBookmarks(userId: string) {
        const bookmarkDocuments = await this.bookmarksRepository.find({ userId });
        return bookmarkDocuments.map((bookmark) => this.toModel(bookmark));
    }

    private toModel(bookmarkDocument: BookmarkDocument) {
        return {
            _id: bookmarkDocument._id.toHexString(),
            ...bookmarkDocument
        }
    }


}
