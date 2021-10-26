// Componentes Globais
import { TemaEditComponent } from './edit/tema-edit/tema-edit.component';
import { TemaComponent } from './tema/tema.component';
import { UserComponent } from './user/user.component';
import { UserEditComponent } from './edit/user-edit/user-edit.component';
import { TemaDeleteComponent } from './delete/tema-delete/tema-delete.component';
import { MenuComponent } from './menu/menu.component';
import { RodapeComponent } from './rodape/rodape.component';
import { FeedComponent } from './feed/feed.component';
import { InicioComponent } from './inicio/inicio.component';
import { AlertasComponent } from './alertas/alertas.component';
import { AppComponent } from './app.component';
import { MensagemComponent } from './mensagem/mensagem.component';

// Módulos Globais
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { OrderModule } from 'ngx-order-pipe';

// Todos os componentes criados serão válidados aqui
@NgModule({
  declarations: [
    AppComponent,
    AlertasComponent,

    InicioComponent,

    FeedComponent,
    RodapeComponent,
    MenuComponent,

    TemaComponent,
    TemaDeleteComponent,
    TemaEditComponent,

    UserEditComponent,
    UserComponent,
    MensagemComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot(),
    OrderModule
  ],

  // Auxilia as rotas e na rolagem automatica da pag
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],

  bootstrap: [AppComponent] // Permissão do bootstrap agir em toda aplicação
})
export class AppModule { }
