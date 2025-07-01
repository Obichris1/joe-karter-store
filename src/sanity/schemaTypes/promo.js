// schemas/promoCode.js

export default {
    name: "promo",
    title: "Promo Code",
    type: "document",
    fields: [
      {
        name: "code",
        title: "Code",
        type: "string",
        validation: (Rule) => Rule.required(),
      },
      {
        name: "discount",
        title: "Discount (₦)",
        type: "number",
        validation: (Rule) => Rule.required().positive(),
      },
      {
        name: "active",
        title: "Active",
        type: "boolean",
        initialValue: true,
      },
      {
        name: "expiresAt",
        title: "Expiry Date",
        type: "datetime",
      },
      {
        name: "usageLimit",
        title: "Usage Limit",
        type: "number",
        description: "Maximum times this promo code can be used",
      },
      {
        name: "timesUsed",
        title: "Times Used",
        type: "number",
        initialValue: 0,
        readOnly: true,
      },
    ],
  };
  