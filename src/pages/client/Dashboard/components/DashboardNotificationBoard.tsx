import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface Notification {
  id: string;
  task: string;
  course: string;
  status: string;
  date: string;
}

interface DashboardNotificationBoardProps {
  title: string;
  description: string;
  notifications: Notification[];
}

export default function DashboardNotificationBoard({
  title,
  description,
  notifications,
}: DashboardNotificationBoardProps) {
  return (
    <Card className="xl:col-span-2 max-w-2xl min-w-72">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link to="/tasks">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <ScrollArea className="h-[50vh]">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notifications.map((notification) => (
                <TableRow key={notification.id}>
                  <TableCell>
                    <div className="font-medium">{notification.task}</div>
                    <div className="text-sm text-muted-foreground md:inline">
                      {notification.course}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className="text-xs" variant="outline">
                      {notification.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {notification.date}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
