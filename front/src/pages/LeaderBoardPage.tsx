import ContainerPage from '../components/ContainerPage';
import LeaderBoard from '../components/LeaderBoard';

function LeaderBoardPage() {
  const mockUsers = [
    { username: 'Alice', overallScore: 1500 },
    { username: 'Bob', overallScore: 1400 },
    { username: 'Charlie', overallScore: 1350 },
    { username: 'You', overallScore: 1400 },
    { username: 'Eve', overallScore: 1250 },
  ];

  return (
    <ContainerPage title={'LeaderBoard'}>
      <LeaderBoard users={mockUsers} currentUser='You'></LeaderBoard>
    </ContainerPage>
  );
}

export default LeaderBoardPage;
