import React, { useState, useEffect } from 'react';
import { CollectionPoint, PointSearchFilters, EnvironmentalStats, DisposalRecord } from './types';
import { searchService } from './services/searchService';
import { contentService } from './services/contentService';
import { Header } from './components/Header/Header';
import { HeroSection } from './components/Hero/HeroSection';
import { CollectionPointsSection } from './components/CollectionPoints/CollectionPointsSection';
import { HowItWorksSection } from './components/HowItWorks/HowItWorksSection';
import { MaterialsSection } from './components/Materials/MaterialsSection';
import { EducationSection } from './components/Education/EducationSection';
import { DisposalSection } from './components/Disposal/DisposalSection';
import { ImpactSection } from './components/Impact/ImpactSection';
import { ManagementPreviewSection } from './components/Management/ManagementPreviewSection';
import { SDGSection } from './components/SDG/SDGSection';
import { CallToActionSection } from './components/CTA/CallToActionSection';
import { Footer } from './components/Footer/Footer';
import { AuthModal } from './components/Modals/AuthModal';

export const App: React.FC = () => {
  const [points, setPoints] = useState<CollectionPoint[]>([]);
  const [isLoadingPoints, setIsLoadingPoints] = useState<boolean>(true);
  const [stats, setStats] = useState<EnvironmentalStats | null>(null);
  const [filters, setFilters] = useState<PointSearchFilters>({
    locationQuery: 'João Pessoa, PB',
    materialType: 'all',
    onlyAvailable: false,
    onlyFree: false,
  });
  const [userCoords, setUserCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [targetPointForDisposal, setTargetPointForDisposal] = useState<CollectionPoint | null>(null);

  // Auth modal state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authRole, setAuthRole] = useState<'citizen' | 'manager'>('citizen');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Load points and environmental statistics on mount and when filters change
  const loadPoints = async (currentFilters: PointSearchFilters, coords?: { latitude: number; longitude: number } | null) => {
    setIsLoadingPoints(true);
    try {
      const results = await searchService.searchPoints(currentFilters, coords || undefined);
      setPoints(results);
    } catch (err) {
      console.error('Error loading collection points:', err);
    } finally {
      setIsLoadingPoints(false);
    }
  };

  const loadStats = async () => {
    try {
      const s = await contentService.getEnvironmentalStats();
      setStats(s);
    } catch (err) {
      console.error('Error loading stats:', err);
    }
  };

  useEffect(() => {
    loadPoints(filters, userCoords);
    loadStats();

    // Listen to capacity changes
    const handleCapacityEvent = () => {
      loadPoints(filters, userCoords);
    };
    window.addEventListener('ecocircuito:capacity_full', handleCapacityEvent);
    return () => window.removeEventListener('ecocircuito:capacity_full', handleCapacityEvent);
  }, []);

  const handleHeroSearch = (searchData: { locationQuery: string; materialType: string }) => {
    const updated = {
      ...filters,
      locationQuery: searchData.locationQuery,
      materialType: searchData.materialType,
    };
    setFilters(updated);
    loadPoints(updated, userCoords);
  };

  const handleLocateUser = (coords: { latitude: number; longitude: number }) => {
    setUserCoords(coords);
    const updated = {
      ...filters,
      locationQuery: 'Sua localização atual',
    };
    setFilters(updated);
    loadPoints(updated, coords);
  };

  const handleFilterChange = (newFilters: PointSearchFilters) => {
    setFilters(newFilters);
    loadPoints(newFilters, userCoords);
  };

  const handleFilterByMaterialFromGuide = (materialName: string) => {
    const updated = {
      ...filters,
      materialType: materialName,
    };
    setFilters(updated);
    loadPoints(updated, userCoords);
  };

  const handleOpenAuth = (role: 'citizen' | 'manager', mode: 'login' | 'register') => {
    setAuthRole(role);
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleDisposalRegistered = (_record: DisposalRecord) => {
    loadStats();
    loadPoints(filters, userCoords);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF8] text-slate-800">
      {/* Header */}
      <Header onOpenAuth={handleOpenAuth} />

      {/* Main Content Area */}
      <main id="conteudo-principal" className="flex-grow">
        {/* Hero Section */}
        <HeroSection
          onSearch={handleHeroSearch}
          onLocateUser={handleLocateUser}
        />

        {/* Collection Points & Map Section */}
        <CollectionPointsSection
          points={points}
          isLoading={isLoadingPoints}
          filters={filters}
          onFilterChange={handleFilterChange}
          userCoords={userCoords}
          onOpenDisposalForPoint={(pt) => {
            setTargetPointForDisposal(pt);
            const target = document.getElementById('meu-impacto');
            if (target) target.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* How it Works Section */}
        <HowItWorksSection />

        {/* What You Can Discard Section */}
        <MaterialsSection
          onFilterByMaterial={handleFilterByMaterialFromGuide}
        />

        {/* Education Section */}
        <EducationSection />

        {/* Disposal Registration & Impact Section */}
        <DisposalSection
          points={points}
          preSelectedPoint={targetPointForDisposal}
          onDisposalRegistered={handleDisposalRegistered}
        />

        {/* Impact Summary Section */}
        {stats && (
          <div className="bg-slate-50/70 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ImpactSection stats={stats} />
            </div>
          </div>
        )}

        {/* Management & Transparency Preview Section */}
        <ManagementPreviewSection
          onOpenManagerAuth={() => handleOpenAuth('manager', 'login')}
        />

        {/* Sustainable Development Goals (SDG) */}
        <SDGSection />

        {/* Call to Action Section */}
        <CallToActionSection
          onOpenRegister={() => handleOpenAuth('citizen', 'register')}
          onScrollToPoints={() => {
            const target = document.getElementById('pontos-de-coleta');
            if (target) target.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Auth Modal (Citizen / Manager) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultRole={authRole}
        defaultMode={authMode}
      />
    </div>
  );
};

export default App;
