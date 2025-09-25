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

  findAll() {
    this.httpService.executeRequest(
      'Loading decrees',
      this.http.get<Note[]>(`${environment.apiUrl}/notes`),
      (notes) => this.notes.set(notes)
    );
  }

  findById(id: number): void {
    this.httpService.executeRequest(
      'Finding decree',
      this.http.get<Note>(`${environment.apiUrl}/notes/${id}`),
      (note) => {
        this.note.set(note);
      }
    );
  }

  create(note: Note, onSuccess?: () => void): void {
    this.httpService.executeRequest(
      'Creating decree',
      this.http.post<Note>(`${environment.apiUrl}/notes`, note),
      (createdNote) => {
        const updatedNotes = [...this.notes(), createdNote];
        this.notes.set(this.sortNotesByPriorityAndDate(updatedNotes));

        this.httpService.showSuccess(
          'Decree created',
          'Your decree has been created successfully.'
        );

        if (onSuccess) {
          onSuccess();
        }
      }
    );
  }

  update(id: number, note: Note, onSuccess?: () => void): void {
    this.httpService.executeRequest(
      'Updating decree',
      this.http.patch<Note>(`${environment.apiUrl}/notes/${id}`, note),
      (updatedNote) => {
        const updatedNotes = this.notes().map((n) => (n.id === id ? updatedNote : n));
        this.notes.set(this.sortNotesByPriorityAndDate(updatedNotes));

        this.httpService.showSuccess(
          'Decree updated',
          'Your decree has been updated successfully.'
        );

        if (onSuccess) {
          onSuccess();
        }
      }
    );
  }

  delete(id: number): void {
    this.httpService.executeRequest(
      'Deleting decree',
      this.http.delete<Note>(`${environment.apiUrl}/notes/${id}`),
      () => {
        this.notes.set(this.notes().filter((n) => n.id !== id));

        this.httpService.showSuccess(
          'Decree deleted',
          'Your decree has been deleted successfully.'
        );
      }
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

  private sortNotesByPriorityAndDate(notes: Note[]): Note[] {
    return notes.sort((a, b) => {
      if (a.priority !== b.priority) {
        return b.priority - a.priority;
      }

      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  }
}
