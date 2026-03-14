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

    // Show user message
    this.messages.push({
      role: 'user',
      text: userMessage
    });

    this.inputMessage = '';
    this.loading = true;

    // ============================
    // Detect login state
    // ============================

    let userId: number | null = null;

    const userLoggedIn = localStorage.getItem('userLoggedIn');

    if (userLoggedIn) {
      userId = 1; // simulate logged-in user
    }

    // ============================
    // Send message to assistant
    // ============================

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