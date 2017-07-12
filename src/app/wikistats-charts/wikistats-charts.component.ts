import { Http } from '@angular/http';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MetricService, Metric } from "app/metric-service";
import { AmChartsService } from "@amcharts/amcharts3-angular";
import { StaticDataService } from "app/static-data";


interface ChartData {
  language: string;
  updates: number;
}

@Component({
  selector: 'wikistats-chart',
  templateUrl: './wikistats-charts.component.html',
  styleUrls: ['./wikistats-charts.component.css']
})
export class WikistatsChartsComponent implements OnInit, OnDestroy {
  domains: string[];

  private chart: any;

  private data: ChartData[] = [
  ];

  constructor(
    private http: Http,
    private metricService: MetricService,
    private chartMaker: AmChartsService,
    private staticDataService: StaticDataService
  ) { }

  ngOnInit() {

    this.http.get('/api/v1/config/domains').map(r => <string[]>r.json()).subscribe(data => {
      this.domains = data;
      this.domains.forEach(element => {
        this.data.push({
          language: this.staticDataService.getLanguageNameMappings(element),
          updates: 0
        });
      });

      this.chart = this.chartMaker.makeChart("chartdiv", this.buildChart());
      this.metricService.getMetricsStream()
        .filter(metric => metric.action === 'update')
        .subscribe((metric: Metric) => {
          let newChartData: ChartData[] = this.updateChartData(metric.domain, metric.secRate);
          this.data = newChartData;
          this.chartMaker.updateChart(this.chart, () => {
            this.chart.dataProvider = newChartData;
          });
        });
    });
  }

  ngOnDestroy(): void {
    this.chartMaker.destroyChart(this.chart);
  }

  private updateChartData(language: string, rate: number): ChartData[] {
    return this.data.map(element => {
      if (element.language === this.staticDataService.getLanguageNameMappings(language))
        return <ChartData>{
          language: this.staticDataService.getLanguageNameMappings(language),
          updates: rate
        };
      else
        return element;
    });
  }

  private buildChart(): any {
    return {
      "type": "serial",
      "theme": "dark",
      "marginRight": 70,
      "dataProvider": this.data,
      "color": "#ffffff",
      "valueAxes": [{
        "axisAlpha": 0,
        "position": "left",
        "title": "Language",
        "axisColor": "#ffffff"
      }],
      "startDuration": 1,
      "graphs": [{
        "balloonText": "<b>[[category]]: [[value]]</b>",
        "fillColorsField": "color",
        "fillAlphas": 0.9,
        "lineAlpha": 0.2,
        "type": "column",
        "valueField": "updates",
        "fillColors": "red",
      }],
      "chartCursor": {
        "categoryBalloonEnabled": false,
        "cursorAlpha": 0,
        "zoomable": false
      },
      "categoryField": "language",
      "categoryAxis": {
        "gridPosition": "start",
        "labelRotation": 45
      },
      "export": {
        "enabled": true
      }
    }
  }

}
