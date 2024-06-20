import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  imports: [CommonModule],
  standalone: true
})
export class CardComponent {
  @Input() public icon: string = '';
  @Input() public header: string = '';
  @Input() public text: string = '';
  @Input() public color: string = '';
}
