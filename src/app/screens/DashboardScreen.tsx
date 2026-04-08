import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, MapPin, Star, Users, Wifi, ArrowRight } from "lucide-react";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const sedes = [
  {
    id: 1,
    name: "Sede Medellín - Centro Innovation",
    city: "Medellín",
    address: "Carrera 43A #5-25, El Poblado",
    image: "https://images.unsplash.com/photo-1613036814506-a79f847abdd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb3dvcmtpbmclMjBvZmZpY2UlMjBNZWRlbGxpbnxlbnwxfHx8fDE3NzU1OTE4MjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
    capacity: 120,
    available: 45,
  },
  {
    id: 2,
    name: "Sede Medellín - Laureles Hub",
    city: "Medellín",
    address: "Circular 1 #70-65, Laureles",
    image: "https://images.unsplash.com/photo-1659044537787-a2ac4ce1d427?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3dvcmtpbmclMjBzcGFjZSUyMGludGVyaW9yJTIwQ29sb21iaWF8ZW58MXx8fHwxNzc1NTkxODI1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.6,
    capacity: 80,
    available: 22,
  },
  {
    id: 3,
    name: "Sede Medellín - Envigado Corporate",
    city: "Medellín",
    address: "Calle 30 Sur #43-40, Envigado",
    image: "https://images.unsplash.com/photo-1771147372627-7fffe86cf00b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBtZWV0aW5nJTIwcm9vbSUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NzU1OTE4MjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    capacity: 150,
    available: 68,
  },
];

export function DashboardScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSedes = sedes.filter(
    (sede) =>
      sede.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sede.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">SPACEIT</h1>
              <p className="text-sm text-gray-600">Hola, Usuario</p>
            </div>
            <button className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-medium">U</span>
            </button>
          </div>

          {/* Barra de búsqueda */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar sede o ciudad"
              className="pl-11 h-11 border-gray-300 rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Mapa preview */}
        <Card className="mb-6 overflow-hidden rounded-2xl shadow-sm border-0">
          <div className="relative h-40 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
                <path
                  d="M0,50 Q50,30 100,50 T200,50"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M0,60 Q50,40 100,60 T200,60"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
            <div className="relative text-white text-center">
              <MapPin className="w-12 h-12 mx-auto mb-2" />
              <p className="text-sm font-medium">3 sedes disponibles en Medellín</p>
            </div>
          </div>
        </Card>

        {/* Sección de sedes recomendadas */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Sedes recomendadas</h2>

          <div className="space-y-4">
            {filteredSedes.map((sede) => (
              <Card
                key={sede.id}
                className="overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border-0"
                onClick={() => navigate(`/map/${sede.id}`)}
              >
                <div className="relative h-48">
                  <ImageWithFallback
                    src={sede.image}
                    alt={sede.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-md">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-900">{sede.rating}</span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{sede.name}</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {sede.address}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{sede.capacity}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Wifi className="w-4 h-4" />
                        <span>Wi-Fi</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-green-600">
                        {sede.available} disponibles
                      </span>
                      <ArrowRight className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <Card className="p-4 text-center rounded-2xl border-0 bg-blue-50">
            <p className="text-2xl font-semibold text-blue-600">{sedes.length}</p>
            <p className="text-sm text-gray-600 mt-1">Sedes activas</p>
          </Card>
          <Card className="p-4 text-center rounded-2xl border-0 bg-green-50">
            <p className="text-2xl font-semibold text-green-600">
              {sedes.reduce((acc, s) => acc + s.available, 0)}
            </p>
            <p className="text-sm text-gray-600 mt-1">Espacios libres</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
