export interface UseCaseSync<TInput, TOutput> {
  run: (input: TInput) => TOutput;
}
