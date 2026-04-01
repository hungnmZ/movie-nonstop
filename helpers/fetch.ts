const RETRYABLE_STATUSES = new Set([429, 500, 502, 503, 504]);

const delay = (duration: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, duration);
  });

export const sendGraphQLReq = async (query: string, variables: object | null = null) => {
  const maxRetries = 2;

  for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
    const res = await fetch('https://xemphim.in/b/g', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (res.ok) {
      return res;
    }

    const canRetry = RETRYABLE_STATUSES.has(res.status) && attempt < maxRetries;

    if (!canRetry) {
      throw new Error(`Network response was not ok, status: ${res.status}`);
    }

    await delay(180 * (attempt + 1));
  }

  throw new Error('Network response was not ok, status: unknown');
};
