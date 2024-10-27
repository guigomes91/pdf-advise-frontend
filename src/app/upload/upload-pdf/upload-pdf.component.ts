import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoadingComponent } from '../../loading/loading.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload-pdf',
  templateUrl: './upload-pdf.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, LoadingComponent, MatSnackBarModule],
  styleUrls: ['./upload-pdf.component.css']
})
export class UploadPdfComponent {
  selectedFile: File | null = null;
  uploadError: string | null = null;
  isLoading: boolean = false;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private snackBar: MatSnackBar
  ) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.uploadError = null; // Limpar erros anteriores
    }
  }

  onUpload() {
    if (!this.selectedFile) {
      this.uploadError = "Por favor, selecione um arquivo.";
      return;
    }

    if (this.selectedFile) {
      this.isLoading = true;
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.http.post('http://localhost:8080/g7e/v1/advises/upload', formData)
        .subscribe({
          next: (response) => {
            this.snackBar.open('Arquivo carregado com sucesso!', 'Fechar', {
              duration: 3000,
            });
            this.isLoading = false;
            this.router.navigate(['/chat']);
          },
          error: (error) => {
            console.error('File upload failed', error);
            this.snackBar.open('Falha ao enviar o arquivo!', 'Fechar', {
              duration: 3000,
              panelClass: ['error-snackbar']
            });
            this.uploadError = "";
            this.isLoading = false;
          }
        });
    }
  }
}
