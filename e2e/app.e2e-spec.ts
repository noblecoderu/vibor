import { ViborCliPage } from './app.po';

describe('vibor-cli App', () => {
  let page: ViborCliPage;

  beforeEach(() => {
    page = new ViborCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
