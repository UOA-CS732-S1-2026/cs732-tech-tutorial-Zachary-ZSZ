export default function Footer() {
  return (
    <footer className="w-full border-t border-outline-variant/20 bg-surface z-50 relative">
      <div className="w-full py-12 px-8 max-w-screen-2xl mx-auto">
        <p className="text-label-sm uppercase text-neutral-600 font-label">
          © {new Date().getFullYear()} ClassicRide. Heritage of Automotive Engineering.
        </p>
      </div>
    </footer>
  )
}
