import { getDrafts } from "@/app/_actions/draftsActions";

import DraftsList from "./draftsList";

import "@/styles/components/my-article.scss";

const Drafts = async () => {
  const myDrafts = await getDrafts();

  return (
    <>
      <DraftsList myDrafts={myDrafts}/>

      {myDrafts.length < 3 && (
        <a href="/write" className="l-drafts__new">
          <span>New draft</span>
        </a>
      )}
    </>
  );
};

export default Drafts;
