import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/common/components/Sidebar";
import { Header } from "@/common/components/Header";
import { PostCard } from "../../../components/classroom/PostCard";
import { ImagesCard } from "@/components/classroom/ImagesCard";
import { UploadFiles } from "@/components/classroom/UploadFiles";

export function ClassroomDetail() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-screen-2xl flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-2xl font-bold tracking-tight sm:grow-0">
                Lập trình Java
              </h1>
              <Badge className="ml-auto sm:ml-0">On going</Badge>
            </div>
            <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
              <div className="grid auto-rows-max items-start gap-4">
                <PostCard
                  post={{
                    content: "# Hello world!",
                  }}
                />
              </div>
              <div className="grid auto-rows-max items-start gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <UploadFiles />
                <ImagesCard />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
