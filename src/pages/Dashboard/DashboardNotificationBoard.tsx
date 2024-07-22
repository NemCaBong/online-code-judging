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

export default function DashboardNotificationBoard() {
  return (
    <Card className="xl:col-span-2 max-w-2xl min-w-72">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Notifications Board</CardTitle>
          <CardDescription>
            Recent notifications from your classrooms
          </CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link to="#">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
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
            <TableRow>
              <TableCell>
                <div className="font-medium">Tìm tất cả số nguyên tố</div>
                <div className="text-sm text-muted-foreground md:inline">
                  Cơ sở lập trình
                </div>
              </TableCell>
              <TableCell className="text-center">
                <Badge className="text-xs" variant="outline">
                  Hoàn thành
                </Badge>
              </TableCell>
              <TableCell className="text-right">2023-06-23</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="font-medium">Tìm tất cả số nguyên tố</div>
                <div className="text-sm text-muted-foreground md:inline">
                  Cơ sở lập trình
                </div>
              </TableCell>
              <TableCell className="text-center">
                <Badge className="text-xs" variant="outline">
                  Hoàn thành
                </Badge>
              </TableCell>
              <TableCell className="text-right">2023-06-23</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="font-medium">Tìm tất cả số nguyên tố</div>
                <div className="text-sm text-muted-foreground md:inline">
                  Cơ sở lập trình
                </div>
              </TableCell>
              <TableCell className="text-center">
                <Badge className="text-xs" variant="outline">
                  Hoàn thành
                </Badge>
              </TableCell>
              <TableCell className="text-right">2023-06-23</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
