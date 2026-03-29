import { LoginForm } from "./LoginForm";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Calendar, Users, Clock, BookOpen } from "lucide-react";

export function Login() {
  return (
    <div className="size-full min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex">
      {/* Left side - Branding and Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 to-emerald-700 p-12 flex-col justify-between relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <Calendar className="w-7 h-7 text-green-600" />
            </div>
            <div>
              <h1 className="text-white text-2xl">SPIST</h1>
              <p className="text-green-100 text-sm">Scheduling System</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-white text-4xl leading-tight">
              Southern Philippines<br />Institute of Science<br />and Technology
            </h2>
            <p className="text-green-100 text-lg max-w-md">
              Streamline your academic scheduling with our comprehensive management system.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="relative z-10 grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <Users className="w-6 h-6 text-white mb-2" />
            <p className="text-white">Student Management</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <Clock className="w-6 h-6 text-white mb-2" />
            <p className="text-white">Class Scheduling</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <BookOpen className="w-6 h-6 text-white mb-2" />
            <p className="text-white">Course Planning</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <Calendar className="w-6 h-6 text-white mb-2" />
            <p className="text-white">Academic Calendar</p>
          </div>
        </div>

        {/* Decorative image */}
        <div className="absolute bottom-0 right-0 w-96 h-96 opacity-20">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1706078355012-f327ce8edeea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwZ3JlZW4lMjBidWlsZGluZ3xlbnwxfHx8fDE3NzQ1OTQzMzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Campus"
            className="w-full h-full object-cover rounded-tl-3xl"
          />
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-green-800 text-2xl">SPIST</h1>
              <p className="text-green-600 text-sm">Scheduling System</p>
            </div>
          </div>

          <LoginForm />

          <p className="text-center text-sm text-gray-600 mt-8">
            © 2026 Southern Philippines Institute of Science and Technology. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
