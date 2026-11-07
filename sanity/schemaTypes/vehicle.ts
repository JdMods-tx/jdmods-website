import { defineArrayMember, defineField, defineType } from "sanity";

export const vehicle = defineType({
  name: "vehicle",
  title: "Vehicle",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "chassis", title: "Chassis code", type: "string", description: "e.g. S15, JZA80, BNR34", validation: (r) => r.required() }),
    defineField({ name: "make", type: "string" }),
    defineField({ name: "year", type: "number" }),
    defineField({ name: "engine", type: "string" }),
    defineField({ name: "power", type: "string", description: "e.g. 280 PS" }),
    defineField({ name: "drivetrain", type: "string", options: { list: ["FR", "FF", "MR", "RR", "AWD"] } }),
    defineField({ name: "mileage", type: "string" }),
    defineField({
      name: "status", type: "string", initialValue: "available",
      options: { list: ["available", "incoming", "sold"], layout: "radio" },
    }),
    defineField({ name: "price", type: "number", description: "Leave empty to show “Inquire”" }),
    defineField({ name: "featured", type: "boolean", initialValue: false, description: "Show on the homepage garage" }),
    defineField({ name: "gallery", type: "array", of: [defineArrayMember({ type: "image", options: { hotspot: true } })] }),
    defineField({ name: "story", type: "array", of: [defineArrayMember({ type: "block" })] }),
    defineField({
      name: "specs", type: "array",
      of: [defineArrayMember({
        type: "object",
        fields: [defineField({ name: "label", type: "string" }), defineField({ name: "value", type: "string" })],
      })],
    }),
  ],
  preview: { select: { title: "title", subtitle: "chassis", media: "gallery.0" } },
});
