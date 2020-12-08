import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';                               // msg notification 
import { ToastrService } from 'ngx-toastr';

import { SharedModule } from './../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { SiteCreateComponent } from './site-create/site-create.component';
import { SiteEditComponent } from './site-edit/site-edit.component';
import { ProjectsiteListComponent } from './projectsite-list/projectsite-list.component';
import { ProjectListComponent } from './project-list/project-list.component';

const routes: Routes = [

  
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  { path: 'home', component: SiteCreateComponent, data: { title: 'site-create' } },
  { path: 'project-list', component: ProjectListComponent, data: { title: 'project-list' } },
  { path: 'site-list', component: ProjectsiteListComponent, data: { title: 'site-list' } },
  { path: 'site-list/edit/:id', component: SiteEditComponent, data: { title: 'site-edit' } },
  { path: '', redirectTo: '/auth/home', pathMatch: 'full' },
  
  
];

@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent,
    SiteCreateComponent,
    SiteEditComponent,
    ProjectsiteListComponent,
    ProjectListComponent
  ],
  imports: [    
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  exports: [RouterModule],
  providers: [ToastrService]  
})
export class AuthModule { }