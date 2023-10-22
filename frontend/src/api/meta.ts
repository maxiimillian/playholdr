import { useRouter } from 'next/router';

const router = useRouter();

// Redirect wrapper, does nothing now but will potentially want side effects in the future
export function redirect(path: string) {
  router.push(path);
}
