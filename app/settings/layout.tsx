import dynamic from 'next/dynamic';

import { revalidateTag } from 'next/cache';

import { BaseComponent } from '../_interfaces/components'

import "@/styles/layout/settings-section.scss";
import SettingsProvider from '../_context/settingsContext';
import { Metadata } from 'next';
import { FC } from 'react';
import { getLoggedUser } from '../_actions/userActions';
import { UserProvider } from '../_context/userContext';

const DynamicSettingsMenu = dynamic(() => import('./_components/menuSettings'))

export const metadata: Metadata = {
  title: "Settings",
};

const Layout: FC<BaseComponent> = async ({ children }) => {
  // revalidateTag('logged-user')
  const loggedUser = await getLoggedUser()

  return (
    <section className="l-settings-section">
      <h3 className="l-settings-section__heading">Configuracion</h3>

      <div className="l-settings-section__container">
        <DynamicSettingsMenu />

        <div className="l-settings-section__main">
          <UserProvider initialValue={loggedUser}>
            <SettingsProvider>
              {children}
            </SettingsProvider>
          </UserProvider>
        </div>
      </div>
    </section>
  )
}

export default Layout