import { assetFile } from "./assetFile";
import { brand } from "./brand";
import { homePage } from "./homePage";
import { localizedString, localizedText } from "./localized";
import { siteSettings } from "./siteSettings";

export const schemaTypes = [
  localizedString,
  localizedText,
  siteSettings,
  homePage,
  brand,
  assetFile,
];
