import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
	from {
    opacity: 0;
    transform: translateY(-30px);
	}
	to {
    opacity: 1;
    transform: translateY(0px);
	}
`;

const ComponentAnimation = styled.div`
  background: grey;
  position: relative;
  padding: 10px;
  animation-name: ${slideIn};
  animation-duration: 500ms;
  animation-timing-function: ease;
  form {
    padding: 10px;
    label {
      padding-right: 10px;
    }
  }
`;

export default ComponentAnimation;
