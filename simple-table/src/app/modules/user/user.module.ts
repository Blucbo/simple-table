import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserContainerComponent } from './user-container/user-container.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UserDatailComponent } from './components/user-datail/user-datail.component';


@NgModule({
  declarations: [
    UserContainerComponent,
    UserTableComponent,
    UserDatailComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
