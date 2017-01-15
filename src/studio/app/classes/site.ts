
export enum SiteStatus {
  Active,
  Inactive
}

export class Site {

  id: number;
  nickname: string;
  name: string;
  description: string;
  status: SiteStatus;
  liveUrl: string;
  previewUrl: string;
  icon: string;
  pages: { title, uri, pages } [];

}
