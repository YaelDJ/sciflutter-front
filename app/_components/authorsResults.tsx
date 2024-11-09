import Carrousel from './carrousel';
import { UserPreview } from '../_interfaces/api';

interface Props {
  authors: UserPreview[]
}

const AuthorsResults: React.FC<Props> = ({ authors }) => {
  return (
    <div className="l-results-authors">
      <Carrousel showButtons={authors.length > 4} itemsList={authors} />
    </div>
  );
}

export default AuthorsResults