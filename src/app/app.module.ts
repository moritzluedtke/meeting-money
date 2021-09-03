import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { MainCalcComponent } from './main-page/main-calc.component';
import { FlexModule, GridModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';
import localeDeDe from '@angular/common/locales/de'
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeDeDe)

@NgModule({
  declarations: [
    AppComponent,
    MainCalcComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FlexModule,
    MatGridListModule,
    GridModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "de-de" },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
