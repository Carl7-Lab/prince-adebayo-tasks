import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsInt,
  Min,
  Max,
  IsDateString,
} from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(100)
  @ApiProperty({
    description: 'The title of the note',
    example: 'My first note',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(250)
  @ApiProperty({
    description: 'The content of the note',
    example: 'This is the content of my first note',
  })
  content: string;

  @IsDateString()
  @ApiProperty({
    description: 'The date of the note',
    example: '2025-01-02T00:00:00.000Z',
  })
  date: string;

  @IsInt()
  @Min(1)
  @Max(5)
  @ApiProperty({
    description: 'The priority of the note (1-5)',
    example: 3,
  })
  priority: number;
}
