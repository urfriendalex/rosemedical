/**
 * Seeds a fresh Sanity dataset with the site's current copy so the Studio
 * isn't blank on day one. Safe to re-run: every document is created with a
 * fixed _id and `createOrReplace`d, so running it again overwrites rather than
 * duplicating.
 *
 * Run after the client has logged in and created their project:
 *   npx sanity exec scripts/seed.ts --with-user-token
 *
 * See docs/SANITY_SETUP.md for the full walkthrough.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { getCliClient } from "sanity/cli";
import {
  brands,
  homePage,
  siteSettings,
  uiStrings,
} from "../src/lib/fallback-content";

const client = getCliClient({ apiVersion: "2025-02-19" });

let keyCounter = 0;
const key = () => `seed${(keyCounter++).toString(36)}`;

// Add the _key/_type that Sanity requires on array members.
const keyed = <T extends object>(items: T[], _type?: string) =>
  items.map((item) => ({ _key: key(), ...(_type ? { _type } : {}), ...item }));

async function uploadImage(publicPath: string) {
  try {
    const file = path.join(process.cwd(), "public", publicPath);
    const buffer = await readFile(file);
    const asset = await client.assets.upload("image", buffer, {
      filename: path.basename(file),
    });
    return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  } catch (error) {
    console.warn(`  ! Could not upload image ${publicPath}:`, (error as Error).message);
    return undefined;
  }
}

async function seed() {
  const projectId = client.config().projectId;
  const dataset = client.config().dataset;
  console.log(`Seeding ${projectId}/${dataset} ...\n`);

  const docs: Array<Record<string, unknown> & { _id: string; _type: string }> = [];

  docs.push({
    _id: "siteSettings",
    _type: "siteSettings",
    title: siteSettings.title,
    description: siteSettings.description,
    contact: {
      ...siteSettings.contact,
      socials: keyed(siteSettings.contact.socials, "object"),
    },
    nav: keyed(siteSettings.nav, "object"),
    footer: siteSettings.footer,
  });

  docs.push({
    _id: "homePage",
    _type: "homePage",
    ...homePage,
    stats: keyed(homePage.stats, "object"),
    features: keyed(homePage.features, "object"),
  });

  docs.push({ _id: "uiStrings", _type: "uiStrings", ...uiStrings });

  let order = 10;
  for (const brand of brands) {
    const image = await uploadImage(brand.image);
    docs.push({
      _id: `brand.${brand.slug}`,
      _type: "brand",
      name: brand.name,
      slug: { _type: "slug", current: brand.slug },
      visible: true,
      featured: brand.featured,
      comingSoon: Boolean(brand.comingSoon),
      orderRank: order,
      logoText: brand.logoText,
      tagline: brand.tagline,
      description: brand.description,
      ...(image ? { image } : {}),
      catalog: brand.catalog,
      categories: keyed(brand.categories, "localizedString"),
      notes: keyed(brand.notes, "localizedString"),
      ...(brand.website ? { website: brand.website } : {}),
    });
    order += 10;
  }

  let tx = client.transaction();
  for (const doc of docs) tx = tx.createOrReplace(doc);
  await tx.commit();

  console.log(`Done. Wrote ${docs.length} documents:`);
  for (const doc of docs) console.log(`  - ${doc._id}`);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
