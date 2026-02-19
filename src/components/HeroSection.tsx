import { Button } from "@/components/Button";
import heroLaddus from "@/assets/phase_1_2.png";

export function HeroSection() {
  const scrollToChecker = () => {
    const element = document.getElementById('cycle-phase-checker');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-wellness-cream via-white to-wellness-pink/20 noise-bg">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/60 pointer-events-none"></div>

    <div className="container mx-auto px-4 py-24 max-w-7xl relative z-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div className="text-center lg:text-left space-y-8 relative">
          <div className="space-y-4">
            <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold text-gray-800 leading-none tracking-tighter animate-in fade-in slide-in-from-bottom-8 duration-1000 drop-shadow-sm selection:bg-wellness-pink/30">
              Seed Cycling <br /> <span className="text-wellness-green italic">Laddus</span>
            </h1>
            <p className="font-heading text-2xl md:text-4xl text-gray-600 font-medium animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 tracking-wide">
              Natural Hormone Balance for Women
            </p>
            <p className="text-xl md:text-2xl text-gray-500 font-light animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400 max-w-lg mx-auto lg:mx-0">
              ✨ Balance your hormones naturally with every bite.
            </p>
          </div>

          <div className="hidden lg:flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 pt-8">
            <Button variant="hero" onClick={scrollToChecker} className="shadow-xl shadow-wellness-green/20 hover:shadow-2xl hover:shadow-wellness-green/30 hover:scale-105 transition-all duration-300">
              Order Your Laddus Now
            </Button>
          </div>
        </div>

        {/* Hero Image 3D Container */}
        <div className="flex flex-col items-center justify-center lg:justify-end gap-8 perspective-1000 group">
          <div className="relative animate-in fade-in zoom-in-50 duration-1000 delay-200 transform transition-transform duration-500 hover:rotate-y-6 hover:rotate-x-6 preserve-3d">
            <div className="absolute -inset-10 bg-gradient-to-r from-wellness-pink/30 via-wellness-yellow/30 to-wellness-green-light/30 rounded-full blur-3xl animate-pulse opacity-60"></div>
            <img
              src={heroLaddus}
              alt="Phase I and Phase II Seed Cycling Laddus"
              className="relative w-full max-w-2xl h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700 z-10"
              style={{ transform: 'translateZ(50px)' }}
            />
            {/* Floating Elements */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/40 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center animate-bounce-slow delay-700" style={{ transform: 'translateZ(80px)' }}>
              <span className="text-2xl">🌱</span>
            </div>
            <div className="absolute bottom-10 -left-10 w-20 h-20 bg-white/40 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center animate-bounce-slow delay-1000" style={{ transform: 'translateZ(60px)' }}>
              <span className="text-2xl">⚡</span>
            </div>
          </div>

          <div className="flex lg:hidden w-full justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            <Button variant="hero" className="w-full sm:w-auto" onClick={scrollToChecker}>
              Order Your Laddus Now
            </Button>
          </div>
        </div>
      </div>
    </div>

    {/* Modern Decorative elements */}
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-wellness-pink/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-t from-wellness-green/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
  </section>;
}