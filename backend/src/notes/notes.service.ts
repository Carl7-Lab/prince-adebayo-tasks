import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateNoteDto, UpdateNoteDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Note, Prisma } from '@prisma/client';
import { nigeriaHolidays } from '../../prisma/holidays';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateNoteDto): Promise<Note> {
    this.validateInauspiciousDate(dto.date);
    this.validateHolidayDate(dto.date);

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
    if (dto.date) {
      this.validateInauspiciousDate(dto.date);
      this.validateHolidayDate(dto.date);
    }

    const updateData: Prisma.NoteUpdateInput = { ...dto };
    if (dto.date) {
      updateData.date = new Date(dto.date);
    }

    return await this.prisma.note.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: number): Promise<Note> {
    return await this.prisma.note.delete({
      where: { id },
    });
  }

  private validateHolidayDate(dateString: string): void {
    const inputDate = new Date(dateString);

    const normalizedInputDate = new Date(
      inputDate.getFullYear(),
      inputDate.getMonth(),
      inputDate.getDate(),
    );

    const holiday = nigeriaHolidays.find((holiday) => {
      const normalizedHolidayDate = new Date(
        holiday.date.getFullYear(),
        holiday.date.getMonth(),
        holiday.date.getDate(),
      );

      return normalizedHolidayDate.getTime() === normalizedInputDate.getTime();
    });

    if (holiday) {
      throw new BadRequestException(
        `The date "${dateString}" is a Nigerian national holiday (${holiday.name}). Notes cannot be scheduled on days of celebration.`,
      );
    }
  }

  private validateInauspiciousDate(dateString: string): void {
    const digitSum = this.calculateDigitSum(dateString);

    if (this.isPrime(digitSum)) {
      throw new BadRequestException(
        `The date "${dateString}" is inauspicious. The sum of its digits (${digitSum}) is a prime number, which brings bad luck according to the Royal Numerologist.`,
      );
    }
  }

  private calculateDigitSum(dateString: string): number {
    return dateString
      .replace(/[^0-9]/g, '')
      .split('')
      .reduce((sum, digit) => sum + parseInt(digit, 10), 0);
  }

  private isPrime(num: number): boolean {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;

    for (let i = 3; i <= Math.sqrt(num); i += 2) {
      if (num % i === 0) return false;
    }

    return true;
  }
}
