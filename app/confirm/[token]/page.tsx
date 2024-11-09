"use server"
import Notification from "@/app/_components/notification";

import { confirmAccount } from "@/app/_actions/authActions";

import { ArrowLeft } from "@phosphor-icons/react/dist/ssr/ArrowLeft";

import Link from "next/link";

interface Props {
  params: {
    token: string;
  };
}

const Page: React.FC<Props> = async ({ params }) => {
  const apiResponse = await confirmAccount(params.token)

  if(apiResponse.success) return (
    <>
      <Notification type="success">
        {apiResponse.message}
      </Notification>

      <Link href="/"><ArrowLeft size={32}/> Volver al inicio</Link>
    </>
  );

  return (
    <>
      <Notification type="error">
        {apiResponse.message}
      </Notification>

      <Link href="/"><ArrowLeft size={24}/> Volver al inicio</Link>
    </>
  );
};

export default Page;
