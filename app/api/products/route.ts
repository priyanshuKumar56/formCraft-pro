// app/api/product/route.js

export async function GET(req) {
  const sampleProducts = [
    {
      id: 1,
      name: "Smartphone",
      price: 29999,
      description: "Latest model with high-end specs.",
    },
    {
      id: 2,
      name: "Laptop",
      price: 75999,
      description: "Powerful laptop for development and gaming.",
    },
    {
      id: 3,
      name: "Headphones",
      price: 1999,
      description: "Wireless headphones with noise cancellation.",
    },
  ];

  return Response.json(sampleProducts);
}
