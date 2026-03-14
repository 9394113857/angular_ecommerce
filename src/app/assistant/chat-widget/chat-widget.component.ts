import { Component } from '@angular/core';
import { AssistantService } from '../services/assistant.service';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

@Component({
  selector: 'app-chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.css']
})
export class ChatWidgetComponent {

  isOpen = false;
  inputMessage = '';
  messages: Message[] = [];
  loading = false;

  constructor(private assistantService: AssistantService) {}

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {

    if (!this.inputMessage.trim()) return;

    const userMessage = this.inputMessage;

    this.messages.push({
      role: 'user',
      text: userMessage
    });

    this.inputMessage = '';
    this.loading = true;

    // ============================================
    // CHECK LOGIN STATUS
    // ============================================

    let userId: number | null = null;

    const token = localStorage.getItem('access_token');

    if (token) {
      userId = 1; 
      // For now assume logged-in user = 1
      // Later we decode JWT to get actual user id
    }

    this.assistantService.sendMessage(userId, userMessage)
      .subscribe({
        next: (res) => {

          this.messages.push({
            role: 'assistant',
            text: res.response
          });

          this.loading = false;
        },

        error: () => {

          this.messages.push({
            role: 'assistant',
            text: 'Error connecting to assistant service.'
          });

          this.loading = false;
        }
      });

  }
}