import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { UserInfo } from "@/types/user.types"

const UserDropdown = ({userInfo}: {userInfo: UserInfo}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-2">
          <span>{userInfo.name.charAt(0).toUpperCase() + userInfo.name.slice(1)}</span>
        </div>
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
  )
}

export default UserDropdown
