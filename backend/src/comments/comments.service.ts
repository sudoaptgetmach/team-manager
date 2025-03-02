import { Injectable, InternalServerErrorException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { UserRoles } from 'src/users/enum/user-roles.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { AuthTokenGuard } from 'src/auth/guards/auth-token.guard';

@Injectable()
@UseGuards(AuthTokenGuard)
export class CommentsService {
  constructor(@InjectRepository(User)
              private readonly userRepository: Repository<User>,
              @InjectRepository(Ticket)
              private readonly ticketRepository: Repository<Ticket>) {}

  async create(createCommentDto: CreateCommentDto, tokenPayload: TokenPayloadDto) {
        const sender = await this.userRepository.findOneBy( { id: tokenPayload.sub });
    
        if (!sender) {
            throw new InternalServerErrorException(`Unable to find sender.`);
        }
    
        if (sender.role !== UserRoles.ADMIN) {
          throw new UnauthorizedException();
        }

        const ticket = await this.ticketRepository.findOneBy( { id: createCommentDto.ticketId } );

        // Verifica se o departamento do ticket enviado e do sender é o mesmo (e se ele não é administrador)
        if (ticket?.department !== sender.department && sender.role !== UserRoles.ADMIN) {
          throw new UnauthorizedException('Você não pode criar um comentário num ticket que não é do seu departamento.');
        }

        const newMessage = {
          ...createCommentDto,
          userId: sender.id,
        };

        return newMessage;
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
