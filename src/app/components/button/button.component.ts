import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  imports: [CommonModule],
  standalone: true
})
export class ButtonComponent {
  @Input() public text: string = '';
  @Input() public isColored: boolean = false;
}
