import {
  Cog,
  Home,
  Type,
  Package,
  FileText,
} from "lucide-react";
import type { StructureResolver } from "sanity/structure";

// Documents that must exist exactly once. They get a fixed id so the Studio
// always opens the same document instead of letting the client create copies.
export const SINGLETONS = [
  { id: "siteSettings", type: "siteSettings", title: "Site settings", icon: Cog },
  { id: "homePage", type: "homePage", title: "Home page", icon: Home },
  { id: "uiStrings", type: "uiStrings", title: "Interface labels", icon: Type },
] as const;

const SINGLETON_TYPES = new Set<string>(SINGLETONS.map((s) => s.type));

/**
 * Studio desk layout. Singletons are pinned at the top as single editable
 * documents; brands and asset files remain normal lists. Anything not handled
 * explicitly falls through to its default list so new schema types still show.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      ...SINGLETONS.map((singleton) =>
        S.listItem()
          .title(singleton.title)
          .id(singleton.id)
          .icon(singleton.icon)
          .child(
            S.document()
              .schemaType(singleton.type)
              .documentId(singleton.id)
              .title(singleton.title),
          ),
      ),
      S.divider(),
      S.listItem()
        .title("Brands")
        .icon(Package)
        .child(
          S.documentTypeList("brand")
            .title("Brands")
            .defaultOrdering([{ field: "orderRank", direction: "asc" }]),
        ),
      S.listItem()
        .title("Asset files")
        .icon(FileText)
        .child(S.documentTypeList("assetFile").title("Asset files")),
      // Surface any future document types automatically, minus what we placed above.
      ...S.documentTypeListItems().filter(
        (item) =>
          !SINGLETON_TYPES.has(item.getId() ?? "") &&
          !["brand", "assetFile"].includes(item.getId() ?? ""),
      ),
    ]);
