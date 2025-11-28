import { useEffect } from 'react';
import { useAdvancedStyling } from '../hooks/useAdvancedStyling';

const AdvancedStylingDemo = () => {
  const {
    theme,
    setTheme,
    setCustomColor,
    animationsEnabled,
    applyGradient,
    applyTextGradient,
    applyFilter,
    applyTransform
  } = useAdvancedStyling();

  // Apply styles on component mount
  useEffect(() => {
    // Set custom colors
    setCustomColor('primary', '#f97316');
    setCustomColor('secondary', '#3b82f6');
    setCustomColor('accent', '#10b981');
    
    // Apply gradients after a short delay to ensure elements are rendered
    const timer = setTimeout(() => {
      applyGradient('gradient-box', ['#f97316', '#3b82f6', '#10b981']);
      applyTextGradient('gradient-text', ['#f97316', '#3b82f6']);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [setCustomColor, applyGradient, applyTextGradient]);

  // Handle hover effects
  const handleHover = (elementId: string) => {
    applyFilter(elementId, 'brightness(1.2)');
    applyTransform(elementId, 'scale(1.05)');
  };

  const handleLeave = (elementId: string) => {
    applyFilter(elementId, 'none');
    applyTransform(elementId, 'scale(1)');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 
            id="gradient-text"
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Advanced Styling Demo
          </h1>
          <p className="text-lg text-gray-600">
            Demonstrating advanced CSS techniques and dynamic styling
          </p>
        </div>

        {/* Theme Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Theme Controls</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setTheme('light')}
              className={`px-4 py-2 rounded-lg transition-all ${
                theme === 'light' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Light Theme
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`px-4 py-2 rounded-lg transition-all ${
                theme === 'dark' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Dark Theme
            </button>
            <button
              onClick={() => setTheme('auto')}
              className={`px-4 py-2 rounded-lg transition-all ${
                theme === 'auto' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Auto Theme
            </button>
          </div>
        </div>

        {/* Gradient Demo */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Gradient Effects</h2>
          <div 
            id="gradient-box"
            className="h-48 rounded-lg mb-4 transition-all duration-500"
          />
          <p className="text-gray-600">
            This box demonstrates dynamic gradient backgrounds applied via JavaScript.
          </p>
        </div>

        {/* Animation Demo */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Animation Controls</h2>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-gray-700">Animations:</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              animationsEnabled 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {animationsEnabled ? 'Enabled' : 'Disabled'}
            </span>
          </div>
          <p className="text-gray-600">
            Animations are automatically disabled for users who prefer reduced motion.
          </p>
        </div>

        {/* Interactive Demo */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Interactive Effects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              id="interactive-1"
              className="h-32 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold cursor-pointer transition-all duration-300"
              onMouseEnter={() => handleHover('interactive-1')}
              onMouseLeave={() => handleLeave('interactive-1')}
            >
              Hover Me
            </div>
            <div
              id="interactive-2"
              className="h-32 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold cursor-pointer transition-all duration-300"
              onMouseEnter={() => handleHover('interactive-2')}
              onMouseLeave={() => handleLeave('interactive-2')}
            >
              Hover Me
            </div>
            <div
              id="interactive-3"
              className="h-32 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold cursor-pointer transition-all duration-300"
              onMouseEnter={() => handleHover('interactive-3')}
              onMouseLeave={() => handleLeave('interactive-3')}
            >
              Hover Me
            </div>
          </div>
          <p className="text-gray-600 mt-4">
            These boxes demonstrate dynamic CSS filters and transforms applied on hover.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdvancedStylingDemo;