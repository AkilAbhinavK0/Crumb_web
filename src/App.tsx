import { Layout } from './components/layout/Layout';
import { Cursor } from './components/ui/Cursor';
import { Atmosphere } from './components/effects/Atmosphere';
import { MouseMotionProvider } from './contexts/MouseMotionContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <MouseMotionProvider>
          <Cursor />
          <Layout>
            <Atmosphere />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
            </Routes>
          </Layout>
        </MouseMotionProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
