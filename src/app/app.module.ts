import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {MaterialModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout'

import { AppComponent } from './app.component';

import  { MetricService } from './metric-service'
import { StaticDataService } from './static-data'
import { MetricViewerComponent } from './metric-viewer/metric-viewer.component';
import { WikistatsChartsComponent } from './wikistats-charts/wikistats-charts.component'  

import { AmChartsModule } from '@amcharts/amcharts3-angular';
import { ChangeRateTableComponent } from './change-rate-table/change-rate-table.component';
import { TopWordsViewerComponent } from './top-words-viewer/top-words-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    MetricViewerComponent,
    WikistatsChartsComponent,
    ChangeRateTableComponent,
    TopWordsViewerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AmChartsModule
  ],
  providers: [
    MetricService,
    StaticDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
