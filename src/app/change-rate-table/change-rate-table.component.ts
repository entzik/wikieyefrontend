import { MetricService } from '../metric-service/metric.service';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { StaticDataService } from "app/static-data";

@Component({
  selector: 'change-rate-table',
  templateUrl: './change-rate-table.component.html',
  styleUrls: ['./change-rate-table.component.css']
})
export class ChangeRateTableComponent implements OnInit {
  domains: string[] = []
  actions: string[] = []

  private actionLabels: any = {
    all: 'All Events',
    update: 'Page Updates',
    thanks: 'User Thanks',
    block: 'Users Blocked',
    abusefilter: 'Abuses Detected'
  }

  constructor(
    private http: Http,
    private metricService: MetricService,
    private staticDataService: StaticDataService
  ) { }

  ngOnInit() {
    this.http.get('/api/v1/config/domains').map(r => <string[]>r.json()).subscribe(data => this.domains = data);
    this.http.get('/api/v1/config/actions').map(r => <string[]>r.json()).subscribe(data => this.actions = data);
  }

}
