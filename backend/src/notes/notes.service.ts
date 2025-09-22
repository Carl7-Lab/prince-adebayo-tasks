import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto, UpdateNoteDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Note, Prisma } from '@prisma/client';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateNoteDto): Promise<Note> {
    return await this.prisma.note.create({
      data: {
        ...dto,
        date: new Date(dto.date),
      },
    });
  }

  async findAll(): Promise<Note[]> {
    return await this.prisma.note.findMany({
      orderBy: [{ priority: 'desc' }, { date: 'desc' }],
    });
  }

  async findOne(id: number): Promise<Note> {
    const note = await this.prisma.note.findUnique({
      where: {
        id,
      },
    });

    if (!note) {
      throw new NotFoundException(`Note with id "${id}" not found`);
    }

    return note;
  }

  async update(id: number, dto: UpdateNoteDto): Promise<Note> {
    try {
      const updateData: any = { ...dto };
      if (dto.date) {
        updateData.date = new Date(dto.date);
      }

      return await this.prisma.note.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      throw this.handlePrismaNotFoundError(
        error as Prisma.PrismaClientKnownRequestError,
        id,
        'update',
      );
    }
  }

  async remove(id: number): Promise<Note> {
    try {
      return await this.prisma.note.delete({
        where: { id },
      });
    } catch (error) {
      throw this.handlePrismaNotFoundError(
        error as Prisma.PrismaClientKnownRequestError,
        id,
        'delete',
      );
    }
  }

  private handlePrismaNotFoundError(
    error: Prisma.PrismaClientKnownRequestError,
    id: number,
    operation: string,
  ): NotFoundException | Error {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      return new NotFoundException(
        `Note with id "${id}" not found or you don't have permission to ${operation} it`,
      );
    }
    return error;
  }
}
