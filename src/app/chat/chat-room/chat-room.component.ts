import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../loading/loading.component';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule, LoadingComponent],
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent {
  userInput: string = '';
  chatResponse: string = '';
  chatError: string = '';
  isLoading: boolean = false;

  constructor(private http: HttpClient) {}

  onSubmit(): void {
    this.isLoading = true;
    const headers = { 'Content-Type': 'application/json' };

    this.http.get('http://localhost:8080/g7e/v1/advises/chat', { headers, params: { question: this.userInput } })
      .subscribe({
        next: (response: any) => {
          this.chatResponse = response.data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Chat request failed', error);
          this.chatError = 'Chat request failed. Please try again.';
          this.isLoading = false;
        }
      });
  }
}
