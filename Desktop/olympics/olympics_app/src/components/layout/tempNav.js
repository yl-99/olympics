// import { Link } from "react-router-dom"
// import { Routes, Route } from 'react-router-dom'
// import React from "react";
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import SpeedDial from '@mui/material/SpeedDial';
// import SpeedDialIcon from '@mui/material/SpeedDialIcon';
// import SpeedDialAction from '@mui/material/SpeedDialAction';
// import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
// import DirectionsRunRoundedIcon from '@mui/icons-material/DirectionsRunRounded';
// import SupervisorAccountRoundedIcon from '@mui/icons-material/SupervisorAccountRounded';
// import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
// import GroupWorkRoundedIcon from '@mui/icons-material/GroupWorkRounded';
// import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
// import Home from '../../pages/Home'
// import Athletes from '../../pages/Athletes'
// import Coaches from '../../pages/Coaches'
// import Countries from '../../pages/Countries'
// import Teams from '../../pages/Teams'
// import Dates from '../../pages/Dates'

// const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
//     position: 'absolute',
//     '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
//         bottom: theme.spacing(2),
//         right: theme.spacing(2),
//     },
//     '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
//         top: theme.spacing(2),
//         left: theme.spacing(2),
//     },
// }));

// const actions = [
//     { icon: <Link to="/home"><HomeRoundedIcon /></Link>, name: "Home" },
//     { icon: <Link to="/athletes"><DirectionsRunRoundedIcon /></Link>, name: 'Athletes' },
//     { icon: <Link to="/coaches"><SupervisorAccountRoundedIcon /></Link>, name: 'Coaches' },
//     { icon: <Link to="/countries"><FlagRoundedIcon /></Link>, name: 'Countries' },
//     { icon: <Link to="/teams"><GroupWorkRoundedIcon /></Link>, name: 'Teams' },
//     { icon: <Link to="/dates"><DateRangeRoundedIcon /></Link>, name: 'Dates' },
// ];

// function NavBar() {
//     return (
//         <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
//             <Box sx={{ position: 'relative', mt: 3, height: 100 }}>
                
//                     <StyledSpeedDial
//                         ariaLabel="SpeedDial playground example"
//                         icon={<SpeedDialIcon />}
//                         direction={"down"}
//                     >
//                         {actions.map((action) => (
//                             <SpeedDialAction
//                                 key={action.name}
//                                 icon={action.icon}
//                                 tooltipTitle={action.name}
//                             />
//                         ))}
//                     </StyledSpeedDial>
//                     <Routes>
//                         <Route path='/' element={<Home />} />
//                         <Route path='/home' element={<Home />} />
//                         <Route path='/athletes' element={<Athletes />} />
//                         <Route path='/coaches' element={<Coaches />} />
//                         <Route path='/countries' element={<Countries />} />
//                         <Route path='/teams' element={<Teams />} />
//                         <Route path='/dates' element={<Dates />} />
//                     </Routes>
                
//             </Box>
//         </Box>
//     );
// }

// export default NavBar