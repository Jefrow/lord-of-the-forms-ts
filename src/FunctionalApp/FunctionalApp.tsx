import { ProfileInformation } from "../ProfileInformation";
import { UserInformation } from "../types";
import { FunctionalForm } from "./FunctionalForm";
import { useState } from 'react'

export const FunctionalApp = () => {

  const [userInfo, setUserInfo] = useState<null | UserInformation>(null); 

  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation userData={userInfo} />
      <FunctionalForm handleUserInformation={(userInfo) => {
        setUserInfo(userInfo)
      }}/>
    </>
  );
};
