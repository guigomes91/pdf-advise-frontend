import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LoadingComponent } from '../../loading/loading.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule, LoadingComponent, RouterModule],
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent {
  userInput: string = '';
  chatResponse: string = '';
  chatError: string = '';
  isLoading: boolean = false;

  chatHistory: ChatMessage[] = [];

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  onSubmit(): void {
    if (!this.userInput.trim()) {
      this.chatError = 'Por favor, entre com uma questão antes de enviar.';
      return;
    }

    this.isLoading = true;
    const headers = { 'Content-Type': 'application/json' };

    this.http.get('http://localhost:8080/g7e/v1/advises/chat', { headers, params: { question: this.userInput } })
      .subscribe({
        next: (response: any) => {
          this.chatResponse = response?.response ?? 'Nenhuma resposta disponível.';

          const chatMessage: ChatMessage = {
            response: response?.response ?? 'Nenhuma resposta disponível.',
            timestamp: this.dateFormat(response)
          };

          this.chatHistory.unshift(chatMessage);
          this.chatHistory.reverse();
          this.userInput = '';
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Solicitação de resposta falhou.', error);
          this.chatError = 'Solicitação de resposta falhou.. Por favor tente novamente.';
          this.isLoading = false;
        }
      });
  }

  private dateFormat(response: any) {
    const date = new Date(response?.dateTime);
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // Para formato 24 horas
    };

    // Formatar a data
    const formattedDate = new Intl.DateTimeFormat('pt-BR', options).format(date);

    // Para garantir que o formato seja dd/MM/yyyy HH:mm:ss
    const [datePart, timePart] = formattedDate.split(', ');
    return `${datePart} ${timePart}`;
  }

  goBack() {
    this.router.navigate(['/upload']);
  }
}

interface ChatMessage {
  response: string;
  timestamp: string;
}
