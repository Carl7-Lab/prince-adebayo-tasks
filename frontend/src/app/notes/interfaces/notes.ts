export interface Note {
  id: number;
  title: string;
  content: string;
  date: Date;
  priority: number;
}

export interface NoteDto {
  id: number | null;
  title: string;
  content: string;
  date: Date;
  priority: number;
}
