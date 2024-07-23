import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

export function PostCard({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/avatars/01.png" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div className="w-full">
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <CardTitle>Phạm Thảo</CardTitle>
                  <Badge
                    variant="secondary"
                    className="ml-3 leading-1.5 text-xs font-semibold"
                  >
                    Teacher
                  </Badge>
                </div>
                <p className="leading-none text-sm font-normal hidden md:inline">
                  25/07/2024
                </p>
              </div>
              <CardDescription>thaopham@neu.edu.vn</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="ml-14">
            <p className="leading-normal">
              [!NOTE] Các em hôm nay hãy hoàn thành hết bài "Tìm số nguyên tố"
              cho thầy nhé.
            </p>
            <p className="leading-normal">Chúc các em một cuối tuần vui vẻ!</p>
            <p className="leading-normal">
              Tôi rất vui vì được làm thầy giáo của các em.
            </p>
            <div className="flex justify-center m-3">
              <img
                alt="Book Image"
                className="w-90 rounded-md object-cover aspect-auto"
                src="https://ddimitrov.dev/wp-content/uploads/2020/03/designing-data-intensive-applications-cover-748x515.png"
              />
            </div>
            <p>Bạn lớp trưởng hãy gửi lại danh sách điểm cho thầy.</p>
          </div>
          <Separator className="my-3" />
        </CardContent>
        <CardFooter>
          <Textarea placeholder="Write a comment..." />
        </CardFooter>
      </Card>
    </div>
  );
}
