/**
 * Retry a fetch operation with exponential backoff
 * @param fn The fetch function to retry
 * @param retries Number of retry attempts (default: 3)
 * @param delay Initial delay in ms (default: 1000)
 */
export async function fetchWithRetry<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000,
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) {
      throw error;
    }

    const isRetriableError =
      error instanceof TypeError ||
      (error instanceof Error &&
        error.message.toLowerCase().includes("timeout"));

    if (!isRetriableError) {
      throw error;
    }

    console.warn(
      `Fetch failed, retrying... (${retries} attempts remaining)`,
      error,
    );

    // wait before retrying with exponential backoff
    await new Promise((resolve) => setTimeout(resolve, delay));

    // retry with increased delay
    return fetchWithRetry(fn, retries - 1, delay * 2);
  }
}
