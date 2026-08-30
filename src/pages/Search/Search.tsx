import { useEffect, useState } from "react";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";



import SearchResults from "../../components/Search/SearchResults/SearchResults";

import { searchUsers } from "../../services/userApi";

import type { User } from "../../types/user";

const Search = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] =
    useSearchParams();

  // Query همیشه مستقیماً از URL خوانده می‌شود
  const query = searchParams.get("q") ?? "";

  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const trimmedQuery = query.trim();

    // وقتی سرچ خالی شد، نتایج قبلی پاک شوند
    if (!trimmedQuery) {
      setUsers([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    let isCancelled = false;

    const timeoutId = window.setTimeout(async () => {
      try {
        setIsLoading(true);
        setError(null);

        const results = await searchUsers(trimmedQuery);

        if (isCancelled) {
          return;
        }

        setUsers(results);
      } catch (error) {
        if (isCancelled) {
          return;
        }

        console.error("Failed to search users:", error);

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
      window.clearTimeout(timeoutId);
    };
  }, [query]);

  const handleSearchChange = (value: string) => {
    const trimmedValue = value.trimStart();

    // اگر سرچ کاملاً پاک شد، برگرد به Home
    if (!trimmedValue.trim()) {
      setUsers([]);
      setError(null);
      setIsLoading(false);
      setSearchParams({});
      navigate("/");
      return;
    }

    setSearchParams({
      q: trimmedValue,
    });
  };

  const handleClear = () => {
    setUsers([]);
    setError(null);
    setIsLoading(false);
    setSearchParams({});
    navigate("/");
  };

  return (
    <main
      className="
        min-h-screen
    bg-[var(--color-background-primary)]
    px-4
    pt-24
    pb-6
    text-[var(--color-content-primary)]
    sm:px-6
    lg:px-8
      "
    >
      <div className="mx-auto w-full max-w-[900px]">
        

        {/* Search Results */}
        {query.trim() && (
          <section>
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