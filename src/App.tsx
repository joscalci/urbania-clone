import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Publish from './pages/Publish';
import PublishLanding from './pages/PublishLanding';
import ProfileSelection from './pages/ProfileSelection';
import Search from './pages/Search';
import ListingDetail from './pages/ListingDetail';
import Plans from './pages/Plans';
import Compare from './pages/Compare';
import ModerationDashboard from './pages/ModerationDashboard';
import About from './pages/About';
import Help from './pages/Help';
import Legal from './pages/Legal';
import LogoOptions from './pages/LogoOptions';
import ProtectedRoute from './components/ProtectedRoute';
import AIChatbot from './components/AIChatbot';
import ComparisonBar from './components/ComparisonBar';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/publish-landing" element={<PublishLanding />} />
                    <Route path="/profile-selection" element={<ProfileSelection />} />
                    <Route path="/publish" element={
                        <ProtectedRoute>
                            <Publish />
                        </ProtectedRoute>
                    } />
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="/search" element={<Search />} />
                    <Route path="/listing/:id" element={<ListingDetail />} />
                    <Route path="/plans" element={<Plans />} />
                    <Route path="/compare" element={<Compare />} />
                    <Route path="/moderation" element={<ModerationDashboard />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/legal" element={<Legal />} />
                    <Route path="/branding" element={<LogoOptions />} />
                </Routes>
            </Layout>
            <AIChatbot />
            <ComparisonBar />
        </Router>
    );
}

export default App;
