import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto, UpdateNoteDto } from './dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { NoteEntity } from './entities/note.entity';

@Controller('notes')
@ApiTags('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a note',
    description:
      'Create a new note with the given title, content, date, and priority, date must be a valid date and priority must be between 1 and 5',
  })
  @ApiCreatedResponse({ type: NoteEntity })
  async create(@Body() dto: CreateNoteDto): Promise<NoteEntity> {
    return new NoteEntity(await this.notesService.create(dto));
  }

  @Get()
  @ApiOperation({
    summary: 'Get all notes',
    description: 'Get all notes',
  })
  @ApiOkResponse({ type: NoteEntity, isArray: true })
  async findAll(): Promise<NoteEntity[]> {
    return (await this.notesService.findAll()).map(
      (note) => new NoteEntity(note),
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a note by id',
    description: 'Get a note by id',
  })
  @ApiOkResponse({ type: NoteEntity })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<NoteEntity> {
    return new NoteEntity(await this.notesService.findOne(id));
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a note by id',
    description:
      'Update a note by id with the given title, content, date, and priority, date must be a valid date and priority must be between 1 and 5',
  })
  @ApiOkResponse({ type: NoteEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateNoteDto,
  ): Promise<NoteEntity> {
    return new NoteEntity(await this.notesService.update(id, dto));
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a note by id',
    description: 'Delete a note by id',
  })
  @ApiOkResponse({ type: NoteEntity })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<NoteEntity> {
    return new NoteEntity(await this.notesService.remove(id));
  }

  @Post('reset')
  @ApiOperation({
    summary: 'Reset all notes (Great Reset)',
    description:
      'Deletes all notes. If current minute is prime, also optimizes database indexes.',
  })
  @ApiResponse({
    status: 200,
    description: 'Reset operation completed successfully',
  })
  async resetNotes(): Promise<{
    status: string;
    action: string;
    message: string;
  }> {
    return this.notesService.resetNotes();
  }
}
