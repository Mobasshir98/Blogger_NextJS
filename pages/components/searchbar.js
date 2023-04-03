import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  display:'flex',
  border:"1px solid black",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.common.white,
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  margin:"auto",
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  '& .MuiInputBase-root': {
    color: 'inherit',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export default function SearchComponent({handleSearch,searchTerm}) {
  

  return (
    <SearchContainer >
      <SearchInput
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        value={searchTerm}
        onChange={handleSearch}
      />
      <SearchIconWrapper>
        <IconButton aria-label="search">
          <SearchIcon />
        </IconButton>
      </SearchIconWrapper>
    </SearchContainer>
  );
}
