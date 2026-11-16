/**
 *
 * (c) Copyright Ascensio System SIA 2026
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { unwrapUuid } from "@forge/bitbucket";
import Resolver, { Request } from "@forge/resolver";

import { postRemoteAppAuthorization } from "../client";

const editorPageResolver = new Resolver();

editorPageResolver.define("authorizeRemoteApp", async (request: Request) => {
  const { workspaceId, extension } = request.context;
  const { environmentId, locale } = request.payload;

  const repositoryId = extension.repository.uuid;
  const filePath = extension.file.path;
  const commit = extension.commit.hash;

  return await postRemoteAppAuthorization(
    unwrapUuid(workspaceId),
    environmentId,
    unwrapUuid(repositoryId),
    commit,
    filePath,
    locale,
  );
});

export default editorPageResolver.getDefinitions();
