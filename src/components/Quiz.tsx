import { createEffect, createSignal } from "solid-js";

type Props = {
  questions: {
    question: string;
    answers: string[];
    correctAnswerIndex: number;
  }[];
  url: string;
};

export function Quiz(props: Props) {
  const url = btoa(props.url);
  const [activeQuestion, setActiveQuestion] = createSignal(0);
  const [answers, setAnswers] = createSignal<number[]>([]);
  const saveAnswer = (index: number) => {
    setAnswers([...answers(), index]);

    if (activeQuestion() === 4) {
      fetch("/api/saveResult", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          questions: props.questions,
          answers: answers(),
          url: props.url,
        }),
      })
        .then((r) => r.json())
        .then(({ id }) => (window.location.href = `/${url}/result/${id}`));
      return;
    }
    setActiveQuestion(activeQuestion() + 1);
  };

  createEffect(() => {
    try {
      localStorage.setItem("answers", JSON.stringify(answers()));
    } catch {}
  });

  return (
    <div class="h-screen flex flex-col text-left">
      <div class="text-center p-2 font-ds flex-grow-0 font-bold border-b border-neutral-700">
        Question {activeQuestion() + 1} of {props.questions.length}
      </div>
      <div class="p-8 grid gap-8 content-center grow max-w-screen-lg mx-auto">
        {url && (
          <a
            href={props.url}
            target="_blank"
            rel="noopener noreferrer"
            class="bg-neutral-900 hover:bg-neutral-800 rounded-full max-w-fit pl-2 pr-4 py-2 text-sm font-bold flex items-center gap-4 font-mono"
          >
            {atob(url)}
          </a>
        )}
        <h1 class="text-4xl font-semibold font-ds">
          {props.questions[activeQuestion()].question}
        </h1>
        <ul class="grid gap-2 content-start font-ds">
          {props.questions[activeQuestion()].answers.map((answer, index) => (
            <li>
              <button
                class="bg-neutral-900 hover:bg-neutral-800 transition hover:border-neutral-600 border border-neutral-800 text-lg font-semibold w-full rounded p-2"
                onClick={() => saveAnswer(index)}
              >
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
