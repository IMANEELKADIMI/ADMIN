import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { SharedModule } from './shared/shared.module';

import { AgentModule } from './agent/agent.module';
import { AgencyModule } from './agency/agency.module';
import { AdminModule } from './admin/admin.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasicAuthHtppInterceptorService } from './authentification/services/basic-auth-http-interceptor.service';
import { AuthentificationModule } from './authentification/authentification.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
   
    AgentModule,
    AgencyModule,
    AdminModule,
    SharedModule,
    AuthentificationModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthHtppInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
