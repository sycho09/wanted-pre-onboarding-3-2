import React from 'react';

type LoginProps = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function LoginForm({ handleChange, handleSubmit }: LoginProps) {
  return (
    <form onSubmit={handleSubmit}>
      <p>E-MAIL</p>
      <input name="email" type="email" onChange={(e) => handleChange(e)} />
      <p>PASSWORD</p>
      <input
        name="password"
        type="password"
        onChange={(e) => handleChange(e)}
      />
      <button type="submit">제출</button>
    </form>
  );
}
