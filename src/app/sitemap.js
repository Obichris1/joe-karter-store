export default async function sitemap() {
    const baseUrl = "https://joekarter.com";
  
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/shop/leather`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/shop/athleisure`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
      },
    ];
  }
  