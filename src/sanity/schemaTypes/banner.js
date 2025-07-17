export default {
    name: 'banner',
    title: 'Banner',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Banner Title',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'subTitle',
        title: 'Sub Title',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
      },
      {
        name: 'image',
        title: 'Banner Image',
        type: 'image',
        options: {
          hotspot: true,
        },
        // validation: Rule => Rule.required()
      },

      {
        name: 'video',
        title: 'Banner Video',
        type: 'file',
        options: {
          accept: 'video/*', // Accept only video files
        }
      },
      {
        name: 'category',
        title: 'Product Category',
        type: 'string',
        options: {
          list: [
            { title: 'Athleisure', value: 'athleisure' },
            { title: 'Leather', value: 'leather' },
          ],
          layout: 'radio',
        },
        validation: Rule => Rule.required()
      },
      {
        name: 'ctaText',
        title: 'Call To Action Text',
        type: 'string',
      },
      {
        name: 'ctaLink',
        title: 'Call To Action Link',
        type: 'url',
      }
    ],
  };
  