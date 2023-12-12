type Token = () => Promise<string>;

const token: Token = async (): Promise<string> => {
  const token = (
    await (
      await fetch('/workstation/auth', {
        method: 'post',
        body: JSON.stringify({ addr: Math.random() })
      })
    ).json()
  ).access;

  localStorage.setItem('access', token);

  return token;
};

export default token;
