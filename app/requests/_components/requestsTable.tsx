import type { Request } from "@/app/_interfaces/api";
import { type FC } from "react"

import "@/styles/layout/requests-table.scss";
import RequestRow from "./requestRow";

interface Props {
  requests: Request[]
}

const RequestsTable: FC<Props> = ({ requests }) => {
  return (
    <table className="l-requests-table">
      <thead>
        <tr>
          <th>Status</th>
          <th>Request type</th>
          <th>Requester</th>
          <th>Request date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((request) => (
          <RequestRow request={request} key={request._id}/>
        ))}
      </tbody>
    </table>
  );
}

export default RequestsTable