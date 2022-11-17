import { useState } from 'react';
import useCreateNewAccount from 'feature/Accounts/useCreateNewAccount';
import useCreateUser from 'feature/Users/hooks/useCreateUser';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { UserAddedList } from 'feature/Filter/atom';

const defaultValue = {
  email: '',
  password: '',
  name: '',
};

export default function Form() {
  const [isAdding, setIsAdding] = useState(false);
  const [addUser, setAddUser] = useState(defaultValue);
  const [accountsList, setAccountsList] = useRecoilState(UserAddedList);

  const { mutate } = useCreateUser();
  const { generateNewAccount } = useCreateNewAccount();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddUser({ ...addUser, [name]: value });
  };

  const handleAddUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, name } = addUser;
    if (email && password && name) {
      mutate(addUser, {
        onSuccess: () => {
          setIsAdding(false);
          const test = generateNewAccount();
          console.log(test);
        },
      });
      setAddUser(defaultValue);
    }
  };

  return (
    <FormContainer>
      <CreateButton onClick={() => setIsAdding((prv) => !prv)}>
        사용자 만들기
      </CreateButton>
      {isAdding && (
        <StyledForm onSubmit={(e) => handleAddUser(e)}>
          <span>email: </span>
          <input
            name="email"
            value={addUser.email}
            onChange={(e) => handleChange(e)}
          />
          <span>password: </span>
          <input
            name="password"
            type="password"
            value={addUser.password}
            onChange={(e) => handleChange(e)}
          />
          <span>name: </span>
          <input
            name="name"
            value={addUser.name}
            onChange={(e) => handleChange(e)}
          />
          <div />
          <ButtonBox>
            <NameButton type="submit">만들기</NameButton>
            <NameButton onClick={() => setIsAdding(false)}>취소</NameButton>
          </ButtonBox>
        </StyledForm>
      )}
    </FormContainer>
  );
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: flex-end;
`;

const CreateButton = styled.button`
  background-color: lightgray;
  border: 1px solid grey;
  border-radius: 5px;
  font-family: 'Pretendard';
  color: ${({ theme }) => theme.colors.primary};
  margin: 1rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
`;

const StyledForm = styled.form`
  width: 50%;
  display: grid;
  margin: 0.5rem 0 1rem;
  padding: 1rem;
  grid-template-columns: 1fr 3fr;
  gap: 0.2rem;
  border-radius: 5px;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const NameButton = styled.button`
  background-color: lightgray;
  width: 100%;
  border: 1px solid grey;
  border-radius: 5px;
  font-family: 'Pretendard';
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 0.2rem;
`;
