import Head from "next/head";
import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetupPage() {
  const router = useRouter();
  const addMeetupHandler = async function (meetupData) {
    // const res = await fetch("/api/new-meetup", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(meetupData),
    // });

    // const result = await res.json();
    // console.log(result);
    router.push("/");
  };
  return (
    <>
      <Head>
        <title>Create a new meetup event</title>
        <meta
          name="description"
          content="let's create new meetup event to find out someone who has same interest"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
}

export default NewMeetupPage;
