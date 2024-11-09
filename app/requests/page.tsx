import { getRequestById, getRequests } from '../_actions/requestsActions';

import { HeadingSecondary } from '../_components/headings';
import Pagination from '../_components/pagination';
import Message from '../_components/message';
import SearchBar from './_components/searchBar';
import FilterSort from './_components/filterSort';
import RequestsTable from './_components/requestsTable';

import "@/styles/layout/requests-panel.scss";
import "@/styles/components/requests-options.scss";
import "@/styles/pages/requests.scss";

interface Props{
  searchParams: {
    page: string,
    search: string,
    status: string,
    type: string,
    sort: string
  }
}

const Page: React.FC<Props> = async ({ searchParams }) => {
  const { page, search } = searchParams
  
  let requests
  let totalPages = 0

  if (search) {
    requests = await getRequestById(search)
  } else {
    
    const queryString = `${searchParams.status ? '&status=' + searchParams.status : ''}${searchParams.type ? '&type=' + searchParams.type : ''}${searchParams.sort ? '&sort=' + searchParams.sort : '&sort=-date'}`

    const response = await getRequests(page || "1", queryString);
    requests = response.requests
    totalPages = response.totalPages
  }

  return (
    <div className="l-requests">
      <HeadingSecondary>Requests and tickets</HeadingSecondary>

      <div className="l-requests-panel">
        <div className="c-requests-options">
          <SearchBar />

          <FilterSort />
        </div>

        {requests.length > 0 && <RequestsTable requests={requests}/>}

        {requests.length === 0 && (
          <Message message="There is no requests found" />
        )}

        {totalPages > 1 && <Pagination pages={totalPages} />}
      </div>
    </div>
  );
}

export default Page