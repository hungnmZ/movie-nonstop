export const sendGraphQLReq = async (query: string, variables: object | null = null) => {
  const res = await fetch('https://xemphim.in/b/g', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!res.ok) {
    throw new Error(`Network response was not ok, status: ${res.status}`);
  }

  return res;
};
