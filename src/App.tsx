import { Layout } from './components/layout/Layout';
import { AntimetalCursor } from './components/ui/AntimetalCursor';
import { Atmosphere } from './components/webgl/Atmosphere';
import { MouseMotionProvider } from './context/MouseMotionContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';

function App() {
  return (
    <Router>
      <MouseMotionProvider>
        <AntimetalCursor />
        <Layout>
          <Atmosphere />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </Layout>
      </MouseMotionProvider>
    </Router>
  );
}

export default App;
