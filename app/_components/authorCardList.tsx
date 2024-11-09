import { UserPreview } from "../_interfaces/api";
import AuthorCard from "./authorCard";
import CardsList from "./cardsList"
import Message from "./message";

interface Props{
  authorsList: UserPreview[],
  emptyMessage: string, 
}

const AuthorCardList: React.FC<Props> = ({authorsList, emptyMessage}) => {
  if(!authorsList.length && !emptyMessage) return null

  return (
    <CardsList type="authors">
      {!authorsList.length && <Message message={emptyMessage} />}

      {authorsList.length > 0 &&
        authorsList.map((author: UserPreview) => (
          <AuthorCard author={author} key={author._id}/>
        ))}
    </CardsList>
  );
}

export default AuthorCardList