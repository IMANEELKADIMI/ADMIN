import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentRoutingModule } from './agent-routing.module';
import { AgentListComponent } from './agent-list/agent-list.component';
import { AgentFormComponent } from './agent-form/agent-form.component';
import { SharedModule } from '../shared/shared.module';
import { AgentItemComponent } from './agent-item/agent-item.component';

@NgModule({
  declarations: [AgentListComponent, AgentFormComponent, AgentItemComponent],
  imports: [CommonModule, AgentRoutingModule, SharedModule],
})
export class AgentModule {}
