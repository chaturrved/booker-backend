import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository } from "src/database/abstract.repository";
import { BookmarkDocument } from "./models/bookmark.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Bookmark } from "./models/bookmark.model";

@Injectable()
export class BookmarksRepository extends AbstractRepository<BookmarkDocument> {
    protected readonly logger = new Logger(BookmarksRepository.name);

    constructor(@InjectModel(Bookmark.name) bookmarkModel: Model<BookmarkDocument>) {
        super(bookmarkModel);
    }

    
}