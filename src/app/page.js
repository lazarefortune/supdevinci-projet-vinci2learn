import {getServerSession} from "next-auth";
import authOptions from "@/app/libs/auth";
import LogoutButton from "@/app/components/LogoutButton";
import CourseList from "@/app/components/CourseList";

export default async function Home() {

    const session = await getServerSession(authOptions)


  return (
    <>
        <CourseList />
    </>
  );
}
