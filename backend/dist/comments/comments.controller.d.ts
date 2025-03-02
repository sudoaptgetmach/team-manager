import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    create(createCommentDto: CreateCommentDto, tokenPayload: TokenPayloadDto): Promise<{
        userId: `${string}-${string}-${string}-${string}-${string}`;
        ticketId: import("crypto").UUID;
        message: string;
    }>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCommentDto: UpdateCommentDto): string;
    remove(id: string): string;
}
