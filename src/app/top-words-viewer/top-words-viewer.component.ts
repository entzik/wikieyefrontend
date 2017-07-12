import { WordCount, TopWords } from '../metric-service/top-words';
import { MetricService } from '../metric-service/metric.service';
import { Component, OnInit, Input } from '@angular/core';
import { StaticDataService } from "app/static-data";

@Component({
  selector: 'top-words',
  templateUrl: './top-words-viewer.component.html',
  styleUrls: ['./top-words-viewer.component.css']
})
export class TopWordsViewerComponent implements OnInit {
  @Input('domain') domain: string;
  
  words: WordCount[];
  
  
  constructor(
    private metricService: MetricService,
    private staticDataService: StaticDataService
  ) { 
  }

  ngOnInit() {
    this.metricService.getTopWordsStream()
      .filter(topWords => topWords.domain === this.domain)
      .subscribe(topWords => this.words = topWords.words);
  }

}
