import { SupportedLanguageId } from "@/common/constants/supported-language";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Clock, Cpu } from "lucide-react";
import { UserChallengeRes } from "../CodingChallengeDetail";
import fetchData from "@/utils/fetch-data.utils";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ENV } from "@/config/env.config";

interface HistoryRes {
  message: string;
  statusCode: number;
  user_challenge_results: UserChallengeRes[];
}

export default function HistoryCard({
  onChooseHistory,
}: {
  onChooseHistory: (history: UserChallengeRes) => void;
}) {
  const { challengeSlug } = useParams();
  const {
    data: historyRes,
    isLoading: isLoadingHistory,
    isError: isErrorHistory,
  } = useQuery({
    queryKey: ["history"],
    queryFn: async (): Promise<HistoryRes> =>
      fetchData<HistoryRes>(
        `${ENV.API_URL}/challenges/${challengeSlug}/user-challenge-results/all`
      ),
  });

  if (isErrorHistory) {
    return <p>Error fetching history</p>;
  }

  if (isLoadingHistory) {
    return <p>Loading ...</p>;
  }

  return (
    <Card className="border-none">
      <CardContent>
        {historyRes && historyRes.user_challenge_results.length > 0 ? (
          <div className="flex flex-col gap-4">
            {historyRes.user_challenge_results.map((ucr) => {
              return (
                <button
                  key={ucr.id}
                  className={cn(
                    "flex flex-col items-start gap-2 rounded-lg border text-left text-sm transition-all hover:bg-muted/40 p-4 w-full"
                  )}
                  onClick={() => {
                    onChooseHistory(ucr);
                  }}
                >
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "text-lg uppercase font-semibold ",
                          ucr.status_id === 3
                            ? "text-green-600"
                            : "text-red-600"
                        )}
                      >
                        {ucr.message}
                      </span>
                      <Badge className="ml-2">
                        {
                          SupportedLanguageId[
                            ucr.language_id as keyof typeof SupportedLanguageId
                          ]
                        }
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-xs text-muted-foreground">
                        {new Date(ucr.created_at).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center pt-2">
                    <div className="text-sm font-semibold text-muted-foreground pr-4">
                      <Cpu className="h-5 w-5 inline-block" />{" "}
                      {ucr.memory
                        ? (ucr.memory / 1024).toFixed(2) + " MB"
                        : "N/A"}
                    </div>

                    <div className="text-sm font-semibold text-muted-foreground ml-4">
                      <Clock className="h-5 w-5 inline-block" />{" "}
                      {ucr.time ? parseFloat(ucr.time) * 1000 + " ms" : "N/A"}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <p>Nothing to show.</p>
        )}
      </CardContent>
    </Card>
  );
}
