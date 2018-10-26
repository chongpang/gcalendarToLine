import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }      from './pages/dashboard/dashboard.component';
import { MsgListComponent} from './pages/message/msg-list/msg-list.component';
import { MsgAddComponent } from './pages/message/msg-add/msg-add.component';
import { MsgViewComponent } from './pages/message/msg-view/msg-view.component';
import { MsgEditComponent } from './pages/message/msg-edit/msg-edit.component';
import { SettingEditComponent } from './pages/setting/setting-edit/setting-edit.component';
import { SettingViewComponent } from './pages/setting/setting-view/setting-view.component';
import { SettingAddComponent } from './pages/setting/setting-add/setting-add.component';

import { SiginComponent } from './pages/sigin/sigin.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', component: SiginComponent },
  { path: 'sigin', component: SiginComponent },
  { 
    path: 'setting', 
    component: DashboardComponent ,
    children: [
      {
        path: '',
        children: [
          { path: "",component: SettingViewComponent},
          { path: "add",component: SettingAddComponent},
          { path: "edit/:id",component: SettingEditComponent},
          { path: ":id",component: SettingViewComponent},
        ]
      }
    ]
  },
  { 
    path: 'class', 
    component: DashboardComponent,
    children:[
      {
        path: '',
        children: [
          {path: '', component: MsgListComponent},
          {path: 'create', component: MsgAddComponent},
          {path: 'edit/:id', component: MsgEditComponent},
          {path: ':id', component: MsgViewComponent},
        ],
      },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
