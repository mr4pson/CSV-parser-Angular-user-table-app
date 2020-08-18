import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTablePageComponent } from './components/user-table-page/user-table-page.component';

const routes: Routes = [
  {
    path: '',
    component: UserTablePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
