import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, Calendar, MessageCircleCode, Settings2Icon } from "lucide-react";

interface NotificationsDropdownProps {
  id: string;
  title: string;
  messages: string;
  type: "appointment" | "reminder" | "system" | "message";
  timestamp: string;
  read: boolean;
}
const mockNotifications: NotificationsDropdownProps[] = [
  {
    id: "1",
    title: "Appointment Reminder",
    messages: "You have an appointment scheduled for tomorrow.",
    type: "appointment",
    timestamp: "2024-01-01T10:00:00Z",
    read: false,
  },
  {
    id: "2",
    title: "Reminder",
    messages: "",
    type: "reminder",
    timestamp: "",
    read: false,
  },
  {
    id: "3",
    title: "System Update",
    messages: "A new version of the system is available.",
    type: "system",
    timestamp: "2024-01-01T09:00:00Z",
    read: false,
  },
  {
    id: "4",
    title: "Message",
    messages: "",
    type: "message",
    timestamp: "",
    read: false,
  },
];
const getNotifictionIcon = (type: NotificationsDropdownProps["type"]) => {
  switch (type) {
    case "appointment":
      return <Calendar />;
    case "reminder":
      return <Bell />;
    case "system":
      return <Settings2Icon />;
    case "message":
      return <MessageCircleCode />;
    default:
      return ;
  }
}
const NotificationsDropdown = () => {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button>
           <Bell />
       </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          Notifications
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea>
          {mockNotifications.map((notification) => (
            <DropdownMenuItem key={notification.id}>
              <div className="flex items-center gap-2">
                {getNotifictionIcon(notification.type)}
                <span>{notification.title}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NotificationsDropdown
