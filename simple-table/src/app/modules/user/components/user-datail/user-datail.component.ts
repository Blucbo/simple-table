import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../user.model';

@Component({
  selector: 'app-user-datail',
  templateUrl: './user-datail.component.html',
  styleUrls: ['./user-datail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDatailComponent {
  @Input() user: User | null = null;
  @Input() isOpen: boolean = false;
  @Output() closeDialog = new EventEmitter<void>();

  onClose() {
    this.closeDialog.emit();
  }

  onBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }
}
