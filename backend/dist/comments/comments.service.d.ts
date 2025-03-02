import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { Ticket } from 'src/tickets/entities/ticket.entity';
export declare class CommentsService {
    private readonly userRepository;
    private readonly ticketRepository;
    constructor(userRepository: Repository<User>, ticketRepository: Repository<Ticket>);
    create(createCommentDto: CreateCommentDto, tokenPayload: TokenPayloadDto): Promise<{
        userId: `${string}-${string}-${string}-${string}-${string}`;
        ticketId: import("crypto").UUID;
        message: string;
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCommentDto: UpdateCommentDto): string;
    remove(id: number): string;
}
