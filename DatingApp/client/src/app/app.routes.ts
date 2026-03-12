import { Routes } from '@angular/router';
import { HomeComponent } from '../features/home/home.component';
import { MembersListComponent } from '../features/members/members-list/members-list.component';
import { MembersDetailedComponent } from '../features/members/members-detailed/members-detailed.component';
import { ListsComponent } from '../features/lists/lists.component';
import { MessagesComponent } from '../features/messages/messages.component';
import { authGuard } from '../core/guards/auth.guard';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'members', component: MembersListComponent, canActivate: [authGuard]},
  {path: 'members/:id', component: MembersDetailedComponent, canActivate: [authGuard]},
  {path: 'lists', component: ListsComponent, canActivate: [authGuard]},
  {path: 'messages', component: MessagesComponent, canActivate: [authGuard]},
  {path: '**', component: HomeComponent}
];
