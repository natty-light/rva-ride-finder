import Drawer from "@/components/Drawer";
import { FC, MouseEvent } from "react";

type ProfileDrawerProps = {
  handleSignOut: (e: MouseEvent) => void;
  isOpen: boolean;
  onClose: () => void;
}

const ProfileDrawer: FC<ProfileDrawerProps> = ({ handleSignOut, onClose, isOpen }) => {

  return (
    <Drawer onClose={onClose} isOpen={isOpen} position="right">
      <div>
        <h3>
          Profile
        </h3>
        <a href="#" onClick={handleSignOut} className="mt-auto">
          Sign Out
        </a>
      </div>
    </Drawer>
  )
}

export default ProfileDrawer;