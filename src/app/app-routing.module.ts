import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlatformsComponent } from './platforms/platforms.component';
import { PlatformDetailComponent } from './platform-detail/platform-detail.component';
import { DatafilesComponent } from './datafiles/datafiles.component';
import { DatafileDetailComponent } from './datafile-detail/datafile-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/platforms', pathMatch: 'full' },
  { path: 'platformdetail/:id', component: PlatformDetailComponent },
  { path: 'platforms', component: PlatformsComponent },
  { path: 'datafiles', component: DatafilesComponent },
  { path: 'datafiledetail/:id', component: DatafileDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
