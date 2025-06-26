import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br w-full from-green-50 to-indogo-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          Free <span className="text-green-600">Short URL & QR Code</span> Genarator
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Enter your url in the following box and get instant short url with qr code
        </p>

        </div>
    </div>
  );
}
