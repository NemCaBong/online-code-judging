import { Header } from "@/common/components/Header";
import { Sidebar } from "@/common/components/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { z } from "zod";
import { CodeEditorCard } from "@/components/code-editor/CodeEditorCard";
import { codeEditorSchema } from "@/utils/code-editor.schemas";
import TestCase from "./components/TestCase";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import ChallengeDescriptionCard from "./components/ChallengeDescriptionCard";
import { ENV } from "@/config/env.config";

interface Challenge {
  id: number;
  name: string;
  description: string;
  difficulty: string;
  space_limit: number;
  time_limit: number;
  hints: { id: number; question: string; answer: string }[];
  tags: string[];
  test_cases: { id: number; input: string; expected_output: string }[];
  challenge_details: {
    id: number;
    language_id: number;
    boilerplate_code: string;
  }[];
}

interface RunCodeResponse {
  message: string;
  result: Array<{
    token: string;
    testCaseId: number;
  }>;
  statusCode: number;
}

interface SubmitCodeRes {
  message: string;
  result: Array<{
    token: string;
    testCaseId: number;
  }>;
  user_challenge_id: number;
  statusCode: number;
}

interface Submission {
  stderr: string | null;
  stdout: string | null;
  time: string;
  memory: number;
  token: string;
  compile_output: string | null;
  message: string | null;
  status: {
    id: number;
    description: string;
  };
}

interface PollRunResponse {
  message: string;
  submissions?: Submission[];
  submission?: Submission;
  statusCode: number;
  error?: string;
  errorTestCase?: {
    id: number;
    input: string;
    expected_output: string;
    challenge_id: number;
    is_sampled: boolean;
  };
}

export interface SubmissionResult {
  message: string;
  statusCode: number;
  averageTime?: number;
  averageMemory?: number;
  error?: string;
  submission?: Submission;
  errorTestCase?: {
    id: number;
    input: string;
    expected_output: string;
    challenge_id: number;
    is_sampled: boolean;
  }; // Optional, present only in error responses
}

export interface UserChallengeRes {
  id: number;
  challenge_id?: number;
  user_id?: number;
  status: string;
  created_at: string;
  code: string;
  language_id: number;
  time: string | null;
  status_id: number;
  message: string;
  memory: number | null;
  stderr: string | null;
  stdout: string | null;
  compile_output: string | null;
  error_testcase: {
    id: number;
    input: string;
    expected_output: string;
  } | null;
}

function useChallengeDetails(challengeSlug: string) {
  return useQuery({
    queryKey: ["challenge", challengeSlug],
    queryFn: async (): Promise<Challenge> => {
      const response = await axios.get(
        `${ENV.API_URL}/challenges/${challengeSlug}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      return response.data;
    },
  });
}

const runCode = async (
  values: z.infer<typeof codeEditorSchema>,
  challengeSlug: string,
  testCaseIds: number[]
): Promise<RunCodeResponse> => {
  const response = await axios.post<RunCodeResponse>(
    `${ENV.API_URL}/challenges/${challengeSlug}/run`,
    {
      ...values,
      testCaseIds,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );

  return response.data;
};

const submitCode = async (
  values: z.infer<typeof codeEditorSchema>,
  challengeSlug: string
): Promise<SubmitCodeRes> => {
  const response = await axios.post<SubmitCodeRes>(
    `${ENV.API_URL}/challenges/${challengeSlug}/submit`,
    values,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
  return response.data;
};

export function CodingChallengeDetail() {
  const { challengeSlug } = useParams<{ challengeSlug: string }>();
  const [pollData, setPollData] = useState<PollRunResponse | null>(null);
  const [historySub, setHistorySub] = useState<UserChallengeRes | null>(null);
  const [submissionData, setSubmissionData] = useState<SubmissionResult | null>(
    null
  );

  const {
    data: challenge,
    isLoading,
    error,
  } = useChallengeDetails(challengeSlug!);

  const runCodeMutation = useMutation<
    RunCodeResponse,
    Error,
    z.infer<typeof codeEditorSchema>
  >({
    mutationFn: (values) => {
      const testCaseIds =
        challenge?.test_cases?.map((testCase) => testCase.id) ?? [];
      return runCode(values, challengeSlug as string, testCaseIds);
    },
    onSuccess: async (data) => {
      toast.success("Code is running ...", {
        position: "top-right",
        autoClose: 5000,
      });
      startPolling(data.result);
    },
    onError: (error) => {
      toast.error("Error running code. Please try again.", {
        position: "top-right",
        autoClose: 5000,
      });
      console.error("Error running code:", error);
    },
  });

  const submitCodeMutation = useMutation<
    SubmitCodeRes,
    Error,
    z.infer<typeof codeEditorSchema>
  >({
    mutationFn: (values) => submitCode(values, challengeSlug as string),
    onSuccess: (data) => {
      toast.success("Code submitted! Check the results.", {
        position: "top-right",
        autoClose: 5000,
      });
      pollSubmissionResults(data.result, data.user_challenge_id);
    },
    onError: (error) => {
      toast.error("Error submitting code. Please try again.", {
        position: "top-right",
        autoClose: 5000,
      });
      console.error("Error submitting code:", error);
    },
  });

  const startPolling = (tokens: { token: string; testCaseId: number }[]) => {
    const intervalId = setInterval(async () => {
      try {
        const response = await axios.post(
          `${ENV.API_URL}/challenges/poll-run`,
          { runPoll: tokens },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        if (response.data.statusCode === 202) {
          // Still pending
          return;
        }
        clearInterval(intervalId); // Stop polling
        setPollData(response.data);

        if (response.data.statusCode === 200) {
          console.log("Success:", response.data);
          toast.success("Code executed successfully!");
        } else if (
          response.data.statusCode === 400 &&
          response.data.error === "Wrong Answer"
        ) {
          console.log("Wrong Answer:", response.data);
          toast.error("Wrong Answer. Please check your code.");
        } else if (response.data.statusCode === 400) {
          console.log("Error:", response.data);
          toast.error(`Error: ${response.data.error}`);
        }
      } catch (error) {
        console.error("Polling error:", error);
        clearInterval(intervalId); // Stop polling on error
        toast.error("An error occurred while polling. Please try again.");
      }
    }, 1500); // Poll every 1.5 seconds
  };

  const pollSubmissionResults = (
    tokens: { token: string; testCaseId: number }[],
    user_challenge_id: number
  ) => {
    const pollingInterval = 1500; // Poll every 1.5 seconds
    const timeoutDuration = 10000; // Timeout after 10 seconds

    const intervalId = setInterval(async () => {
      try {
        const response = await axios.post(
          `${ENV.API_URL}/challenges/${challengeSlug}/poll-submit/${user_challenge_id}`,
          { submitPoll: tokens },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        if (response.data.statusCode === 202) {
          // Still pending
          return;
        }

        clearInterval(intervalId); // Stop polling
        clearTimeout(timeoutId); // Clear the timeout if polling succeeds
        // setPollData(response.data);
        setSubmissionData(response.data);

        if (response.data.statusCode === 200) {
          console.log("Success:", response.data);
          toast.success("Code executed successfully!");
        } else if (
          response.data.statusCode === 400 &&
          response.data.error === "Wrong Answer"
        ) {
          console.log("Wrong Answer:", response.data);
          toast.error("Wrong Answer. Please check your code.");
        } else if (response.data.statusCode === 400) {
          console.log("Error:", response.data);
          toast.error(`Error: ${response.data.error}`);
        }
      } catch (error) {
        console.error("Polling error:", error);
        clearInterval(intervalId); // Stop polling on error
        clearTimeout(timeoutId); // Clear the timeout on error
        toast.error("An error occurred while polling. Please try again.");
      }
    }, pollingInterval);

    const timeoutId = setTimeout(() => {
      clearInterval(intervalId); // Stop polling after timeout
      toast.error("Polling timed out. Please try again.");
    }, timeoutDuration);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading challenge</div>;
  if (!challenge) return <div>No challenge data available</div>;

  const accordionItems = (challenge?.hints || []).map((hint) => ({
    trigger: hint.question,
    content: hint.answer,
  }));

  const availableLanguages = (challenge?.challenge_details || []).map(
    (detail) => detail.language_id
  );

  function onRun(values: z.infer<typeof codeEditorSchema>) {
    toast.info("Running code, please wait for the results...", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    console.log("Values: ", values);
    runCodeMutation.mutate(values);
  }

  function onSubmit(values: z.infer<typeof codeEditorSchema>) {
    toast.info("Submitting code, please wait for the results...", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    console.log("Values: ", values);
    submitCodeMutation.mutate(values);
  }

  return (
    <ScrollArea className="h-[100dvh]">
      <div className="flex flex-col min-h-screen w-full bg-muted/40">
        <Sidebar />
        <div className="flex flex-col sm:py-4 sm:pl-14 sm:gap-4">
          <Header pathString="challenges" />
          <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-1 lg:grid-cols-2  sm:px-6 sm:py-0 h-[91vh]">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 col-span-1 grid-flow-dense justify-items-end h-full">
              <ChallengeDescriptionCard
                title={challenge?.name || ""}
                description="Easy question on LeetCode"
                markdownContent={challenge?.description || ""}
                accordionItems={accordionItems}
                submissionData={submissionData}
                onChooseHistory={setHistorySub}
                historySub={historySub}
              />
            </div>
            {/* Right column */}
            <div className="flex flex-col justify-between h-full gap-2">
              <CodeEditorCard
                onRun={onRun}
                onSubmit={onSubmit}
                challengeDetails={challenge?.challenge_details || []}
                availableLanguages={availableLanguages}
              />

              {/* Bottom right column */}
              <TestCase
                testCases={challenge.test_cases}
                submissions={pollData?.submissions}
                errorTestCase={pollData?.errorTestCase}
                submission={pollData?.submission}
              />
            </div>
          </main>
        </div>
      </div>
      <ToastContainer />
    </ScrollArea>
  );
}
