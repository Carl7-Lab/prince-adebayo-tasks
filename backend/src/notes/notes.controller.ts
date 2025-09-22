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
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { NoteEntity } from './entities/note.entity';

@Controller('notes')
@ApiTags('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiCreatedResponse({ type: NoteEntity })
  async create(@Body() dto: CreateNoteDto): Promise<NoteEntity> {
    return new NoteEntity(await this.notesService.create(dto));
  }

  @Get()
  @ApiOkResponse({ type: NoteEntity, isArray: true })
  async findAll(): Promise<NoteEntity[]> {
    return (await this.notesService.findAll()).map(
      (note) => new NoteEntity(note),
    );
  }

  @Get(':id')
  @ApiOkResponse({ type: NoteEntity })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<NoteEntity> {
    return new NoteEntity(await this.notesService.findOne(id));
  }

  @Patch(':id')
  @ApiOkResponse({ type: NoteEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateNoteDto,
  ): Promise<NoteEntity> {
    return new NoteEntity(await this.notesService.update(id, dto));
  }

  @Delete(':id')
  @ApiOkResponse({ type: NoteEntity })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<NoteEntity> {
    return new NoteEntity(await this.notesService.remove(id));
  }
}
