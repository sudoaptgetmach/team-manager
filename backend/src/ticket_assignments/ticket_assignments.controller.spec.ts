import { Test, TestingModule } from '@nestjs/testing';
import { TicketAssignmentsController } from './ticket_assignments.controller';
import { TicketAssignmentsService } from './ticket_assignments.service';

describe('TicketAssignmentsController', () => {
  let controller: TicketAssignmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketAssignmentsController],
      providers: [TicketAssignmentsService],
    }).compile();

    controller = module.get<TicketAssignmentsController>(TicketAssignmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
