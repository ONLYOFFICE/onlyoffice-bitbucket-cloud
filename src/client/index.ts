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

import { APIResponse, invokeRemote } from "@forge/api";

import { ClientError, RemoteAppAuthorization } from "../../src/types/types";

export const postRemoteAppAuthorization = async (
  workspaceId: string,
  environmentId: string,
  repositoryId: string,
  commit: string,
  filePath: string,
  locale: string,
): Promise<RemoteAppAuthorization> => {
  return await _executeRequest<RemoteAppAuthorization>(
    async () => {
      return await invokeRemote("remote-service", {
        method: "POST",
        path: "/api/v1/remote/authorization",
        headers: {
          "Content-Type": "application/json",
          "x-cloud-id": workspaceId,
          "x-environment-id": environmentId,
        },
        body: JSON.stringify({
          parentId: repositoryId,
          entityId: `${commit}:${filePath}`,
          locale: locale,
        }),
      });
    },
    async (response: APIResponse) => {
      return await response.json();
    },
    1,
  );
};

async function _executeRequest<T>(
  onRequest: () => Promise<APIResponse>,
  onResponse: (response: APIResponse) => T | Promise<T>,
  retry = 0,
): Promise<T> {
  try {
    const response = await onRequest();

    if (response.ok || response.status === 303) {
      return await onResponse(response);
    }

    throw new ClientError(
      `Request failed with status ${response.status}: ${response.statusText}`,
      response.status,
    );
  } catch (error) {
    if (
      error instanceof TypeError &&
      error.cause instanceof Error &&
      error.cause.name === "ConnectTimeoutError" &&
      retry > 0
    ) {
      return _executeRequest(onRequest, onResponse, retry - 1);
    }

    throw error;
  }
}
