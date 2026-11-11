import { defineArrayMember, defineField, defineType } from "sanity";

/** Create exactly one of these. Drives homepage copy, stats, ticker, footer. */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "tagline", type: "string", description: "Hero subtitle" }),
    defineField({ name: "heroImage", title: "Hero background photo", type: "image", options: { hotspot: true }, description: "Wide, dark, high-resolution photo (at least 2400px wide). Leave empty to use the built-in background." }),
    defineField({
      name: "stats", type: "array",
      of: [defineArrayMember({
        type: "object",
        fields: [
          defineField({ name: "label", type: "string" }),
          defineField({ name: "value", type: "number" }),
          defineField({ name: "suffix", type: "string", description: "e.g. +" }),
        ],
        preview: { select: { title: "label", subtitle: "value" } },
      })],
      validation: (r) => r.max(4),
    }),
    defineField({ name: "marquee", title: "Ticker chassis codes", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({
      name: "contact", type: "object",
      fields: [
        defineField({ name: "email", type: "string" }),
        defineField({ name: "phone", type: "string" }),
        defineField({ name: "address", type: "text", rows: 2 }),
      ],
    }),
    defineField({
      name: "socials", type: "array",
      of: [defineArrayMember({
        type: "object",
        fields: [defineField({ name: "label", type: "string" }), defineField({ name: "url", type: "url" })],
      })],
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});