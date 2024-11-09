import dynamic from "next/dynamic";

import type { FC } from "react";

import UserSettingsSkeleton from "../_skeletons/userSettingsSkeleton";

const DynamicUserSettings = dynamic(() => import('./_components/userSettings'), { ssr: false, loading: () => <UserSettingsSkeleton /> })

const Page: FC = () => {
  return (
    <DynamicUserSettings />
  );
}

export default Page