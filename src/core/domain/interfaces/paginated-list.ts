export interface OffsetPaginationInput {
  first?: number;
  last?: number;
  offset?: number;
  page?: number;
}

export interface OffsetPaginationOutput {
  total: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface CursorPaginationOutput {
  startCursor: string;
  currentCursor: string;
  endCursor: string;
}

export interface PaginatedList<TData, TMetadata> {
  data: TData[];
  metadata: TMetadata;
}
