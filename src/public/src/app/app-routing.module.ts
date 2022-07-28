import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';


const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        pathMatch: 'full'
    },
    {
        path: 'app-user-registration',
        loadChildren: () => import("./user-registration/user-registration.module").then(m => m.UserRegistrationModule),
    },
    {
        path: 'app-dash-board',
        loadChildren: () => import("./dash-board/dash-board.module").then(m => m.DashboardModule),
        // canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: false, preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})

export class AppRoutingModule { }
