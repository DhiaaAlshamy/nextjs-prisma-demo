import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed Locations
  const location1 = await prisma.location.upsert({
    where: { name: "New York" },
    update: {},
    create: { name: "New York" },
  });

  // Seed Cuisines
  const cuisine1 = await prisma.cuisine.upsert({
    where: { name: "Italian" },
    update: {},
    create: { name: "Italian" },
  });

  // Seed Restaurants
  const restaurant1 = await prisma.restaurant.upsert({
    where: { slug: "la-bella-italia" }, // Using slug as it's unique
    update: {},
    create: {
      name: "La Bella Italia",
      main_image: "path/to/main/image.jpg",
      images: "path/to/images",
      description: "Authentic Italian Cuisine",
      open_time: "09:00",
      close_time: "22:00",
      slug: "la-bella-italia",
      price: 50.0,
      location: {
        connect: { id: location1.id },
      },
      cuisine: {
        connect: { id: cuisine1.id },
      },
    },
  });

  // Seed Items
  const item1 = await prisma.item.create({
    // Using create as item name is not unique
    data: {
      name: "Spaghetti Carbonara",
      price: "15",
      description: "Classic Italian pasta dish",
      restaurant: {
        connect: { id: restaurant1.id },
      },
    },
  });

  // Seed Users
  const user1 = await prisma.user.upsert({
    where: { email: "john.doe@example.com" }, // Using email as it's unique
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

  // Seed Reviews
  const review1 = await prisma.review.create({
    // Using create as review text is not unique
    data: {
      first_name: "John",
      last_name: "Doe",
      text: "Amazing food!",
      rating: 4.5,
      restaurant: {
        connect: { id: restaurant1.id },
      },
      user: {
        connect: { id: user1.id },
      },
    },
  });

  // Seed Tables
  const table1 = await prisma.table.create({
    // Using create as tables don't have unique fields suitable for seeding
    data: {
      seats: 4,
      restaurant: {
        connect: { id: restaurant1.id },
      },
    },
  });

  // Seed Bookings
  const booking1 = await prisma.booking.create({
    // Using create as bookings don't have unique fields suitable for seeding
    data: {
      number_of_people: 4,
      booking_time: new Date(),
      booker_email: "john.doe@example.com",
      booker_phone: "123-456-7890",
      booker_first_name: "John",
      booker_last_name: "Doe",
      restaurant: {
        connect: { id: restaurant1.id },
      },
    },
  });

  // Seed BookingsOnTables
  await prisma.bookingsOnTables.create({
    // Using create as bookingsOnTables don't have unique fields suitable for seeding
    data: {
      booking: {
        connect: { id: booking1.id },
      },
      table: {
        connect: { id: table1.id },
      },
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
