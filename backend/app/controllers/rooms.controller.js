import fs from "fs";
import uuid from "uuid/v4";
import path from "path";

const roomFilePath = "../file/matrix.room.web.json";

const fetchFromFile = () => {
  const roomFileExists = fs.existsSync(roomFilePath);
  if (!roomFileExists) {
    createRoomFileSync();
  }

  const roomsData = fs.readFileSync(roomFilePath);
  const roomsDetail = JSON.parse(roomsData);

  return new Promise(resolve => resolve(roomsDetail));
};

const createRoomFileSync = () => {
  const roomsData = [];

  roomsData[0] = {
    id: uuid(),
    name: "Bem Vindo a Paroquia São João Batista",
    disableMeeting: true,
  };

  const niceNames = [
    "Sala do Padre ",
    "Secretaria Paroquial",
    "Reuniao de Dirigentes",
    "Reuniao - Pastoral 1",
    "Reuniao - Pastoral 2",
    "Reuniao - Pastoral 3",
    "Encontrinhos ECC",
    "Encontrinhos Noivos",
    "Sala de Oração",
  ];

  for (const niceName of niceNames) {
    roomsData.push({
      id: uuid(),
      name: niceName
    });
  }

  fs.mkdirSync(path.dirname(roomFilePath), { recursive: true });
  fs.writeFileSync(roomFilePath, JSON.stringify(roomsData));
};

const fetchFromEnvironment = (env) => {
  const roomsData = env.ROOMS_DATA;
  const roomsDetail = JSON.parse(roomsData);

  return new Promise(resolve => resolve(roomsDetail));
};

const fetchRooms = (strategy) => {
  switch (strategy) {
    // TODO add suport to fetch from endpoint
    case "ENVIRONMENT":
      return fetchFromEnvironment(process.env);
    default:
      return fetchFromFile();
  }
};

export default fetchRooms;
