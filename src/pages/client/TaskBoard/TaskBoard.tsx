import { Sidebar } from "@/common/components/Sidebar";
import { Header } from "@/common/components/Header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TaskTable } from "./components/TaskTable";

export interface Task {
  id: string;
  name: string;
  status: "not done" | "over due" | "completed";
  type: "challenge" | "assignment";
  dueAt: string;
  class: string;
  slug: string;
}

export function TaskBoard() {
  const mockTasks: Task[] = [
    {
      id: "1",
      name: "Calculus Problem Set",
      status: "not done",
      type: "assignment",
      dueAt: "2024-03-25T23:59:59",
      class: "Mathematics",
      slug: "calculus-problem-set",
    },
    {
      id: "2",
      name: "Mechanics Quiz",
      status: "completed",
      type: "challenge",
      dueAt: "2024-03-20T14:30:00",
      class: "Physics",
      slug: "mechanics-quiz",
    },
    {
      id: "3",
      name: "Database Design Project",
      status: "not done",
      type: "assignment",
      dueAt: "2024-04-05T18:00:00",
      class: "Computer Science",
      slug: "database-design-project",
    },
    {
      id: "4",
      name: "Shakespeare Analysis",
      status: "not done",
      type: "assignment",
      dueAt: "2024-03-28T22:00:00",
      class: "Literature",
      slug: "shakespeare-analysis",
    },
    {
      id: "5",
      name: "Titration Experiment Report",
      status: "over due",
      type: "assignment",
      dueAt: "2024-03-15T17:30:00",
      class: "Chemistry",
      slug: "titration-experiment-report",
    },
    {
      id: "6",
      name: "French Revolution Presentation",
      status: "completed",
      type: "challenge",
      dueAt: "2024-03-22T10:15:00",
      class: "History",
      slug: "french-revolution-presentation",
    },
    {
      id: "7",
      name: "Genetic Engineering Paper",
      status: "not done",
      type: "assignment",
      dueAt: "2024-04-10T23:59:59",
      class: "Biology",
      slug: "genetic-engineering-paper",
    },
    {
      id: "8",
      name: "Urban Development Study",
      status: "not done",
      type: "assignment",
      dueAt: "2024-04-02T16:00:00",
      class: "Sociology",
      slug: "urban-development-study",
    },
    {
      id: "9",
      name: "Cognitive Behavior Test",
      status: "completed",
      type: "challenge",
      dueAt: "2024-03-18T09:00:00",
      class: "Psychology",
      slug: "cognitive-behavior-test",
    },
    {
      id: "10",
      name: "To Kill a Mockingbird Analysis",
      status: "not done",
      type: "assignment",
      dueAt: "2024-04-08T23:59:59",
      class: "English",
      slug: "to-kill-a-mockingbird-analysis",
    },
    {
      id: "11",
      name: "Startup Financial Analysis",
      status: "not done",
      type: "challenge",
      dueAt: "2024-03-30T15:30:00",
      class: "Business",
      slug: "startup-financial-analysis",
    },
    {
      id: "12",
      name: "Microeconomics Problem Set",
      status: "over due",
      type: "assignment",
      dueAt: "2024-03-12T23:59:59",
      class: "Economics",
      slug: "microeconomics-problem-set",
    },
    {
      id: "13",
      name: "Algorithm Optimization Challenge",
      status: "completed",
      type: "challenge",
      dueAt: "2024-03-21T20:00:00",
      class: "Software Engineering",
      slug: "algorithm-optimization-challenge",
    },
    {
      id: "14",
      name: "Abstract Expressionism Painting",
      status: "not done",
      type: "assignment",
      dueAt: "2024-04-15T17:00:00",
      class: "Fine Arts",
      slug: "abstract-expressionism-painting",
    },
    {
      id: "15",
      name: "Pendulum Motion Experiment",
      status: "not done",
      type: "challenge",
      dueAt: "2024-04-01T14:45:00",
      class: "Physics",
      slug: "pendulum-motion-experiment",
    },
    {
      id: "16",
      name: "Climate Change Policy Debate",
      status: "completed",
      type: "challenge",
      dueAt: "2024-03-19T13:00:00",
      class: "Political Science",
      slug: "climate-change-policy-debate",
    },
    {
      id: "17",
      name: "Citizen Kane Film Analysis",
      status: "not done",
      type: "assignment",
      dueAt: "2024-04-12T23:59:59",
      class: "Media Studies",
      slug: "citizen-kane-film-analysis",
    },
    {
      id: "18",
      name: "Personal Brand Identity Design",
      status: "not done",
      type: "assignment",
      dueAt: "2024-04-05T18:30:00",
      class: "Graphic Design",
      slug: "personal-brand-identity-design",
    },
    {
      id: "19",
      name: "Probability and Statistics Midterm",
      status: "over due",
      type: "challenge",
      dueAt: "2024-03-10T10:00:00",
      class: "Statistics",
      slug: "probability-and-statistics-midterm",
    },
    {
      id: "20",
      name: "French Conversation Practice",
      status: "completed",
      type: "challenge",
      dueAt: "2024-03-23T16:45:00",
      class: "French",
      slug: "french-conversation-practice",
    },
  ];

  return (
    <ScrollArea className="h-[100dvh]">
      <div className="flex min-h-screen h-[100vh] w-full flex-col bg-muted/40">
        <Sidebar />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Header pathString="tasks" />
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <TaskTable tasks={mockTasks} />
          </main>
        </div>
      </div>
    </ScrollArea>
  );
}
