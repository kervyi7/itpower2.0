export interface IAppConfig {
  newsBanner: boolean;
  advantagesCount: number;
  clientsImages: IFileLink[];
  clientsCount: string,
  customSupportPrice: number;
  standardSupportPrice: number;
  premiumSupportPrice: number;
  phoneNumbers: string[];
  email: string;
  telegram: string;
  token: string;
  chatId: string;
}

export interface IFileLink {
  file: string;
  link: string;
  color: string;
}