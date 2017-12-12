import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { ContenteditableDirective } from 'ng-contenteditable';

import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { ProjectComponent } from './home-project/project/project.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { SignupComponent } from './signup/signup.component';
import { CustomFormsModule } from 'ng2-validation';
import { SidebarComponent } from './home-project/sidebar/sidebar.component';
import { HomeProjectComponent } from './home-project/home-project.component';
import { SprintComponent } from './home-project/sprint/sprint.component';
import { AccountComponent } from './account/account.component';
import { EditSprintComponent } from './home-project/sprint/edit-sprint/edit-sprint.component';
//import { EditProjectComponent } from './popups/edit-project/edit-project.component';
import { AddUserComponent } from './popups/add-user/add-user.component';
import { UserInfoComponent } from './home-project/user-info/user-info.component';
import { NewProjectComponent } from './workspace/new-project/new-project.component';
import { NewSprintComponent } from './popups/new-sprint/new-sprint.component';
import { EditProjectComponent } from './home-project/project/edit-project/edit-project.component';




@NgModule({
	declarations: [
		AppComponent,
		SigninComponent,
		ProjectComponent,
		HomeComponent,
		NavbarComponent,
		WorkspaceComponent,
		SignupComponent,
		ContenteditableDirective,
		SidebarComponent,
		HomeProjectComponent,
		SprintComponent,
		AccountComponent,
		EditSprintComponent,
		EditProjectComponent,
		AddUserComponent,
		UserInfoComponent,
		NewProjectComponent,
		NewSprintComponent

	],
	imports: [
		BrowserModule,
		NgbModule.forRoot(),
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		CustomFormsModule,
		NgbAccordionModule.forRoot()
	],
	providers: [
		AuthService,
		AuthGuard
	],
	bootstrap: [AppComponent],
	entryComponents: [
		SprintComponent,
		AddUserComponent,
		EditProjectComponent,
		EditSprintComponent,
		UserInfoComponent,
		NewProjectComponent,
		NewSprintComponent
	]
})
export class AppModule { }
