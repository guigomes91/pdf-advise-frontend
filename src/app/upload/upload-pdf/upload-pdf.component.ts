import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload-pdf',
  templateUrl: './upload-pdf.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
  styleUrls: ['./upload-pdf.component.css']
})
export class UploadPdfComponent {
  selectedFile: File | null = null;
  uploadError: string | null = null;

  constructor(private readonly http: HttpClient, private readonly router: Router) {}

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
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.http.post('http://localhost:8080/g7e/v1/advises/upload', formData)
        .subscribe({
          next: (response) => {
            console.log('File uploaded successfully', response);
            this.router.navigate(['/chat']);
          },
          error: (error) => {
            console.error('File upload failed', error);
            this.uploadError = "Falha ao enviar o arquivo. Tente novamente.";
          }
        });
    }
  }
}
