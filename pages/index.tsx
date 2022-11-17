import { ReactElement, useState } from 'react';
import LoginLayout from '@components/LoginLayout';
import Head from 'next/head';
import { NextPageWithLayout } from './_app';
import LoginForm from 'feature/Login/LoginForm';
import useLogin from 'feature/Login/useLogin';

const Home: NextPageWithLayout = () => {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const { mutate, error, isLoading, data } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(login);
    if (data) console.log(data);
  };

  if (error) {
    return <p>Oops! 에러가 발생했습니다</p>;
  }

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <>
      <Head>
        <title>Preface</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <p>로그인</p>
      {JSON.stringify(isLoading)}
      <br />
      {JSON.stringify(data)}
      <LoginForm handleChange={handleChange} handleSubmit={handleSubmit} />
    </>
  );
};
export default Home;

Home.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};
