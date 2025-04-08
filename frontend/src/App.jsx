import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import './App.css';
import { Root } from './components/Root/Root';

function App() {
  return (
    <Root>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Root>
  );
}

export default App;
