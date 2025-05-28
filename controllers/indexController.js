const { PrismaClient } = require("../generated/prisma");
const _ = require("lodash");

const prisma = new PrismaClient();

exports.getAllGames = async (req, res) => {
  const games = await prisma.photo.findMany({
    include: {
      Character: true,
    },
  });

  if (!games) {
    res.sendStatus(500);
  }

  res.json({ games });
};

exports.validateCoordinates = async (req, res) => {
  const photo = await prisma.photo.findFirst({
    where: {
      id: Number(req.params.photoId),
    },
    include: {
      Character: true,
    },
  });
  const clickCoordinates = req.body.coordinates;
  const characterId = Number(req.body.characterId);
  const characterToVerify = photo.Character.filter(
    (char) => char.id === characterId
  )[0];

  // Validate x click coordinate
  // if it is between the the acceptable horizontal pixels
  const xValid = _.inRange(
    clickCoordinates.x,
    characterToVerify.coordinatesRanges.x1,
    characterToVerify.coordinatesRanges.x2
  );

  // Validate y click coordinate
  // if it is between the the acceptable horizontal pixels
  const yValid = _.inRange(
    clickCoordinates.y,
    characterToVerify.coordinatesRanges.y1,
    characterToVerify.coordinatesRanges.y2
  );

  if (xValid && yValid) {
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
};
