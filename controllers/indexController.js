const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

exports.getAllGames = async (req, res) => {
  const games = await prisma.photo.findMany();

  if (!games) {
    res.sendStatus(500);
  }

  res.json({ games });
};
