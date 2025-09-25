import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Note } from '../interfaces/notes';
import { HttpService } from '../../utils/http.service';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private http: HttpClient = inject(HttpClient);
  private httpService: HttpService = inject(HttpService);

  notes = signal<Note[]>([]);
  note = signal<Note | null>(null);

  get loading() {
    return this.httpService.loading;
  }

  get error() {
    return this.httpService.error;
  }

  findAll(): void {
    this.httpService.executeRequest(
      'loading notes',
      this.http.get<Note[]>(`${environment.apiUrl}/notes`),
      (notes) => this.notes.set(notes)
    );
  }

  findById(id: number): void {
    this.httpService.executeRequest(
      'finding note',
      this.http.get<Note>(`${environment.apiUrl}/notes/${id}`),
      (note) => this.note.set(note)
    );
  }

  create(note: Note): void {
    this.httpService.executeRequest(
      'creating note',
      this.http.post<Note>(`${environment.apiUrl}/notes`, note),
      (createdNote) => this.notes.set([...this.notes(), createdNote])
    );
  }

  update(id: number, note: Note): void {
    this.httpService.executeRequest(
      'updating note',
      this.http.put<Note>(`${environment.apiUrl}/notes/${id}`, note),
      (updatedNote) => this.notes.set(this.notes().map((n) => (n.id === id ? updatedNote : n)))
    );
  }

  delete(id: number): void {
    this.httpService.executeRequest(
      'deleting note',
      this.http.delete<Note>(`${environment.apiUrl}/notes/${id}`),
      () => this.notes.set(this.notes().filter((n) => n.id !== id))
    );
  }

  clearNote(): void {
    this.note.set(null);
    this.httpService.reset();
  }

  clearNotes(): void {
    this.notes.set([]);
    this.httpService.reset();
  }

  clearError(): void {
    this.httpService.clearError();
  }
}
