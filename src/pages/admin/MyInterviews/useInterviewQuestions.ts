import { useEffect, useMemo, useState } from "react";
import { getInterviewQuestions } from "../../../services/apis/interview.api";
import type {
  InterviewQuestion,
} from "../../../services/apis/interview.api";
import { mapKey } from "./myInterviews.constants";

export function useInterviewQuestions() {
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState<Record<string, InterviewQuestion[]>>(
    {},
  );

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const results = await Promise.all([
          getInterviewQuestions({ category: "bookends", setType: "flow" }),
          getInterviewQuestions({ category: "childhood", setType: "flow" }),
          getInterviewQuestions({ category: "adulthood", setType: "flow" }),
          getInterviewQuestions({ category: "storyhighlight", setType: "flow" }),
        ]);

        setQuestions({
          [mapKey("bookends", "flow")]: results[0].result || [],
          [mapKey("childhood", "flow")]: results[1].result || [],
          [mapKey("adulthood", "flow")]: results[2].result || [],
          [mapKey("storyhighlight", "flow")]: results[3].result || [],
        });
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, []);

  const bookends = useMemo(() => questions[mapKey("bookends", "flow")] || [], [
    questions,
  ]);

  return { isLoading, questions, bookends };
}
