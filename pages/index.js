import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
  return (
    <>
      <Head>
        <title>Meet up!</title>
        <meta
          name="description"
          content="Find a huge list of meetup  events!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

export async function getStaticProps() {
  console.log("rebuild");
  const client = await MongoClient.connect(
    `mongodb+srv://cindy:${process.env.MONGO_PASSWORD}@cluster0.m3jelma.mongodb.net/?retryWrites=true&w=majority`
  );
  const db = client.db("meetup");
  const meetupsCollection = db.collection("meetups");
  const rawMeetups = await meetupsCollection.find().toArray();
  const meetups = rawMeetups.map((meetup) => {
    return {
      id: String(meetup._id),
      title: meetup.title,
      image: meetup.image,
      address: meetup.address,
    };
  });

  client.close();

  return { props: { meetups: meetups }, revalidate: 30 };
}
export default HomePage;
