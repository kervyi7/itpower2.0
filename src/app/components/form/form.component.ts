import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  imports: [CommonModule, FormsModule, ButtonComponent, TranslateModule],
  providers: [HttpService],
  standalone: true
})
export class FormComponent {
  @Input() public header: string = '';
  @Input() public text: string = '';
  @Input() public inputType: string = '';
  @Input() public inputPlaceholder: string = '';
  @Input() public buttonText: string = '';
  @Output() public onClose: EventEmitter<boolean> = new EventEmitter();

  public inputValue: string = '';
  public inputValuePhone: string = '';
  public isFormValid: boolean = true;
  public messageSentText: boolean = false;

  constructor(private _httpService: HttpService) {
  }

  public close() {
    this.onClose.next(false);
  }

  public changeFormValid() {
    if (!this.isFormValid) {
      this.isFormValid = !this.isFormValid;
    }
  }

  public send() {
    if (this.inputType == 'tel') {
      this.validatePhoneNumber();
      let input = this.inputValuePhone.replace(/\D/g, '');
      this.sendMessage(input);
    } else {
      this.validateEmail();
      this.sendMessage(this.inputValue);
      setTimeout(() => {
        this.messageSentText = false;
      }, 5000);
    }
  }

  public onKeyDown(event: KeyboardEvent): void {
    this.enforceFormat(event);
    if (event.code == "Backspace" && (this.inputValuePhone == '+380' || this.inputValuePhone == '')) {
      this.inputValuePhone = '+380';
      event.preventDefault();
      return;
    }
    if (this.inputValuePhone.length == 19 && !this.isModifierKey(event.keyCode)) {
      event.preventDefault();
    }
  }

  public focus() {
    if (this.inputValuePhone == '') {
      this.inputValuePhone = '+380';
    }
  }

  public formatPhone(): void {
    const input = this.inputValuePhone.replace(/\D/g, '').substring(0, 12);

    switch (input.length) {
      case 0: case 1: case 2:
        this.inputValuePhone = `+380`;
        break;
      case 3: case 4: case 5:
        this.inputValuePhone = `+380 (${input.substring(3, 5)}`;
        break;
      case 6: case 7: case 8: case 9:
        this.inputValuePhone = `+380 (${input.substring(3, 5)}) ${input.substring(5, 8)} ${input.substring(8, 10)}`;
        break;
      case 10: case 11: case 12:
        this.inputValuePhone = `+380 (${input.substring(3, 5)}) ${input.substring(5, 8)} ${input.substring(8, 10)} ${input.substring(10, 12)}`;
    }
  }

  private sendMessage(message: string) {
    if (this.isFormValid) {
      this._httpService.sendMessage(message).subscribe();
      this.messageSentText = true;
      this.text = '';
    }
  }

  private validateEmail(): void {
    let validRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.isFormValid = validRegex.test(this.inputValue);
  }

  private validatePhoneNumber() {
    let validRegex = /^\+\d{3} \(\d{2}\) \d{3} \d{2} \d{2}$/;
    this.isFormValid = validRegex.test(this.inputValuePhone);
  }

  private enforceFormat(event: KeyboardEvent) {
    const key = event.keyCode;
    if (!this.isNumericInput(key) && !this.isModifierKey(key)) {
      event.preventDefault();
    }
  }

  private isNumericInput(key: number) {
    return ((key >= 48 && key <= 57) || (key >= 96 && key <= 105));
  }

  private isModifierKey(key: number) {
    return (key === 8 || key === 46)
  }
}