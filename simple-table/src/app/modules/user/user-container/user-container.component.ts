import { ChangeDetectionStrategy, Component } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../services/user.service';
import { FormControl } from '@angular/forms';
import { combineLatest, debounceTime, distinctUntilChanged, map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserContainerComponent {
  public readonly searchControl = new FormControl('');
  public readonly searchQuery$ = this.searchControl.valueChanges.pipe(
    startWith(''),
    debounceTime(500),
    distinctUntilChanged(),
  );
  private users$!: Observable<User[]>;
  public filteredUsers$!: Observable<User[]>;

  constructor(
    private userService: UserService,
  ) {
    this.initUsersSubscription();
  }

  public selectedUser: User | null = null;
  public isDialogOpen: boolean = false;

  showDetailsDialog(user: User) {
    this.selectedUser = user;
    this.isDialogOpen = true;
  }

  closeDetailsDialog() {
    this.isDialogOpen = false;
    this.selectedUser = null;
  }

  private initUsersSubscription() {
    this.users$ = this.userService.getUsers();
    this.filteredUsers$ = combineLatest([
      this.users$,
      this.searchQuery$
    ]).pipe(
      map(([users, search]) => {
        if (!search) return users;
        return users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()))
      })
    )
  }

}
