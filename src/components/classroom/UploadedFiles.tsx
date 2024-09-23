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

interface UploadedFile {
  id: string;
  fileName: string;
  size: string;
  uploadedAt: string;
}

interface UploadedFile {
  id: string;
  fileName: string;
  size: string;
  uploadedAt: string;
}

const uploadedFiles: UploadedFile[] = [
  {
    id: "1",
    fileName: "assignment1.pdf",
    size: "2.5 MB",
    uploadedAt: "2023-09-15 14:30",
  },
  {
    id: "2",
    fileName: "project_report.docx",
    size: "1.8 MB",
    uploadedAt: "2023-09-16 09:45",
  },
  {
    id: "3",
    fileName: "presentation.pptx",
    size: "5.2 MB",
    uploadedAt: "2023-09-17 11:20",
  },
  {
    id: "4",
    fileName: "code_sample.java",
    size: "12 KB",
    uploadedAt: "2023-09-18 16:05",
  },
  {
    id: "5",
    fileName: "data_analysis.xlsx",
    size: "3.7 MB",
    uploadedAt: "2023-09-19 10:15",
  },
  {
    id: "6",
    fileName: "research_paper.pdf",
    size: "4.1 MB",
    uploadedAt: "2023-09-20 13:50",
  },
  {
    id: "7",
    fileName: "meeting_notes.txt",
    size: "5 KB",
    uploadedAt: "2023-09-21 15:30",
  },
  {
    id: "8",
    fileName: "design_mockup.png",
    size: "1.3 MB",
    uploadedAt: "2023-09-22 09:00",
  },
  {
    id: "9",
    fileName: "budget_forecast.xlsx",
    size: "890 KB",
    uploadedAt: "2023-09-23 11:45",
  },
  {
    id: "10",
    fileName: "user_manual.pdf",
    size: "6.2 MB",
    uploadedAt: "2023-09-24 14:20",
  },
  {
    id: "11",
    fileName: "source_code.zip",
    size: "15.6 MB",
    uploadedAt: "2023-09-25 17:10",
  },
  {
    id: "12",
    fileName: "video_tutorial.mp4",
    size: "78.3 MB",
    uploadedAt: "2023-09-26 08:55",
  },
  {
    id: "13",
    fileName: "final_exam.pdf",
    size: "2.9 MB",
    uploadedAt: "2023-09-27 10:00",
  },
  {
    id: "14",
    fileName: "thesis.docx",
    size: "1.2 MB",
    uploadedAt: "2023-09-28 12:30",
  },
  {
    id: "15",
    fileName: "project_plan.xlsx",
    size: "3.1 MB",
    uploadedAt: "2023-09-29 14:45",
  },
  {
    id: "16",
    fileName: "team_photo.jpg",
    size: "2.4 MB",
    uploadedAt: "2023-09-30 16:20",
  },
  {
    id: "17",
    fileName: "audio_notes.mp3",
    size: "5.6 MB",
    uploadedAt: "2023-10-01 09:10",
  },
  {
    id: "18",
    fileName: "project_diagram.svg",
    size: "450 KB",
    uploadedAt: "2023-10-02 11:35",
  },
  {
    id: "19",
    fileName: "meeting_recording.mp4",
    size: "120.5 MB",
    uploadedAt: "2023-10-03 13:50",
  },
  {
    id: "20",
    fileName: "summary.txt",
    size: "8 KB",
    uploadedAt: "2023-10-04 15:25",
  },
];

export const UploadedFiles = () => {
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {uploadedFiles.map((file, index) => (
                  <TableRow
                    key={file.id}
                    className={index % 2 === 1 ? "bg-accent" : " "}
                  >
                    <TableCell>{file.fileName}</TableCell>
                    <TableCell>{file.size}</TableCell>
                    <TableCell className="hidden xl:table-cell">
                      {file.uploadedAt}
                    </TableCell>
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
