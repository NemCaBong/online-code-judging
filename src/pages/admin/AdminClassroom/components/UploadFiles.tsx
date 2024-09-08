import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const UploadFiles = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Files</CardTitle>
        <CardDescription>All upload files are here</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] md:h-[400px] lg:h-[520px]">
          <div className="p-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File Name</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead className="hidden xl:table-cell">
                    Uploaded At
                  </TableHead>
                  <TableHead>By</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(30)].map((_, index) => (
                  <TableRow
                    key={index}
                    className={index % 2 === 1 ? "bg-accent" : " "}
                  >
                    <TableCell>File 1</TableCell>
                    <TableCell>1.2 MB</TableCell>
                    <TableCell className="hidden xl:table-cell">
                      2021-09-01
                    </TableCell>
                    <TableCell>Nguyễn Minh Hoàng</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
