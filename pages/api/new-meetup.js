// POST api/new-meetup
import { MongoClient } from "mongodb";

async function AddNewMeetupHandler(req, res) {
  console.log(req.method);
  if (req.method !== "POST") return;
  const data = req.body;
  console.log(data);
  // connect project to MongoDB
  const client = await MongoClient.connect(
    `mongodb+srv://cindy:Cindy123@cluster0.m3jelma.mongodb.net/?retryWrites=true&w=majority`
  );
  // get database on my mongoDB
  const db = client.db("meetup");
  // get collection from database
  // 一筆資料稱作document，多筆document匯聚而成的叫做collection
  const meetupsCollection = db.collection("meetups");

  // insert a document into the collection
  const result = await meetupsCollection.insertOne(data);

  // disconnect to MongoDB
  client.close();
  res.status(201).json({ message: "meetup inserted!" });
}

export default AddNewMeetupHandler;
