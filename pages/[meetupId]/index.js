import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head";

function MeetupDetailPage(props) {
  return (
    <>
      <Head>
        <title>{`Event - ${props.meetupDetail.title}`}</title>
        <meta name="description" content={props.meetupDetail.description} />
      </Head>
      <MeetupDetail
        image={props.meetupDetail.image}
        title={props.meetupDetail.title}
        address={props.meetupDetail.address}
        description={props.meetupDetail.description}
      />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    `mongodb+srv://cindy:${process.env.MONGO_PASSWORD}@cluster0.m3jelma.mongodb.net/?retryWrites=true&w=majority`
  );
  const db = client.db("meetup");
  const meetupsCollection = db.collection("meetups");
  // second argument means that only catch documents containing _id feild
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  return {
    fallback: false,
    paths: meetups.map((meetup) => {
      return { params: { meetupId: meetup._id.toString() } };
    }),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    `mongodb+srv://cindy:${process.env.MONGO_PASSWORD}@cluster0.m3jelma.mongodb.net/?retryWrites=true&w=majority`
  );
  const db = client.db("meetup");
  const meetupsCollection = db.collection("meetups");
  const meetupDetail = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  return {
    props: {
      meetupDetail: {
        id: meetupDetail._id.toString(),
        title: meetupDetail.title,
        image: meetupDetail.image,
        address: meetupDetail.address,
        description: meetupDetail.description,
      },
    },
  };
}

export default MeetupDetailPage;
