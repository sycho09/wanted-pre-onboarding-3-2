import { useState } from 'react';
import { User } from '@utils/types';
import styled from 'styled-components';
import useDeleteUser from './hooks/useDeleteUser';
import useUpdateUser from './hooks/useUpdateUser';

type UserDetail = {
  user: User;
};

export default function UserItem({ user }: UserDetail) {
  const [isToggled, setIsToggled] = useState(false);
  const [updateInfo, setUpdateInfo] = useState({
    email: user.email,
    password: '',
    name: '',
  });

  const { mutate } = useDeleteUser();
  const { mutate: updateMutation } = useUpdateUser(updateInfo);

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateInfo({ ...updateInfo, [name]: value });
  };

  const updateUser = (e: React.FormEvent<HTMLFormElement>, userId: number) => {
    e.preventDefault();
    const { email, password, name } = updateInfo;
    if (email && password && name) {
      updateMutation(userId, {
        onSuccess: () => {
          setIsToggled(false);
        },
      });
      setUpdateInfo({ ...updateInfo, password: '', name: '' });
    }
  };

  const removeUser = (id: number) => {
    const isOk = window.confirm('정말 삭제하시겠습니까?');
    if (isOk) mutate(id);
  };

  return (
    <>
      {!isToggled ? (
        <InfoWrapper>
          <span>
            {user.id}. {user.name}
          </span>
          <div>
            <Button onClick={() => setIsToggled((pv) => !pv)}>이름 변경</Button>
            <Button onClick={() => removeUser(user.id)}>삭제</Button>
          </div>
        </InfoWrapper>
      ) : (
        <StyledForm onSubmit={(e) => updateUser(e, user.id)}>
          <Box>
            <span>새 이름: </span>
            <input
              name="name"
              value={updateInfo.name}
              onChange={(e) => handleUpdate(e)}
            />
            <span>비밀번호: </span>
            <input
              name="password"
              type="password"
              value={updateInfo.password}
              onChange={(e) => handleUpdate(e)}
            />
            <div />
            <ButtonBox>
              <NameButton onClick={() => setIsToggled(() => false)}>
                취소
              </NameButton>
              <NameButton type="submit">확인</NameButton>
            </ButtonBox>
          </Box>
        </StyledForm>
      )}
    </>
  );
}

const InfoWrapper = styled.div`
  display: flex;
  width: calc(100% - 1rem);
  padding: 0.4rem 0.5rem;
  box-sizing: border-box;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
`;

const Button = styled.button`
  background-color: lightgray;
  border: 1px solid grey;
  border-radius: 5px;
  font-family: 'Pretendard';
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 0.2rem;
`;

const StyledForm = styled.form`
  margin: 0.2rem;
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 0.5rem;
`;

const Box = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  padding: 1.2rem;
  padding-left: 0.5rem;
  gap: 0.2rem;
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
