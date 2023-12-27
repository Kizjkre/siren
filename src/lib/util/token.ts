import token from '$lib/stores/token';

type Token = () => Promise<any>;

const getToken: Token = async (): Promise<any> => {
  const tok: string | null = localStorage.getItem('access');
  if (tok) {
    token.set(tok);
    return;
  }

  const t = (
    await (
      await fetch('/workstation/auth', {
        method: 'post',
        body: JSON.stringify({ addr: Math.random() })
      })
    ).json()
  ).access;

  localStorage.setItem('access', t);

  token.set(t);
};

export default getToken;
