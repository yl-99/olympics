import React, { useState } from 'react'
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { Link, Routes, Route, useLocation } from 'react-router-dom'
import Home from '../../pages/Home'
import Athletes from '../../pages/Athletes'
import Coaches from '../../pages/Coaches'
import Countries from '../../pages/Countries'
import Teams from '../../pages/Teams'
import Dates from '../../pages/Dates'


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//     padding: theme.spacing(0, 2),
//     height: '100%',
//     position: 'absolute',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
// }));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
            '&:focus': {
                width: '25ch',
            },
        },
    },
}));

function NavBar() {
    const location = useLocation();
    const locationName = location.pathname.substr(1).toUpperCase()

    const [filter, setFilter] = useState('')
    const handleSearchChange = (event) => {
        setFilter(event.currentTarget)
    }

    const [searchIteam, setSearchItem] = useState('')
    const handleSearchClick = () => {
        setSearchItem(filter.value)
    }

    const handleSearchEnter = (event) => {
        if (event.key === 'Enter') {
            setSearchItem(filter.value)
        }
        else {
            return 0
        }
    }


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event) => {
        setAnchorEl(null);
        setFilter("")
        setSearchItem("")
        document.getElementById("searchBar").value = ""
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleMenuClick}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="fade-menu"
                        MenuListProps={{
                            'aria-labelledby': 'fade-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                    >
                        <MenuItem onClick={handleClose} component={Link} to='/home' >Home</MenuItem>
                        <MenuItem onClick={handleClose} component={Link} to='/athletes'>Athletes</MenuItem>
                        <MenuItem onClick={handleClose} component={Link} to='/coaches'>Coaches</MenuItem>
                        <MenuItem onClick={handleClose} component={Link} to='/countries'>Countries</MenuItem>
                        <MenuItem onClick={handleClose} component={Link} to='/teams'>Teams</MenuItem>
                        <MenuItem onClick={handleClose} component={Link} to='/dates'>Dates</MenuItem>
                    </Menu>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        {`${locationName}`}
                    </Typography>
                    <Search>

                        <IconButton
                            edge="start"
                            color="inherit"
                            sx={{ mr: 2 }}
                            onClick={handleSearchClick}>
                            <SearchIcon />
                        </IconButton>

                        <StyledInputBase
                            placeholder={`Search ${locationName}..`}
                            inputProps={{ 'aria-label': 'search' }}
                            id="searchBar"
                            onChange={handleSearchChange}
                            onKeyDown={handleSearchEnter}
                        />
                    </Search>
                </Toolbar>
            </AppBar>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/home' element={<Home />} />
                <Route path='/athletes' element={<Athletes userSearch={`${searchIteam}`} />} />
                <Route path='/coaches' element={<Coaches userSearch={`${searchIteam}`} />} />
                <Route path='/countries' element={<Countries userSearch={`${searchIteam}`} />} />
                <Route path='/teams' element={<Teams userSearch={`${searchIteam}`} />} />
                <Route path='/dates' element={<Dates userSearch={`${searchIteam}`} />} />
            </Routes>
        </Box>

    );
}

export default NavBar