import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { artistsData } from "./seedData";

export const prisma = new PrismaClient();

const run = async () => {
  await Promise.all(
    artistsData.map(async (artist) => {
      return prisma.artist.upsert({
        where: { name: artist.name },
        update: {},
        create: {
          name: artist.name,
          songs: {
            create: artist.songs.map((song) => ({
              name: song.name,
              duration: song.duration,
              url: song.url,
            })),
          },
        },
      });
    })
  );

  const salt = bcrypt.genSaltSync();
  const user = await prisma.user.upsert({
    where: { email: "user@test.com" },
    update: {},
    create: {
      email: "user@test.com",
      password: bcrypt.hashSync("my-secret-pw", salt),
    },
  });

  const songs = await prisma.song.findMany({});

  await Promise.all(
    new Array(10).fill(1).map(async (_, index) => {
      return prisma.playlist.create({
        data: {
          name: `Playlist #${index + 1}`,
          user: {
            /**
             * @description connect each user by id =>user.id, see schema: @relation(fields: [userId], references: [id]), which will create a reference to a single user ID, eg user: 123
             */
            connect: { id: user.id },
          },
          songs: {
            /**
             * @description connect songs to song entity by id=>song.id for each item, see schema: `many-to-many`, which will create an array of song's IDs, eg. `songs:[11, 21, 2, 5]`
             */
            connect: songs.map((song) => ({
              id: song.id,
            })),
          },
        },
      });
    })
  );
};

run()
  .then(() => {})
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error("Error: ", JSON.stringify(error));
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
