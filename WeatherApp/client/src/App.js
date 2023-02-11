import WeatherMap from "./page/WeatherMap";
import styled from 'styled-components'


function App() {
  return (
    <Wrapper>
      <WeatherMap />
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
width: 100vw;
height: 100vh;
display: flex;
flex-direction: column;
justify-content: center;
`