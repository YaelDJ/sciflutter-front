import Image from 'next/image'

import SearchBar from './searchBar';

import { getCookieTheme } from '../_utils/getCookieTheme';
import { mainLogoDark, mainLogoLight } from '../_utils/logos';
import '@/styles/components/mainSearch.scss'

const MainSearch: React.FC = () => {
  const theme = getCookieTheme()

  return (
    <section className="b-main-search">
      <Image
        src={theme === "light" ? mainLogoLight : mainLogoDark}
        alt="Main logo"
        className="b-main-search__logo"
        style={{
          width: "auto",
        }}
      />

      <div className="b-main-search__bar">
        <SearchBar />
      </div>
    </section>
  );
}

export default MainSearch