import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Note } from '../interfaces/notes';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private http: HttpClient = inject(HttpClient);
  notes = signal<Note[]>([]);
  notesLoading = signal<boolean>(true);

  constructor() {
    this.findAllNotes();
  }

  findAllNotes(): void {
    this.http.get<Note[]>(`${environment.apiUrl}/notes`).subscribe((notes) => {
      this.notes.set(notes);
      this.notesLoading.set(false);
    });
  }
}
