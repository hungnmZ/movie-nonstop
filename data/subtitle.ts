import { sendGraphQLReq } from '@/helpers/fetch';

export const getSubtitles = async (titleId: string) => {
  const query = /* GraphQL */ `
    query Subtitles($titleId: String!) {
      subtitles(titleId: $titleId) {
        id
        subsceneId
        language
        files
      }
    }
  `;
  const response = await sendGraphQLReq(query, { titleId });
  const { data } = await response.json();

  return data;
};
