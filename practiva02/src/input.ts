import promptSync from "prompt-sync";

const prompt = promptSync({
  sigint: true
});

export function askText(
  message: string
): string | undefined {
  const answer = prompt(message);

  const clean = answer.trim();

  if (clean.length === 0) {
    return undefined;
  }

  return clean;
}