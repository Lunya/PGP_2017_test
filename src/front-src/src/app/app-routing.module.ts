
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { ProjectComponent } from './home-project/project/project.component';
import { SprintComponent } from './home-project/sprint/sprint.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { HomeProjectComponent } from './home-project/home-project.component';

const routes: Routes = [
	{ path: '', redirectTo: 'workspace', pathMatch: 'full' },
	{ path: '#', redirectTo: 'workspace', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent  },
	{ path: 'signup', component: SignupComponent },
	{ path: 'workspace', component: WorkspaceComponent, canActivate: [AuthGuard] },
	{ path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
	{ path: 'project', component: ProjectComponent},
	{ path: 'sprint', component: SprintComponent},
	{ path: 'resetPassword', component: AccountComponent },
	{ path: 'project/:id', component: HomeProjectComponent }
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule {}
