export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Leather', value: 'leather' },
          { title: 'Athleisure', value: 'athleisure' }
        ],
      }
    },
    {
      name: 'tags',
      title: 'Tags / Filters',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Helps in filtering (e.g. boots, sneakers, men, women, topwear, etc.)'
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        hotspot: true,
      }
    },
    {
      name: 'sizes',
      title: 'Available Sizes',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Flat list of available sizes (used for filtering or display)',
    },
    // {
    //   name: 'variants',
    //   title: 'Variants (Sizes / Colors)',
    //   type: 'array',
    //   of: [{
    //     type: 'object',
    //     fields: [
    //       { name: 'color', type: 'string', title: 'Color' },
    //       { name: 'size', type: 'string', title: 'Size' },
    //       { name: 'sku', type: 'string', title: 'SKU' },
    //       { name: 'stock', type: 'number', title: 'Stock' },
    //     ],
    //   }],
    // },
    {
      name: 'inStock',
      title: 'Available?',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'label',
      title: 'Section Label',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Our Top Picks', value: 'topPicks' },
          { title: 'Featured Collection', value: 'featured' },
          { title: 'New Arrival', value: 'new' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'none',
    }
  ]
}
