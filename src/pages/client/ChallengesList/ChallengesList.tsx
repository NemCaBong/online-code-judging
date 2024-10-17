import { ScrollArea } from "@/components/ui/scroll-area";
import { Sidebar } from "@/common/components/Sidebar";
import { Header } from "@/common/components/Header";
import { DataTable } from "./components/DataTable";
import DashboardNotificationBoard from "../Dashboard/components/DashboardNotificationBoard";
import SummaryChart from "./components/SummaryChart";

// const mockNotifications: Notification[] = [
//   {
//     id: "1",
//     task: "Nộp bài tập về nhà: Giải phương trình bậc 2",
//     course: "Đại số",
//     status: "Chưa hoàn thành",
//     date: "2024-03-15",
//   },
//   {
//     id: "2",
//     task: "Làm bài kiểm tra online: Cấu trúc dữ liệu và giải thuật",
//     course: "Khoa học máy tính",
//     status: "Đã hoàn thành",
//     date: "2024-03-14",
//   },
//   {
//     id: "3",
//     task: "Nộp báo cáo thí nghiệm: Đo lường áp suất",
//     course: "Vật lý đại cương",
//     status: "Đang chờ đánh giá",
//     date: "2024-03-13",
//   },
//   {
//     id: "4",
//     task: "Tham gia thảo luận nhóm: Biến đổi khí hậu",
//     course: "Môi trường học",
//     status: "Đang diễn ra",
//     date: "2024-03-16",
//   },
//   {
//     id: "5",
//     task: "Nộp bài luận: Phân tích tác phẩm 'Truyện Kiều'",
//     course: "Văn học Việt Nam",
//     status: "Chưa bắt đầu",
//     date: "2024-03-20",
//   },
//   {
//     id: "6",
//     task: "Hoàn thành bài tập lập trình: Tạo ứng dụng Todo",
//     course: "Lập trình web",
//     status: "Đang làm",
//     date: "2024-03-18",
//   },
//   {
//     id: "7",
//     task: "Nộp bài thuyết trình: Kỹ thuật marketing số",
//     course: "Marketing cơ bản",
//     status: "Đã nộp",
//     date: "2024-03-12",
//   },
//   {
//     id: "8",
//     task: "Tham gia buổi hội thảo trực tuyến: AI trong y tế",
//     course: "Công nghệ thông tin y sinh",
//     status: "Sắp diễn ra",
//     date: "2024-03-19",
//   },
//   {
//     id: "9",
//     task: "Nộp bài tập nhóm: Thiết kế poster quảng cáo",
//     course: "Thiết kế đồ họa",
//     status: "Cần chỉnh sửa",
//     date: "2024-03-17",
//   },
//   {
//     id: "10",
//     task: "Hoàn thành khảo sát: Đánh giá chất lượng giảng dạy",
//     course: "Quản lý giáo dục",
//     status: "Chưa hoàn thành",
//     date: "2024-03-21",
//   },
// ];

const summaryData = {
  easy: 10,
  medium: 5,
  hard: 3,
};

const activityData = [
  {
    activity: "easy",
    value: (10 / 18) * 100,
    label: "10 / 18",
    fill: "var(--color-easy)",
  },
  {
    activity: "medium",
    value: (5 / 18) * 100,
    label: "5 / 18",
    fill: "var(--color-medium)",
  },
  {
    activity: "hard",
    value: (3 / 18) * 100,
    label: "3 / 18",
    fill: "var(--color-hard)",
  },
];

export function ChallengesList() {
  return (
    <ScrollArea className="h-[100dvh]">
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Sidebar />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Header pathString="challenges-list" />
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3 grid-flow-dense">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 grid-flow-dense justify-items-end">
              <div className="w-full max-w-7xl">
                <DataTable />
              </div>
            </div>
            <div className="flex flex-wrap gap-4 md:gap-8">
              <div className="flex-1 place-items-center rounded-xl border border-zinc-200 text-zinc-950 shadow dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 min-w-72 max-w-2xl">
                {/* <DashboardNotificationBoard
                  title="Todos"
                  description="Manage your todos"
                  // notifications={mockNotifications}
                /> */}
              </div>
              <div className="flex-1 max-w-2xl min-w-72">
                <SummaryChart
                  activityData={activityData}
                  summaryData={summaryData}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </ScrollArea>
  );
}
