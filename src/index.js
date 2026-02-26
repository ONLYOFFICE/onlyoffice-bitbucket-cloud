import Resolver from '@forge/resolver';
import api, { route } from '@forge/api';

const resolver = new Resolver();

resolver.define('getContent', async ({ context, payload }) => {
  const workspaceId = context.workspaceId;
  const repositoryId = context.extension.repository.uuid;
  const filePath = context.extension.file.path;
  const commit = context.extension.commit.hash;

  try {
    const response = await api
      .asUser()
      .requestBitbucket(
        route`/2.0/repositories/${workspaceId}/${repositoryId}/src/${commit}/${filePath}`
      );
    const content = await response.text();
    return { content };
  } catch (error) {
    console.error('Error in getContent:', error);
    return { content: 'Error fetching file content' };
  }
});
export const handler = resolver.getDefinitions();
