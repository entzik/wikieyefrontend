import { WikiwatchPage } from './app.po';

describe('wikiwatch App', () => {
  let page: WikiwatchPage;

  beforeEach(() => {
    page = new WikiwatchPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
