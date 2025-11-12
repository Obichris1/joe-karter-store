// schemas/eventTicket.js
export default {
  name: 'eventTicket',
  title: 'Event Ticket',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Event Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    },
    {
      name: 'date',
      title: 'Event Date & Time',
      type: 'datetime',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'bannerImage',
      title: 'Banner Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'tickets',
      title: 'Tickets',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Ticket Name',
              type: 'string',
              validation: (Rule) =>
                Rule.custom((value) =>
                  value?.toLowerCase() === 'vip tickets'
                    ? 'VIP tickets are disabled — please choose another name.'
                    : true
                ),
            },
            { name: 'price', title: 'Price', type: 'number' },
            { name: 'checkoutUrl', title: 'Checkout URL', type: 'url' },
          ],
        },
      ],
    },
  ],
};
