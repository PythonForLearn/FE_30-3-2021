import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent} from './pages/index/index.component';
import { HomeComponent} from './pages/home/home.component'
import { InsertComponent } from './pages/home/insert/insert.component';
const routes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'home', component: HomeComponent },
  { path: 'home/insert', component: InsertComponent },
  { path: 'home/update/:id', component: InsertComponent },
  { path: 'home/:id', component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
