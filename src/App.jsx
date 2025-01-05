import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PaginaBase from './pages/PaginaBase';
import Home from './pages/Home';
import { Modal } from './components/Modal';
import NovoVideo from './pages/NovoVideo';
import NotFound from './pages/NotFound';

function App() {

  return (
    <>
      <BrowserRouter>
        <Modal />
        <Routes>
          <Route path='/' element={<PaginaBase />}>
            <Route index element={<Home />} />
            <Route path='/novovideo' element={<NovoVideo />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
