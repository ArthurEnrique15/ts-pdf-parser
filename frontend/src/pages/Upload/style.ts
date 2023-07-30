import styled from 'styled-components'

export const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  padding: 2rem;

  gap: 2rem;

  color: ${({ theme }) => theme['base-span']};

  input {
    width: 40%;
  }

  button {
    padding: 1rem;

    border-radius: 6px;
    border: 1px solid transparent;

    color: ${({ theme }) => theme['base-span']};
    background-color: ${({ theme }) => theme['base-post']};

    transition: 0.5s;

    &:not(:disabled):hover {
      border: 1px solid ${({ theme }) => theme.blue};
      color: ${({ theme }) => theme.blue};
    }
  }
`
