import { AdminHeader } from "@/common/components/AdminHeader";
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
  DialogContent,
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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
import { ArrowDownWideNarrow, ListFilter } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { gradingExerciseSchema } from "./schemas/grading.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export function AdminGradingPage() {
  const gradingExerciseForm = useForm<z.infer<typeof gradingExerciseSchema>>({
    resolver: zodResolver(gradingExerciseSchema),
    defaultValues: {
      code: "Hahahahahaha",
      review: "",
    },
  });

  function onGradingExercise(values: z.infer<typeof gradingExerciseSchema>) {
    console.log(values);
  }

  return (
    <ScrollArea className="h-[100dvh]">
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
                        <CardTitle className="text-xl">
                          Exercises List
                        </CardTitle>
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
                              <ArrowDownWideNarrow className="h-3.5 w-3.5" />
                              <span className="sr-only sm:not-sr-only">
                                Sort
                              </span>
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
                        {[...Array(15)].map((_, index) => (
                          <button
                            // key={item.id}
                            key={index}
                            className={cn(
                              "flex flex-col items-start gap-2 rounded-lg border text-left text-sm transition-all hover:bg-muted/40 p-4"
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
                              The short details of the problems are display
                              here.
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
              <Form {...gradingExerciseForm}>
                <form
                  onSubmit={gradingExerciseForm.handleSubmit(onGradingExercise)}
                >
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
                    <CardContent className="h-[60vh] pb-0">
                      <FormField
                        control={gradingExerciseForm.control}
                        name="code"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <CodeMirrorEditor
                                language="javascript"
                                className="h-[58vh]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                    <Separator />
                    <CardFooter className="block h-[19.5vh] pb-0">
                      <div className="pt-6">
                        <div className="grid gap-4">
                          <FormField
                            control={gradingExerciseForm.control}
                            name="review"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Textarea
                                    className="p-4 h-[8vh] resize-none"
                                    placeholder={`Review Nguyễn Minh Hoàng's submission...`}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="flex items-center">
                            <div className="ml-auto"></div>
                            <FormField
                              control={gradingExerciseForm.control}
                              name="score"
                              render={({ field }) => (
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button>Grade</Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                      <DialogTitle>
                                        Grade submission
                                      </DialogTitle>
                                      <DialogDescription>
                                        Score this submission from 0 to 10.
                                        Click send when you're done.
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        {/* <Label
                                        htmlFor="score"
                                        className="text-right"
                                      >
                                        Score
                                      </Label> */}
                                        <FormLabel className="text-right">
                                          Score
                                        </FormLabel>
                                        <Input
                                          id="score"
                                          className="col-span-3"
                                          {...field}
                                        />
                                      </div>
                                      <FormMessage />
                                    </div>
                                    <DialogFooter>
                                      <DialogClose asChild>
                                        <Button
                                          type="button"
                                          variant="secondary"
                                        >
                                          Close
                                        </Button>
                                      </DialogClose>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              )}
                            />{" "}
                            <Button type="submit" className="ml-4">
                              Send
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </form>
              </Form>
            </div>
          </main>
        </div>
      </div>
    </ScrollArea>
  );
}
