import { defineField, defineType } from "sanity";

export const media = defineType({
    name: "media",
    title: "Media",
    type: "object",
    fields: [
        defineField({
            name: "image",
            title: "Image",
            type: "image",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "overrideMobileImage",
            title: "Override mobile image",
            type: "boolean",
            initialValue: false,
            description:
                "An alternative image to be displayed on mobile devices. Use it only if you want to show different content on mobile and desktop. Keep this option disabled in order to serve an auto-optimised main image on all devices.",
        }),
        defineField({
            name: "mobileImage",
            title: "Mobile Image",
            type: "image",
            hidden: ({ parent }) => parent?.overrideMobileImage === false,
            validation: (Rule) =>
                Rule.custom((image, context: any) => {
                    if (context.parent?.overrideMobileImage && !image) {
                        return "This field cannot be empty";
                    }
                    return true;
                }).warning(),
        }),
        defineField({
            name: "alt",
            title: "Alt",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
    ],
});
