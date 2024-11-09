import { Request } from "@/app/_interfaces/api"
import { formatDate } from "@/app/_utils/dateUtils";
import { Check } from "@phosphor-icons/react/dist/ssr/Check";
import { ClockCountdown } from "@phosphor-icons/react/dist/ssr/ClockCountdown";
import { X } from "@phosphor-icons/react/dist/ssr/X";
import { FC } from "react"

enum RequestStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected"
}

const ICONS: {[key in RequestStatus]: JSX.Element} = {
  pending: <ClockCountdown size={24} />,
  rejected: <X size={24} />,
  approved: <Check size={24} />,
};

interface Props{
  request: Request
}

const RequestRow: FC<Props> = ({ request }) => {
  return (
    <tr className={request.status}>
      <th>
        {ICONS[(request.status as RequestStatus)]} {request.status}
      </th>
      <td>{request.type}</td>
      <td>{`${request.requester.name} ${request.requester.lastName}`}</td>
      <td>{formatDate(request.date)}</td>
      <td>
        <a href={`/request/${request._id}`}>VIEW</a>
      </td>
    </tr>
  );
}

export default RequestRow