import { useEffect, useRef, useState } from 'react';
import ApiSdk from '../api/apiSdk';
import ContainerPage from '../components/ContainerPage';
import LeaderBoard from '../components/LeaderBoard';
import type { User } from '@shared_types';
import { useAppSelector } from '../redux/hook';
import FullScreenSpinner from '../components/FullScreenSpinner';

function LeaderBoardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const hasFetched = useRef(false);
  const api = new ApiSdk();
  const { token } = useAppSelector((state) => state.session);
  const { userInfo } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      api.getAllUsers(token).then((users) => {
        setUsers(users);
      });
    }
    // eslint-disable-next-line
  }, [token]);

  if (!hasFetched) return <FullScreenSpinner />;

  return (
    <ContainerPage title={'LeaderBoard'}>
      <LeaderBoard users={users} currentUser={userInfo.username}></LeaderBoard>
    </ContainerPage>
  );
}

export default LeaderBoardPage;
