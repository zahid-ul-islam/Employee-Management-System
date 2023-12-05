import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {
  Avatar,
  Box,
  Card,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/Contexts';
import { showUserType } from '../utils/enums';

const Item = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'start',
  color: theme.palette.secondary.main,
}));

const Profile = () => {
  const [dates] = useState([
    '5-1-2023',
    '9-3-2023',
    '11-6-2023',
    '14-8-2023',
  ]);

  const { user } = useContext(UserContext);

  return (
    <>
      <Box sx={
        {
          bgcolor: 'backgroundColor.main',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems:'center',
          m: 3
        }
      }>
        <Grid container justifyContent='space-between' spacing={2} sx={{bgcolor:'orange'}}>
          
          <Grid item xs={18} sx={{display:'flex',
           justifyContent:'center', 
           alignContent:'center',
           alignItems:'center'}} >
            <Item>
              <Box sx={{ m: 3, color: 'black' }}>
                <Box component='div' sx={{ display: 'flex', justifyContent: 'space-between'}}>
                  <Typography variant='h3' sx={{ color: 'black'}}>
                    Hello, {user.fname} {user.lname}
                  </Typography>
                  <IconButton sx={{ bgcolor: '#5cb6f2', width: '55px'}}>
                    <ModeEditIcon />
                  </IconButton>
                </Box>
                <Typography variant='body1'>
                  {user.position}
                </Typography>
              </Box>
              <Divider sx={{ m:3 }}>Profile</Divider>
              <Box sx={{m:3, color: 'black', border: '1px solid pink'}}>
                <Typography variant='h5' sx={{ m:2 }}>
                  Name: {`${user.fname} ${user.lname}`}
                </Typography>
                <Typography variant='h5' sx={{ m:2 }}>
                  Email: {`${user.email}`}
                </Typography>
                <Typography variant='h5' sx={{ m:2 }}>
                  Age: {`${user.age}`}
                </Typography>
                <Typography variant='h5' sx={{ m:2 }}>
                  Department: {`${user.department}`}
                </Typography>
                <Typography variant='h5' sx={{ m:2 }}>
                  Position: {`${user.position}`}
                </Typography>
                <Typography variant='h5' sx={{ m:2 }}>
                  Salary: {`${user.salary}`}
                </Typography>
                <Typography variant='h5' sx={{ m:2 }}>
                  Phone No.: {`${user.phone}`}
                </Typography>
                <Typography variant='h5' sx={{ m:2 }}>
                  Address: {`${user.address}`}
                </Typography>
                <Typography variant='h5' sx={{ m:2 }}>
                  User Type: {`${showUserType[user.type]}`}
                </Typography>
              </Box>
            </Item>
          </Grid>
          
        </Grid>
      </Box>
    </>
  );
};

export default Profile;