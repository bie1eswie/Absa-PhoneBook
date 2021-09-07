import { HomeComponent } from './appviews/home/home.component';
import { ContactsLayoutComponent } from './common/contacts-layout/contacts-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
   // Main redirect
   { path: '', redirectTo: 'contacts', pathMatch: 'full' },
   {
     path: '', component: ContactsLayoutComponent,
     children: [
       { path: 'contacts', component: HomeComponent },
     ]
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
