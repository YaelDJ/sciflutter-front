import type { User } from '@/app/_interfaces/api';

import { getArticlesOfAuthor } from '@/app/_actions/articleActions';

import { HeadingSecondary } from '@/app/_components/headings';
import ArticlePreviewList from '@/app/_components/articlePreviewList';
import Message from "@/app/_components/message";
import ProfileAboutMe from './profileAboutMe';

import "@/styles/layout/profile-content.scss";
import ProfileSocialLinks from './profileSocialLinks';

interface Props {
  user: User
}

const ProfileContent: React.FC<Props> = async ({ user }) => {
  const publishedArticles = await getArticlesOfAuthor(user._id)

  if(publishedArticles.length === 0) return (
    <Message message="Aún no hay articulos publicados"/>
  );

  return (
    <section className="l-profile-content">
      <div className="l-articles">
        <HeadingSecondary>Articulos publicados</HeadingSecondary>

        <ArticlePreviewList
          emptyMessage="No hay articulos publicados aún"
          articleList={publishedArticles}
        />
      </div>

      <div className="l-details">
        {user.description && (
          <ProfileAboutMe description={user.description} />
        )}

        {/* {(user.socialLinks.length > 0) && (
          <ProfileSocialLinks/>
        )} */}
      </div>
    </section>
  );
}

export default ProfileContent