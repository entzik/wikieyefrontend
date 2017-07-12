import {MetricService} from './metric-service/metric.service';
import {Http} from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";
import { Observer } from "rxjs/Observer";
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private ws: WebSocket;

  constructor(
    private http: Http,
    private metricService: MetricService
  ) {}

  ngOnInit(): void {
  }
}
