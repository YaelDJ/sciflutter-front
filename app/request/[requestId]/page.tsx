import { approvePublish, getRequestById, rejectPublish } from "@/app/_actions/requestsActions"
import { HeadingSecondary } from "@/app/_components/headings"
import Message from "@/app/_components/message"
import { formatLongDate } from "@/app/_utils/dateUtils"
import LinkSimple from "@/app/_components/linkSimple"
import Link from "next/link"

import '@/styles/components/request-details.scss'
import RequestActions from "./_components/requestActions"

interface Props {
  params: {
    requestId: string
  }
}

const Page: React.FC<Props> = async ({ params }) => {
  const id = params.requestId
  const request = await getRequestById(id)
  
  if (!request.length) return (
    <div>
      <Message message="Request not found" />
      <Link href="/requests">Go back to requests</Link>
    </div>
  )

  return (
    <>
      <HeadingSecondary>Request details</HeadingSecondary>

      <div className="c-request-details">
        <div className="c-request-details__header">
          <p className="c-request-details__id">
            Request Id: <span>{request[0]._id}</span>
          </p>
          <p>
            <span className={request[0].status}>{request[0].status}</span>
          </p>
        </div>

        <div className="c-request-details__message">
          <p>{request[0].message ?? "I wish you can approved my article"}</p>

          {request[0].type === "publish" && (
            <LinkSimple href={`/article/${request[0].article}`} target="_blank">
              Read requested article
            </LinkSimple>
          )}
        </div>

        <div className="c-request-details__type">
          <p>Type: {request[0].type}</p>
        </div>

        <div className="c-request-details__footer">
          <p>
            Requester:{" "}
            <Link href={`/user/${request[0].requester._id}`} target="_blank">
              {request[0].requester.name} {request[0].requester.lastName}
            </Link>
          </p>
          <p>{formatLongDate(request[0].date)}</p>
        </div>

        {request[0].status === "pending" && request[0].type === "publish" && (
          <RequestActions request={request[0]}/>
        )}
      </div>
    </>
  );
}

export default Page