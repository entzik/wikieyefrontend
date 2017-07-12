import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { Metric } from './metric';
import { WordCount, TopWords } from './top-words';

@Injectable()
export class MetricService {
  private ws: WebSocket;
  private metricEmitter: EventEmitter<Metric>;
  private topWordsEmitter: EventEmitter<TopWords>;

  constructor() {
    this.metricEmitter = new EventEmitter(true);
    this.topWordsEmitter = new EventEmitter(true)
    this.connectWebsocket();
  }

  private connectWebsocket() {
    this.ws = new WebSocket('ws://localhost:4200/api/wikimetrics');
    this.ws.onopen = () => console.log('ws connection opened');
    this.ws.onclose = () => {
      console.info('ws closed...');
      Observable.timer(10000).take(1).subscribe(_ => {
        console.info('reconnecting after ws close...');
        this.connectWebsocket();
      });
    };
    this.ws.onmessage = (msg) => {
      let payloadObject = JSON.parse(msg.data);
      let msgType = payloadObject['@msg-type'];
      if (msgType === 'wiki-metric')
        this.handleMetric(payloadObject);
      else if (msgType === 'top-words-metric')
        this.handleTopWords(payloadObject);
    };
    this.ws.onerror = () => {
      console.error('websocket error');
    }
  }

  private handleTopWords(payloadObject: any) {
    console.log('converting topwords payload: ' + JSON.stringify(payloadObject))
    let topWords: TopWords = {
      timestamp: payloadObject['timestamp'],
      domain: payloadObject['domain'],
      words: payloadObject['words']
    } as TopWords;
    console.log(JSON.stringify(topWords));
    this.topWordsEmitter.emit(topWords);
  }

  private handleMetric(payloadObject: any) {
    console.log('converting metric payload: ' + JSON.stringify(payloadObject))
    let metric: Metric = {
      timestamp: payloadObject['timestamp'],
      domain: payloadObject['domain'],
      action: payloadObject['action'],
      secRate: payloadObject['sec-rate']
    } as Metric;
    this.metricEmitter.emit(metric);
  }

  public getMetricsStream(): Observable<Metric> {
    return this.metricEmitter.asObservable();
  }

  public getTopWordsStream(): Observable<TopWords> {
    return this.topWordsEmitter.asObservable();
  }
}
