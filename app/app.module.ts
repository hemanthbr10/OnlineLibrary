import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { BooksComponent } from './books/books.component';
import { DisplayComponent } from './display/display.component';
import { TimeoutDirective } from './timeout.directive';
import { PublisherComponent } from './publisher/publisher.component';
import { MembersComponent } from './members/members.component';
import { OrdersComponent } from './orders/orders.component';
import { LoginComponent } from './login/login.component';
import { MemberLoginComponent } from './member-login/member-login.component';
import { MembernavComponent } from './membernav/membernav.component';
import { MemberAccountComponent } from './member-account/member-account.component';
import { MemberBorrowBookComponent } from './member-borrow-book/member-borrow-book.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BooksComponent,
    DisplayComponent,
    TimeoutDirective,
    PublisherComponent,
    MembersComponent,
    OrdersComponent,
    LoginComponent,
    MemberLoginComponent,
    MembernavComponent,
    MemberAccountComponent,
    MemberBorrowBookComponent,
    AdminLoginComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
