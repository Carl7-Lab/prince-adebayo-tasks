import { ApiProperty } from '@nestjs/swagger';
import { Note } from '@prisma/client';

export class NoteEntity implements Note {
  @ApiProperty({
    description: 'The id of the note',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The title of the note',
    example: 'My first note',
  })
  title: string;

  @ApiProperty({
    description: 'The content of the note',
    example: 'This is the content of my first note',
  })
  content: string;

  @ApiProperty({
    description: 'The date of the note',
    example: '2025-01-02T00:00:00.000Z',
  })
  date: Date;

  @ApiProperty({
    description: 'The priority of the note',
    example: 3,
  })
  priority: number;

  @ApiProperty({
    description: 'The date and time the note was created',
    example: '2025-01-02T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date and time the note was updated',
    example: '2025-01-02T00:00:00.000Z',
  })
  updatedAt: Date;

  constructor(data: Partial<NoteEntity>) {
    Object.assign(this, data);
  }
}
