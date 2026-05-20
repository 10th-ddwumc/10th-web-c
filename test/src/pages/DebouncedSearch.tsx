// pages/DebouncedSearch.tsx
import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useDebounce } from "../hooks/useDebounce";

type SearchResult = {
  results: string[];
  elapsed: number;
  nextCursor?: string;
};

export function DebouncedSearch() {
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 300);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
  useInfiniteQuery<SearchResult>({
    queryKey: ["search", debouncedQuery],
    queryFn: ({ pageParam }) =>
      DelayTime(debouncedQuery, pageParam as string | undefined),
    enabled: !!debouncedQuery.trim(),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
    initialPageParam: undefined,
  });

  const results = data?.pages.flatMap((page) => page.results) ?? [];
  const elapsed = data?.pages[data.pages.length - 1]?.elapsed ?? 0;

  return (
    <div>
      <SearchBox
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <p>지연 시간: {elapsed}ms</p>
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "불러오는 중..." : "더 보기"}
        </button>
      )}
    </div>
  );
}

export function SearchBox({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type="search"
      placeholder="검색어를 입력하세요"
      value={value}
      onChange={onChange}
    />
  );
}

export async function DelayTime(
  query: string,
  cursor?: string
): Promise<{ results: string[]; elapsed: number; nextCursor?: string }> {
  if (!query.trim()) return { results: [], elapsed: 0 };

  const start = Date.now();
  await new Promise((r) => setTimeout(r, 300));
  const elapsed = Date.now() - start;

  const url = cursor
    ? `/api/search?q=${query}&cursor=${cursor}`
    : `/api/search?q=${query}`;

  const { results, nextCursor } = await fetch(url).then((res) => res.json());

  return { results, elapsed, nextCursor };
}