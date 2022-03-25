import React from "react";
import NextLink from "next/link";
import {
  List,
  Box,
  Divider,
  ListItem,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/layout";
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from "react-icons/md";
import NavMenuItem from "./components/NavMenuItem";
import Logo from "./components/Logo";

const navMenu = [
  { id: 1, name: "Home", icon: MdHome, route: "/" },
  { id: 2, name: "Search", icon: MdSearch, route: "/search" },
  { id: 3, name: "Your Library", icon: MdLibraryMusic, route: "/library" },
];
const musicMenu = [
  {
    id: 1,
    name: "Create Playlist",
    icon: MdPlaylistAdd,
    route: "/",
  },
  {
    id: 2,
    name: "Favorites",
    icon: MdFavorite,
    route: "/favorites",
  },
];
const playLists = new Array(30).fill(1).map((_, index) => `Playlist ${index}`);

const Sidebar = () => {
  return (
    <Box width="100%" height="calc(100vh - 100px)" bg="black" paddingX="5px">
      <Box paddingY="20px">
        <Logo />
      </Box>
      <Box marginBottom="20px">
        <List spacing={2}>
          {navMenu.map(({ name, icon, route }) => (
            <NavMenuItem key={name} href={route} icon={icon}>
              {name}
            </NavMenuItem>
          ))}
        </List>
      </Box>
      <Box marginTop="20px">
        <List spacing={2}>
          {musicMenu.map(({ name, icon, route }) => (
            <NavMenuItem key={name} href={route} icon={icon}>
              {name}
            </NavMenuItem>
          ))}
        </List>
      </Box>
      <Divider color="gray.800" marginY="10px" />
      <Box
        height="52%"
        overflowY="auto"
        paddingY="20px"
        css={{
          "&::-webkit-scrollbar": {
            backgroundColor: "black",
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "grey",
            borderRadius: "24px",
          },
        }}
      >
        <List spacing={2}>
          {playLists.map((playListName) => (
            <ListItem key={playListName}>
              <LinkBox>
                <NextLink href="/" passHref>
                  <LinkOverlay>{playListName}</LinkOverlay>
                </NextLink>
              </LinkBox>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
