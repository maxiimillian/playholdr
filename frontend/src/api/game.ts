import { redirect } from './meta';
import { getDefaultHeaders } from './user';

interface GameResponse extends Response {
  code: string;
}

async function requestHandler(fetchRequest: Promise<Response>) {
  const response = await fetchRequest;
  return await response.json();
}

async function defaultPostRequest(path: string, body = {}): Promise<any> {
  const headers = getDefaultHeaders();

  const request = fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  return requestHandler(request);
}

export function createGame(game: string, settings: any) {
  defaultPostRequest(`/${game}/create`, settings).then((data: GameResponse) => {
    if (data.ok) {
      redirect(`/${game}/${data.code}`);
    }
  });
}
