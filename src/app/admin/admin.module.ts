import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminFormComponent } from './admin-form/admin-form.component';
import { UpdateFormComponent } from './update-form/update-form.component';

@NgModule({
  declarations: [AdminListComponent, AdminFormComponent, UpdateFormComponent],
  imports: [AdminRoutingModule, SharedModule],
})
export class AdminModule {}
