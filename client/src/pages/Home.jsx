import Header from '../components/layout/Header.jsx'
import Footer from '../components/layout/Footer.jsx'

export default function Home() {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <Header />
      <main className="pt-[80px]">
        {/* Phase 3 will populate this with HeroSection, FilterBar, Timeline, Sidebar */}
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-on-surface-variant font-headline italic text-lg">
            Coming soon — Phase 3 implementation
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
