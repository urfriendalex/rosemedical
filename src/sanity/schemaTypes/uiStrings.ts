import { defineField, defineType } from "sanity";

// Interface labels: the small, recurring UI chrome (buttons, footer captions,
// form labels) that sits outside the main content blocks. Grouped into
// collapsible sections so the client isn't faced with one flat wall of fields.
// Every leaf is a localizedString so EN + PL stay editable in one place.
const group = (name: string, title: string, fields: ReturnType<typeof defineField>[]) =>
  defineField({
    name,
    title,
    type: "object",
    options: { collapsible: true, collapsed: true },
    fields,
  });

const label = (name: string, title: string, description?: string) =>
  defineField({ name, title, description, type: "localizedString" });

export const uiStrings = defineType({
  name: "uiStrings",
  title: "Interface labels",
  type: "document",
  fields: [
    group("hero", "Hero / carousel", [
      label("distributionLabel", "Bottom-left caption", 'e.g. "Selected Medical Distribution"'),
      label("nextLabel", "Next button"),
      label("scrollLabel", "Bottom-right caption", 'e.g. "Scroll to Explore"'),
      label("prevSlideAria", "Previous-slide button (screen-reader text)"),
      label("comingSoonEyebrow", "“Coming soon” badge"),
      label("comingSoonTitle", "“Coming soon” slide title"),
      label(
        "portfolioAccessTitle",
        "Brand slide title",
        'Use {brand} where the brand name should appear, e.g. "{brand} portfolio access."',
      ),
    ]),
    group("header", "Header", [label("menuLabel", "Menu button")]),
    group("brandPage", "Brand detail page", [
      label("backToBrands", "Back link"),
      label("downloadCatalog", "Download-catalog button"),
      label("askAvailability", "Ask-availability button"),
      label("productCategories", "Categories panel title"),
      label("notesTitle", "Notes panel title"),
      label("nextBrand", "“Next brand” eyebrow"),
      label("browseNextProvider", "“Next brand” button"),
    ]),
    group("contactForm", "Contact form", [
      label("name", "Name field"),
      label("email", "Email field"),
      label("company", "Company field"),
      label("message", "Message field"),
      label("submit", "Submit button"),
      label("sending", "Submit button while sending"),
      label("success", "Success message"),
      label("error", "Error message"),
    ]),
  ],
  preview: {
    prepare: () => ({ title: "Interface labels" }),
  },
});
