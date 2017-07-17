import { Observable } from 'rxjs';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MetricService } from "app/metric-service";
import { Metric } from "app/metric-service";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'metric-viewer',
  templateUrl: './metric-viewer.component.html',
  styleUrls: ['./metric-viewer.component.css']
})
export class MetricViewerComponent implements OnInit, OnDestroy {
  @Input('domain') domain: string;
  @Input('action') action: string;

  metricValue: number = 0;
  flashActive: boolean = false;

  constructor(
    private metricService: MetricService
  ) { }

  ngOnInit() {
    this.metricService.getMetricsStream()
      .filter(metric => metric.domain === this.domain && metric.action === this.action)
      .subscribe((metric: Metric) => {
        if (this.metricValue !== metric.secRate) {
          this.flashActive = true;
          Observable.timer(1000).take(1).subscribe( _ => this.flashActive = false);
        }
        this.metricValue = metric.secRate;
      });
  }

  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }
}
