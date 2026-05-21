import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { SpreadSetupPage } from '@/pages/SpreadSetupPage';
import { ShufflePage } from '@/pages/ShufflePage';
import { ReadingPage } from '@/pages/ReadingPage';
import { SettingsPage } from '@/pages/SettingsPage';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/spread-setup" element={<SpreadSetupPage />} />
        <Route path="/shuffle" element={<ShufflePage />} />
        <Route path="/reading" element={<ReadingPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Layout>
  );
}
