import { BusWatchPage } from './app.po';

describe('bus-watch App', () => {
  let page: BusWatchPage;

  beforeEach(() => {
    page = new BusWatchPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
