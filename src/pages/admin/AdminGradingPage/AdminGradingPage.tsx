import { AdminHeader } from "@/components/common/AdminHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CardHeader,
  Card,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CodeMirrorEditor from "@/pages/client/CodingChallengeDetail/components/CodeMirrorEditor";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ListFilter } from "lucide-react";

const mails = [
  {
    id: "6c84fb90-12c4-11e1-840d-7b25c5ee775a",
    name: "William Smith",
    email: "williamsmith@example.com",
    subject: "Meeting Tomorrow",
    text: "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.\n\nPlease come prepared with any questions or insights you may have. Looking forward to our meeting!\n\nBest regards, William",
    date: "2023-10-22T09:00:00",
    read: true,
    labels: ["meeting", "work", "important"],
  },
  {
    id: "110e8400-e29b-11d4-a716-446655440000",
    name: "Alice Smith",
    email: "alicesmith@example.com",
    subject: "Re: Project Update",
    text: "Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive. The team has done a fantastic job, and I appreciate the hard work everyone has put in.\n\nI have a few minor suggestions that I'll include in the attached document.\n\nLet's discuss these during our next meeting. Keep up the excellent work!\n\nBest regards, Alice",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["work", "important"],
  },
  {
    id: "3e7c3f6d-bdf5-46ae-8d90-171300f27ae2",
    name: "Bob Johnson",
    email: "bobjohnson@example.com",
    subject: "Weekend Plans",
    text: "Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's been a while since we had some outdoor fun.\n\nIf you're interested, let me know, and we can plan the details. It'll be a great way to unwind and enjoy nature.\n\nLooking forward to your response!\n\nBest, Bob",
    date: "2023-04-10T11:45:00",
    read: true,
    labels: ["personal"],
  },
  {
    id: "61c35085-72d7-42b4-8d62-738f700d4b92",
    name: "Emily Davis",
    email: "emilydavis@example.com",
    subject: "Re: Question about Budget",
    text: "I have a question about the budget for the upcoming project. It seems like there's a discrepancy in the allocation of resources.\n\nI've reviewed the budget report and identified a few areas where we might be able to optimize our spending without compromising the project's quality.\n\nI've attached a detailed analysis for your reference. Let's discuss this further in our next meeting.\n\nThanks, Emily",
    date: "2023-03-25T13:15:00",
    read: false,
    labels: ["work", "budget"],
  },
  {
    id: "8f7b5db9-d935-4e42-8e05-1f1d0a3dfb97",
    name: "Michael Wilson",
    email: "michaelwilson@example.com",
    subject: "Important Announcement",
    text: "I have an important announcement to make during our team meeting. It pertains to a strategic shift in our approach to the upcoming product launch. We've received valuable feedback from our beta testers, and I believe it's time to make some adjustments to better meet our customers' needs.\n\nThis change is crucial to our success, and I look forward to discussing it with the team. Please be prepared to share your insights during the meeting.\n\nRegards, Michael",
    date: "2023-03-10T15:00:00",
    read: false,
    labels: ["meeting", "work", "important"],
  },
  {
    id: "1f0f2c02-e299-40de-9b1d-86ef9e42126b",
    name: "Sarah Brown",
    email: "sarahbrown@example.com",
    subject: "Re: Feedback on Proposal",
    text: "Thank you for your feedback on the proposal. It looks great! I'm pleased to hear that you found it promising. The team worked diligently to address all the key points you raised, and I believe we now have a strong foundation for the project.\n\nI've attached the revised proposal for your review.\n\nPlease let me know if you have any further comments or suggestions. Looking forward to your response.\n\nBest regards, Sarah",
    date: "2023-02-15T16:30:00",
    read: true,
    labels: ["work"],
  },
  {
    id: "17c0a96d-4415-42b1-8b4f-764efab57f66",
    name: "David Lee",
    email: "davidlee@example.com",
    subject: "New Project Idea",
    text: "I have an exciting new project idea to discuss with you. It involves expanding our services to target a niche market that has shown considerable growth in recent months.\n\nI've prepared a detailed proposal outlining the potential benefits and the strategy for execution.\n\nThis project has the potential to significantly impact our business positively. Let's set up a meeting to dive into the details and determine if it aligns with our current goals.\n\nBest regards, David",
    date: "2023-01-28T17:45:00",
    read: false,
    labels: ["meeting", "work", "important"],
  },
  {
    id: "2f0130cb-39fc-44c4-bb3c-0a4337edaaab",
    name: "Olivia Wilson",
    email: "oliviawilson@example.com",
    subject: "Vacation Plans",
    text: "Let's plan our vacation for next month. What do you think? I've been thinking of visiting a tropical paradise, and I've put together some destination options.\n\nI believe it's time for us to unwind and recharge. Please take a look at the options and let me know your preferences.\n\nWe can start making arrangements to ensure a smooth and enjoyable trip.\n\nExcited to hear your thoughts! Olivia",
    date: "2022-12-20T18:30:00",
    read: true,
    labels: ["personal"],
  },
  {
    id: "de305d54-75b4-431b-adb2-eb6b9e546014",
    name: "James Martin",
    email: "jamesmartin@example.com",
    subject: "Re: Conference Registration",
    text: "I've completed the registration for the conference next month. The event promises to be a great networking opportunity, and I'm looking forward to attending the various sessions and connecting with industry experts.\n\nI've also attached the conference schedule for your reference.\n\nIf there are any specific topics or sessions you'd like me to explore, please let me know. It's an exciting event, and I'll make the most of it.\n\nBest regards, James",
    date: "2022-11-30T19:15:00",
    read: true,
    labels: ["work", "conference"],
  },
  {
    id: "7dd90c63-00f6-40f3-bd87-5060a24e8ee7",
    name: "Sophia White",
    email: "sophiawhite@example.com",
    subject: "Team Dinner",
    text: "Let's have a team dinner next week to celebrate our success. We've achieved some significant milestones, and it's time to acknowledge our hard work and dedication.\n\nI've made reservations at a lovely restaurant, and I'm sure it'll be an enjoyable evening.\n\nPlease confirm your availability and any dietary preferences. Looking forward to a fun and memorable dinner with the team!\n\nBest, Sophia",
    date: "2022-11-05T20:30:00",
    read: false,
    labels: ["meeting", "work"],
  },
  {
    id: "99a88f78-3eb4-4d87-87b7-7b15a49a0a05",
    name: "Daniel Johnson",
    email: "danieljohnson@example.com",
    subject: "Feedback Request",
    text: "I'd like your feedback on the latest project deliverables. We've made significant progress, and I value your input to ensure we're on the right track.\n\nI've attached the deliverables for your review, and I'm particularly interested in any areas where you think we can further enhance the quality or efficiency.\n\nYour feedback is invaluable, and I appreciate your time and expertise. Let's work together to make this project a success.\n\nRegards, Daniel",
    date: "2022-10-22T09:30:00",
    read: false,
    labels: ["work"],
  },
  {
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    name: "Ava Taylor",
    email: "avataylor@example.com",
    subject: "Re: Meeting Agenda",
    text: "Here's the agenda for our meeting next week. I've included all the topics we need to cover, as well as time allocations for each.\n\nIf you have any additional items to discuss or any specific points to address, please let me know, and we can integrate them into the agenda.\n\nIt's essential that our meeting is productive and addresses all relevant matters.\n\nLooking forward to our meeting! Ava",
    date: "2022-10-10T10:45:00",
    read: true,
    labels: ["meeting", "work"],
  },
  {
    id: "c1a0ecb4-2540-49c5-86f8-21e5ce79e4e6",
    name: "William Anderson",
    email: "williamanderson@example.com",
    subject: "Product Launch Update",
    text: "The product launch is on track. I'll provide an update during our call. We've made substantial progress in the development and marketing of our new product.\n\nI'm excited to share the latest updates with you during our upcoming call. It's crucial that we coordinate our efforts to ensure a successful launch. Please come prepared with any questions or insights you may have.\n\nLet's make this product launch a resounding success!\n\nBest regards, William",
    date: "2022-09-20T12:00:00",
    read: false,
    labels: ["meeting", "work", "important"],
  },
  {
    id: "ba54eefd-4097-4949-99f2-2a9ae4d1a836",
    name: "Mia Harris",
    email: "miaharris@example.com",
    subject: "Re: Travel Itinerary",
    text: "I've received the travel itinerary. It looks great! Thank you for your prompt assistance in arranging the details. I've reviewed the schedule and the accommodations, and everything seems to be in order. I'm looking forward to the trip, and I'm confident it'll be a smooth and enjoyable experience.\n\nIf there are any specific activities or attractions you recommend at our destination, please feel free to share your suggestions.\n\nExcited for the trip! Mia",
    date: "2022-09-10T13:15:00",
    read: true,
    labels: ["personal", "travel"],
  },
  {
    id: "df09b6ed-28bd-4e0c-85a9-9320ec5179aa",
    name: "Ethan Clark",
    email: "ethanclark@example.com",
    subject: "Team Building Event",
    text: "Let's plan a team-building event for our department. Team cohesion and morale are vital to our success, and I believe a well-organized team-building event can be incredibly beneficial. I've done some research and have a few ideas for fun and engaging activities.\n\nPlease let me know your thoughts and availability. We want this event to be both enjoyable and productive.\n\nTogether, we'll strengthen our team and boost our performance.\n\nRegards, Ethan",
    date: "2022-08-25T15:30:00",
    read: false,
    labels: ["meeting", "work"],
  },
  {
    id: "d67c1842-7f8b-4b4b-9be1-1b3b1ab4611d",
    name: "Chloe Hall",
    email: "chloehall@example.com",
    subject: "Re: Budget Approval",
    text: "The budget has been approved. We can proceed with the project. I'm delighted to inform you that our budget proposal has received the green light from the finance department. This is a significant milestone, and it means we can move forward with the project as planned.\n\nI've attached the finalized budget for your reference. Let's ensure that we stay on track and deliver the project on time and within budget.\n\nIt's an exciting time for us! Chloe",
    date: "2022-08-10T16:45:00",
    read: true,
    labels: ["work", "budget"],
  },
  {
    id: "6c9a7f94-8329-4d70-95d3-51f68c186ae1",
    name: "Samuel Turner",
    email: "samuelturner@example.com",
    subject: "Weekend Hike",
    text: "Who's up for a weekend hike in the mountains? I've been craving some outdoor adventure, and a hike in the mountains sounds like the perfect escape. If you're up for the challenge, we can explore some scenic trails and enjoy the beauty of nature.\n\nI've done some research and have a few routes in mind.\n\nLet me know if you're interested, and we can plan the details.\n\nIt's sure to be a memorable experience! Samuel",
    date: "2022-07-28T17:30:00",
    read: false,
    labels: ["personal"],
  },
];
export function AdminGradingPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex flex-col sm:gap-4">
        <AdminHeader />
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-1 lg:grid-cols-7  sm:px-6 sm:py-0">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-3 md:col-span-1 grid-flow-dense justify-items-end">
            <div className="grid w-full max-w-7xl">
              <ScrollArea className="h-[91vh] dark:border-zinc-800 rounded-xl border border-zinc-200 shadow">
                <Card className="border-hidden">
                  <CardHeader className="flex flex-row justify-between items-center pb-7">
                    <div>
                      <CardTitle className="text-xl">Exercises List</CardTitle>
                      <CardDescription className="text-base">
                        All Exercises On Class [class_name]
                      </CardDescription>
                    </div>
                    <div className="flex gap-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" className="h-7 gap-1 text-sm">
                            <ListFilter className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only">
                              Filter
                            </span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuCheckboxItem checked>
                            Fulfilled
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem>
                            Declined
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem>
                            Refunded
                          </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" className="h-7 gap-1 text-sm">
                            <ListFilter className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only">Sort</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuCheckboxItem checked>
                            ASC
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem>
                            DESC
                          </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-4">
                      {[...Array(15)].map((_, _index) => (
                        <button
                          // key={item.id}
                          className={cn(
                            "flex flex-col items-start gap-2 rounded-lg border text-left text-sm transition-all hover:bg-accent p-4"
                            // mail.selected === item.id && "bg-muted"
                          )}
                          // onClick={() =>
                          //   setMail({
                          //     ...mail,
                          //     selected: item.id,
                          //   })
                          // }
                        >
                          <div className="flex w-full flex-col gap-1">
                            <div className="flex items-center">
                              <div className="flex items-center gap-2">
                                <div className="font-semibold">
                                  Nguyễn Minh Hoàng
                                </div>
                                {/* {!item.read && (
                                <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                              )} */}
                                <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                              </div>
                              <div
                                className={cn(
                                  "ml-auto text-xs"
                                  // mail.selected === item.id
                                  //   ? "text-foreground"
                                  //   : "text-muted-foreground"
                                )}
                              >
                                {/* {formatDistanceToNow(new Date(item.date), {
                                addSuffix: true,
                              })} */}
                                almost 2 years ago
                              </div>
                            </div>
                            <div className="text-xs font-medium">
                              nemcabong@gmail.com
                            </div>
                          </div>
                          <div className="line-clamp-2 text-xs text-muted-foreground">
                            {/* {item.text.substring(0, 300)} */}
                            The short details of the problems are display here.
                          </div>
                          {/* {item.labels.length ? (
                          <div className="flex items-center gap-2">
                            {item.labels.map((label) => (
                              <Badge
                                key={label}
                                variant={getBadgeVariantFromLabel(label)}
                              >
                                {label}
                              </Badge>
                            ))}
                          </div>
                        ) : null} */}
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">AC</Badge>
                            <Badge>Challenge</Badge>
                            <Badge>Exercise</Badge>
                            <Badge variant="destructive">TLE</Badge>
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                  {/* <CardFooter>
                    {" "}
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>Is it accessible?</AccordionTrigger>
                        <AccordionContent>
                          Yes. It adheres to the WAI-ARIA design pattern.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>Is it styled?</AccordionTrigger>
                        <AccordionContent>
                          Yes. It comes with default styles that matches the
                          other components&apos; aesthetic.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger>Is it animated?</AccordionTrigger>
                        <AccordionContent>
                          Yes. It's animated by default, but you can disable it
                          if you prefer.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardFooter> */}
                </Card>
              </ScrollArea>
            </div>
          </div>
          <div className="flex flex-col justify-between h-[91vh] gap-2 lg:col-span-4 md:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-start">
                  <div className="flex items-start gap-4 text-base">
                    <Avatar>
                      <AvatarImage alt="Nguyen Minh Hoang" />
                      <AvatarFallback>NM</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="font-semibold text-lg">
                        Nguyễn Minh Hoàng
                      </div>
                      <div className="line-clamp-1 text-base">
                        nemcabong@gmail.com
                      </div>
                      {/* <div className="line-clamp-1 text-sm">11218459</div> */}
                    </div>
                  </div>
                  <div className="ml-auto text-sm text-muted-foreground">
                    {/* {format(new Date(mail.date), "PPpp")} */}
                    Oct 22, 2023, 9:00:00 AM
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CodeMirrorEditor language="javascript" className="h-[61vh]" />
              </CardContent>
              <Separator />
              <CardFooter className="block">
                <div className="pt-6">
                  <form>
                    <div className="grid gap-4">
                      <Textarea
                        className="p-4 h-[10vh] resize-none"
                        placeholder={`Review Nguyễn Minh Hoàng's submission...`}
                      />
                      <div className="flex items-center">
                        <div className="ml-auto"></div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button>Send & Grade</Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Grade submission</DialogTitle>
                              <DialogDescription>
                                Score this submission from 0 to 10. Click send
                                when you're done.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="score" className="text-right">
                                  Score
                                </Label>
                                <Input id="score" className="col-span-3" />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button type="submit">Send</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </form>
                </div>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
