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

      // this.chart = this.chartMaker.makeChart("chartdiv", this.buildChart());
      this.chart = this.chartMaker.makeChart("chartdiv", this.buildBarChart());
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

  private buildBarChart() : any {
    return {
      "type": "serial",
      "categoryField": "language",
      "startDuration": 1,
      "color": "#FFFFFF",
      "theme": "black",
      "categoryAxis": {
        "gridPosition": "start"
      },
      "trendLines": [],
      "graphs": [
        {
          "balloonText": "[[title]] of [[category]]:[[value]]",
          "fillAlphas": 1,
          "id": "AmGraph-1",
          "fillColors": "#FF2700",
          "title": "graph 1",
          "type": "column",
          "valueField": "updates"
        }
      ],
      "guides": [],
      "valueAxes": [
        {
          "id": "ValueAxis-1",
          "title": "Axis title"
        }
      ],
      "allLabels": [],
      "balloon": {},
      // "legend": {
      //   "enabled": true,
      //   "useGraphSettings": true
      // },
      // "titles": [
      //   {
      //     "id": "Title-1",
      //     "size": 15,
      //     "text": "Chart Title"
      //   }
      // ],
      "dataProvider": this.data
    };
  }

  // private buildPieChart() : any {
  //   return {
  //     "type": "pie",
  //     "labelText": "",
  //     "startDuration": 0,
  //     "theme": "dark",
  //     "addClassNames": true,
  //     // "legend":{
  //     //   "position":"right",
  //     //   "marginRight":100,
  //     //   "autoMargins":false
  //     // },
  //     "innerRadius": "60%",
  //     "defs": {
  //       "filter": [{
  //         "id": "shadow",
  //         "width": "200%",
  //         "height": "200%",
  //         "feOffset": {
  //           "result": "offOut",
  //           "in": "SourceAlpha",
  //           "dx": 0,
  //           "dy": 0
  //         },
  //         "feGaussianBlur": {
  //           "result": "blurOut",
  //           "in": "offOut",
  //           "stdDeviation": 5
  //         },
  //         "feBlend": {
  //           "in": "SourceGraphic",
  //           "in2": "blurOut",
  //           "mode": "normal"
  //         }
  //       }]
  //     },
  //     "dataProvider": this.data,
  //     "valueField": "updates",
  //     "titleField": "language",
  //     "export": {
  //       "enabled": true
  //     }
  //   };
  // }
}
