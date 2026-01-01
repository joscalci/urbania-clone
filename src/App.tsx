import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Publish from './pages/Publish';
import Search from './pages/Search';
import ListingDetail from './pages/ListingDetail';
import Plans from './pages/Plans';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* Placeholders for future routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/publish" element={<Publish />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/property/:id" element={<ListingDetail />} />
                    <Route path="/plans" element={<Plans />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
