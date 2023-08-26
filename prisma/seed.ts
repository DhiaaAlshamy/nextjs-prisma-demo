import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed Locations
  const locationNames = ["Las Vigas", "Los Angeles", "Chicago", "Houston"];
  const locations = [];
  for (const name of locationNames) {
    const location = await prisma.location.create({
      data: { name },
    });
    locations.push(location);
  }

  // Seed Cuisines
  const cuisineNames = ["Spanish", "Mexican", "Chinese"];
  const cuisines = [];
  for (const name of cuisineNames) {
    const cuisine = await prisma.cuisine.create({
      data: { name },
    });
    cuisines.push(cuisine);
  }

  // Restaurant Names
  const restaurantNames = [
    "Mario's Italian Bistro",
    "Taco Fiesta",
    "Golden Dragon",
    "Pasta Paradise",
    "Burrito Brothers",
    "Wok This Way",
    "La Bella Pizza",
    "Salsa & Salsa",
    "Noodle Nirvana",
    "The Great Wall",
  ];

  let lastRestaurant; // To store the last created restaurant

  // Seed Restaurants
  for (let i = 0; i < 10; i++) {
    const restaurant = await prisma.restaurant.create({
      data: {
        name: restaurantNames[i],
        main_image: `Image_of_${restaurantNames[i].replace(/ /g, "_")}.jpg`,
        images: `Images_of_${restaurantNames[i].replace(/ /g, "_")}.jpg`,
        description: `Experience the best of ${
          cuisines[i % 3].name
        } cuisine at ${restaurantNames[i]}.`,
        open_time: "08:00",
        close_time: "22:00",
        slug: restaurantNames[i].toLowerCase().replace(/ /g, "-"),
        price: (i + 1) * 10,
        location_id: locations[i % 4].id,
        cuisine_id: cuisines[i % 3].id,
      },
    });

    lastRestaurant = restaurant;

    // Seed Items for each Restaurant
    for (let j = 1; j <= 10; j++) {
      await prisma.item.create({
        data: {
          name: `${cuisines[i % 3].name} Dish ${j}`,
          price: `${j * 5}`,
          description: `A delicious ${
            cuisines[i % 3].name
          } dish, perfect for any occasion.`,
          restaurant_id: restaurant.id,
        },
      });
    }
  }

  // Assuming you have a user model in your schema
  const user1 = await prisma.user.upsert({
    where: { email: "john.doe@example.com" },
    update: {},
    create: {
      first_name: "John",
      last_name: "Doe",
      city: "New York",
      password: "password123",
      email: "john.doe@example.com",
      phone: "123-456-7890",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
