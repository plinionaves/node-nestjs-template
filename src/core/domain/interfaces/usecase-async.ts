export interface UseCaseAsync<TInput, TOutput> {
  run: (input: TInput) => Promise<TOutput>;
}
