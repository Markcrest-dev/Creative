

interface InteractiveMapProps {
    height?: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ height = '400px' }) => {
    // Creative★ Agency location - Los Angeles, CA coordinates
    const latitude = 34.0522;
    const longitude = -118.2437;

    // Google Maps Embed URL
    const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}&hl=en&z=14&output=embed`;

    return (
        <div className="relative rounded-lg overflow-hidden shadow-xl" style={{ height, width: '100%' }}>
            {/* Google Maps Iframe */}
            <iframe
                title="Creative Agency Office Location"
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Location Overlay Card */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-4 z-10 pointer-events-none max-w-xs">
                <div className="flex items-center gap-3">
                    <div className="bg-orange-500 rounded-full p-2.5 flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-900">Creative★ Agency</p>
                        <p className="text-xs text-gray-600">Design District, Los Angeles</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InteractiveMap;
