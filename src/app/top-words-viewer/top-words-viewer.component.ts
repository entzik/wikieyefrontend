import {WordCount, TopWords} from '../metric-service/top-words';
import {MetricService} from '../metric-service/metric.service';
import {Component, OnInit, Input} from '@angular/core';
import {StaticDataService} from "app/static-data";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'top-words',
  templateUrl: './top-words-viewer.component.html',
  styleUrls: ['./top-words-viewer.component.css']
})
export class TopWordsViewerComponent implements OnInit {
  @Input('domain') domain: string;

  words: WordCount[];
  flashActive: boolean[];

  constructor(private metricService: MetricService,
              private staticDataService: StaticDataService) {
  }

  ngOnInit() {
    this.metricService.getTopWordsStream()
      .filter(topWords => topWords.domain === this.domain)
      .subscribe(topWords => this.applyNewWords(topWords));
  }

  private applyNewWords(topWords) {
    if (this.words == null) {
      this.flashActive = [true, true, true, true, true, true, true, true, true, true];
      Observable.timer(1000).take(1).subscribe( _ => this.flashActive = [false, false, false, false, false, false, false, false, false, false]);
    } else {
      for (let i = 0; i < this.words.length; i ++) {
        this.flashActive[i] = (this.words[i].word !== topWords.words[i].word) || (this.words[i].count !== topWords.words[i].count);
      }
      Observable.timer(1000).take(1).subscribe( _ => this.flashActive = [false, false, false, false, false, false, false, false, false, false]);
    }
    this.words = topWords.words;
  }

}
