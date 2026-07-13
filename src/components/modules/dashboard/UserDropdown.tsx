import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserInfo } from "@/types/user.types";

const UserDropdown = ({ userInfo }: { userInfo: UserInfo }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="size-6 rounded-full border flex  items-center">
        <span className="text-center">
          {userInfo.name.charAt(0).toUpperCase()}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <span>{userInfo.email}</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>{userInfo.role}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
