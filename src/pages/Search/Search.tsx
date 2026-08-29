import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import SearchBar from "../../components/Search/SearchBar/SearchBar";
import SearchResults from "../../components/Search/SearchResults/SearchResults";

import { searchUsers } from "../../services/userApi";

import type { User } from "../../types/user";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(
    searchParams.get("q") ?? "",
  );

  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* =========================
     Sync query with URL
  ========================= */

  useEffect(() => {
    const urlQuery = searchParams.get("q") ?? "";

    if (urlQuery !== query) {
      setQuery(urlQuery);
    }
  }, [searchParams, query]);

  /* =========================
     Search Users
  ========================= */

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setUsers([]);
      setError(null);
      setIsLoading(false);

      return;
    }

    let isCancelled = false;

    const timeoutId = setTimeout(async () => {
      try {
        setIsLoading(true);
        setError(null);

        console.log(
          "[Rivo] Searching users:",
          trimmedQuery,
        );

        const results = await searchUsers(trimmedQuery);

        console.log(
          "[Rivo] Search results:",
          results,
        );

        console.log(
          "[Rivo] Users count:",
          results.length,
        );

        if (isCancelled) {
          return;
        }

        setUsers(results);
      } catch (error) {
        if (isCancelled) {
          return;
        }

        console.error(
          "[Rivo] Search failed:",
          error,
        );

        setUsers([]);

        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong while searching.",
        );
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }, 400);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [query]);

  /* =========================
     Search Input
  ========================= */

  const handleSearchChange = (value: string) => {
    setQuery(value);

    const trimmedValue = value.trim();

    if (!trimmedValue) {
      setSearchParams({});

      return;
    }

    setSearchParams({
      q: trimmedValue,
    });
  };

  /* =========================
     Clear Search
  ========================= */

  const handleClear = () => {
    setQuery("");
    setUsers([]);
    setError(null);

    setSearchParams({});
  };

  return (
    <main
      className="
        min-h-screen
        bg-[var(--color-background-primary)]
        px-4
        py-6
        pt-20
        text-[var(--color-content-primary)]
        sm:px-6
        lg:px-8
      "
    >
      <div className="mx-auto w-full max-w-[900px]">
        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar
            value={query}
            onChange={handleSearchChange}
            onClear={handleClear}
          />
        </div>

        {/* Search Results */}
        {query.trim() && (
          <section>
            {/* Result Header */}
            <div className="mb-5">
              <h1 className="text-[20px] font-semibold">
                Search results for "{query}"
              </h1>

              <p
                className="
                  mt-1
                  text-[14px]
                  text-[var(--color-content-secondary)]
                "
              >
                {isLoading
                  ? "Searching..."
                  : `${users.length} ${
                      users.length === 1
                        ? "user"
                        : "users"
                    } found`}
              </p>
            </div>

            {/* Results */}
            <SearchResults
              users={users}
              query={query}
              isLoading={isLoading}
              error={error}
            />
          </section>
        )}
      </div>
    </main>
  );
};

export default Search;