import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { DisplayComponent } from './display/display.component';
import { MembersComponent } from './members/members.component';
import { PublisherComponent } from './publisher/publisher.component';
import { OrdersComponent } from './orders/orders.component';
import { LoginComponent } from './login/login.component';
import { MemberLoginComponent } from './member-login/member-login.component';
import { MemberAccountComponent } from './member-account/member-account.component';
import { MemberBorrowBookComponent } from './member-borrow-book/member-borrow-book.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

const routes: Routes = [{path:"",component:MemberLoginComponent},
                        {path:"bookComponent",component:BooksComponent},
                        {path:"memberComponent",component:MembersComponent},
                        {path:"publisherComponent",component:PublisherComponent},
                        {path:"oderComponent",component:OrdersComponent},
                        {path:"loginComponent",component:LoginComponent},
                        {path:"memberLoginComponent",component:MemberLoginComponent},
                        {path:"myAccountComponent",component:MemberAccountComponent},
                        {path:"viewBookComponent/:id",component:MemberBorrowBookComponent},
                        {path:"adminlogin",component:AdminLoginComponent},
                        {path:"adminHomeComponent",component:DisplayComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
