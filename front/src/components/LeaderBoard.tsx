import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import type { User } from '@shared_types';

type LeaderBoardProps = {
  users: User[];
  currentUser: string; // username of the current user
};

const LeaderBoard: React.FC<LeaderBoardProps> = ({ users, currentUser }) => {
  // Sort users by overallScore in descending order and assign ranks
  const rankedUsers = [...users]
    .sort((a, b) => b.overallScore - a.overallScore) // Sort by overallScore descending
    .map((user, _, sortedArray) => ({
      ...user,
      rank:
        sortedArray.findIndex((u) => u.overallScore === user.overallScore) + 1, // Handle ties in rank
    }));

  return (
    <TableContainer component={Paper} sx={{ margin: 'auto', marginTop: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align='center'>
              <b>Rank</b>
            </TableCell>
            <TableCell align='center'>
              <b>Username</b>
            </TableCell>
            <TableCell align='center'>
              <b>Score</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rankedUsers.map((user) => (
            <TableRow
              key={user.username}
              sx={{
                backgroundColor:
                  user.username === currentUser
                    ? 'rgba(63, 81, 181, 0.1)'
                    : 'inherit',
                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
              }}
            >
              <TableCell align='center'>{user.rank}</TableCell>
              <TableCell
                align='center'
                sx={{
                  fontWeight: user.username === currentUser ? 'bold' : 'normal',
                }}
              >
                {user.username}
              </TableCell>
              <TableCell align='center'>{user.overallScore}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LeaderBoard;
