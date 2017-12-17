import { WhatsInThePicturePage } from './app.po';

describe('whats-in-the-picture App', () => {
  let page: WhatsInThePicturePage;

  beforeEach(() => {
    page = new WhatsInThePicturePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
