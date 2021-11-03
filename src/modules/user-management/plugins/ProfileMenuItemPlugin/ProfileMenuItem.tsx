import { gql } from "@apollo/client";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { purple } from "@mui/material/colors";
import { useProfileMenuItemQueryQuery } from "generated/graphql";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import AuthManager from "utils/AuthManager";

export const PROFILE_MENU_ITEM_QUERY = gql`
  query ProfileMenuItemQuery {
    currentUser {
      id
      profilePictureUrl
      firstName
    }
  }
`;

const ProfileMenuItem = () => {
  const userQuery = useProfileMenuItemQueryQuery();
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const { t } = useTranslation();
  
  const onClose = () => {
    setMenuAnchor(null);
  };

  return userQuery.loading ? null : (
    <div>
      <Button
        onClick={(e) => setMenuAnchor(e.currentTarget)}
        variant="text"
        size="large"
        startIcon={
          <Avatar
            sx={{ bgcolor: purple[800] }}
            src={userQuery.data?.currentUser?.profilePictureUrl || "undefined"}
            alt={userQuery.data?.currentUser?.firstName}
          />
        }
        color="inherit"
        sx={{ textTransform: "none" }}
      >
        {userQuery.data?.currentUser?.firstName}
      </Button>
      <Menu
        id="menu-profile"
        anchorEl={menuAnchor}
        keepMounted
        open={Boolean(menuAnchor)}
        onClose={onClose}
      >
        <MenuItem
          onClick={async () => {
            onClose();
            await AuthManager.logout();
          }}
        >
          {t('user-management.plugins.profile_menu_item.btn_logout')}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileMenuItem;
