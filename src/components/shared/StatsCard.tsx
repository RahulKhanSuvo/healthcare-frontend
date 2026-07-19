import { createElement } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { getIconComponent } from "@/lib/iconMapper";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: number;
  iconName: string;
  description?: string;
  className?: string;
}

export const StatsCard = ({ title, value, iconName, description, className }: StatsCardProps) => {
  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="">{title}</CardTitle>
        <div>{createElement(getIconComponent(iconName), { className: "w-6 h-6" })}</div>
      </CardHeader>
      <CardContent>
        <div>{value}</div>
        {description && <p>{description}</p>}
      </CardContent>
    </Card>
  );
};
