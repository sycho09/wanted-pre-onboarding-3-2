import styled from 'styled-components';

type IPaginationProps = {
  totalPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = ({
  totalPage = 7,
  currentPage,
  setCurrentPage,
}: IPaginationProps) => {
  return (
    <Container>
      {totalPage > 1 && (
        <>
          <PaginationButton
            onClick={() => setCurrentPage((old) => Math.max(old - 1, 1))}
            disabled={currentPage === 1}
          >
            &lt;
          </PaginationButton>
          {Array(totalPage)
            .fill(0)
            .map((_, i) => (
              <PaginationButton
                key={i + 1}
                aria-current={currentPage === i + 1 ? 'page' : undefined}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </PaginationButton>
            ))}
          <PaginationButton
            onClick={() =>
              setCurrentPage((old) => Math.min(old + 1, totalPage))
            }
            disabled={currentPage === totalPage}
          >
            &gt;
          </PaginationButton>
        </>
      )}
    </Container>
  );
};
export default Pagination;

const Container = styled.div`
  text-align: center;
  padding: 1rem 0 2rem;
`;

const PaginationButton = styled.button`
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.grey};
  background: #fff;
  padding: 4px 8px;
  margin: 0 2px;
  color: ${({ theme }) => theme.colors.grey};
  font-size: 1rem;

  &:first-child {
    margin-right: 10px;
    border-radius: 8px;
    border: none;
  }

  &:last-child {
    margin-left: 10px;
    border-radius: 8px;
    border: none;
  }
  &:hover {
    color: #fff;
    background-color: ${({ theme }) => theme.colors.grey};
    cursor: pointer;
    transform: translateY(-1px);
  }
  &[disabled] {
    display: none;
  }
  &[aria-current] {
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
    cursor: revert;
    transform: revert;
  }
`;
