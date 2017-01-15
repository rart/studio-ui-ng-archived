import { StudioUiPage } from './app.po';

describe('studio-ui App', function() {
  let page: StudioUiPage;

  beforeEach(() => {
    page = new StudioUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
