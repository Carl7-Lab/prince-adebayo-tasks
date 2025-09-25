import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, catchError, finalize, of } from 'rxjs';
import { ToastService } from '../shared/services/toast.service';

export interface HttpError {
  message: string;
  status: number;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private toastService = inject(ToastService);
  loading = signal<boolean>(true);
  error = signal<HttpError | null>(null);

  private handleHttpError(operation: string, error: HttpErrorResponse): Observable<null> {
    console.error(`❌ HTTP Error in ${operation}:`, error);

    let errorMessage = `Error ${operation}`;

    if (error.status === 400) {
      errorMessage = 'Bad request';
    } else if (error.status === 401) {
      errorMessage = 'Unauthorized';
    } else if (error.status === 403) {
      errorMessage = 'Forbidden';
    } else if (error.status === 404) {
      errorMessage = 'Not found';
    } else if (error.status === 0) {
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
    this.toastService.showError(`${operation} error`, this.error()?.message || '');
    this.loading.set(false);

    return of(null);
  }

  executeRequest<T>(operation: string, request: Observable<T>, onSuccess: (data: T) => void): void {
    this.error.set(null);

    request
      .pipe(
        catchError((error: HttpErrorResponse) => this.handleHttpError(operation, error)),
        finalize(() => {
          this.loading.set(false);
        })
      )
      .subscribe((data) => {
        if (data !== null) {
          onSuccess(data);
        }
        this.loading.set(false);
      });
  }

  showSuccess(title: string, message: string): void {
    this.toastService.showSuccess(title, message);
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
