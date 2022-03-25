import React, { memo } from "react";
import NextLink from "next/link";
import { ListItem, ListIcon, LinkOverlay, LinkBox } from "@chakra-ui/layout";
import { IconType } from "react-icons";

type Props = {
  href: string;
  icon: IconType;
  children: React.ReactNode;
};

const NavMenuItem = ({ href, icon, children }: Props) => (
  <ListItem paddingX="20px" fontSize="16px">
    <LinkBox>
      <NextLink href={href} passHref>
        <LinkOverlay>
          <ListIcon as={icon} color="white" marginRight="20px" />
          {children}
        </LinkOverlay>
      </NextLink>
    </LinkBox>
  </ListItem>
);

export default memo(NavMenuItem);
