"use client"

import { approvePublish, rejectPublish } from "@/app/_actions/requestsActions"
import { useAlertContext } from "@/app/_context/alertContext"
import { useSocketContext } from "@/app/_context/socketContext"
import { Request } from "@/app/_interfaces/api"
import { useRouter } from "next/navigation"

interface Props {
  request: Request
}

const RequestActions: React.FC<Props> = ({ request }) => {
  const { setAlert } = useAlertContext(state => state)
  const { sendNotification } = useSocketContext(state => state)
  const { replace } = useRouter()

  const handleApprove = async () => {
    let apiResponse
    if (request.type === 'publish') {
      const formData = {
        article: request.article!,
        draft: request.draft!
      }

      apiResponse = await approvePublish(request._id, formData)
    }

    sendNotification(request.requester._id)
    setAlert(apiResponse?.success ? 'success' : 'error', apiResponse?.message!)
    replace('/requests')
  }

  const handleReject = async () => {
    let apiResponse
    if (request.type === 'publish') {
      const formData = {
        article: request.article!,
        draft: request.draft!
      }

      apiResponse = await rejectPublish(request._id, formData)
    }

    sendNotification(request.requester._id);
    setAlert(apiResponse?.success ? 'success' : 'error', apiResponse?.message!)
    replace("/requests");
  }

  return (
    <div className="c-request-details__actions">
      <button
        onClick={handleReject}
        className="c-request-details__action c-request-details__action_reject"
      >
        Reject
      </button>
      <button
        onClick={handleApprove}
        className="c-request-details__action c-request-details__action_approve"
      >
        Approve
      </button>
    </div>
  );
}

export default RequestActions