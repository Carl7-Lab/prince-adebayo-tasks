import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

export interface HttpError {
  message: string;
  status: number;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  loading = signal<boolean>(false);
  error = signal<HttpError | null>(null);

  private handleHttpError(operation: string, error: HttpErrorResponse): Observable<null> {
    console.error(`❌ HTTP Error in ${operation}:`, error);

    let errorMessage = `Error ${operation}`;

    if (error.status === 0) {
      errorMessage = 'Connection error - Server not available';
    } else if (error.status >= 500) {
      errorMessage = 'Server error';
    } else if (error.error?.message) {
      errorMessage = error.error.message;
    }

    this.error.set({
      message: errorMessage,
      status: error.status,
    });
    this.loading.set(false);

    return of(null);
  }

  executeRequest<T>(operation: string, request: Observable<T>, onSuccess: (data: T) => void): void {
    this.error.set(null);
    this.loading.set(true);

    request
      .pipe(catchError((error: HttpErrorResponse) => this.handleHttpError(operation, error)))
      .subscribe((data) => {
        if (data !== null) {
          onSuccess(data);
        }
        this.loading.set(false);
      });
  }

  clearError(): void {
    this.error.set(null);
  }

  clearLoading(): void {
    this.loading.set(false);
  }

  reset(): void {
    this.error.set(null);
    this.loading.set(false);
  }
}
