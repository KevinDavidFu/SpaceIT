import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Users, Wifi, Wind, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

type SpaceType = "meeting" | "desk" | "cabin";
type SpaceStatus = "available" | "occupied";

interface Space {
  id: number;
  type: SpaceType;
  name: string;
  status: SpaceStatus;
  capacity: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

const spaces: Space[] = [
  // Salas de juntas (arriba)
  { id: 1, type: "meeting", name: "Sala Alpha", status: "available", capacity: 8, x: 20, y: 20, width: 80, height: 60 },
  { id: 2, type: "meeting", name: "Sala Beta", status: "occupied", capacity: 10, x: 120, y: 20, width: 80, height: 60 },
  { id: 3, type: "meeting", name: "Sala Gamma", status: "available", capacity: 6, x: 220, y: 20, width: 80, height: 60 },

  // Escritorios (medio)
  { id: 4, type: "desk", name: "Escritorio 1", status: "available", capacity: 1, x: 20, y: 100, width: 40, height: 40 },
  { id: 5, type: "desk", name: "Escritorio 2", status: "occupied", capacity: 1, x: 70, y: 100, width: 40, height: 40 },
  { id: 6, type: "desk", name: "Escritorio 3", status: "available", capacity: 1, x: 120, y: 100, width: 40, height: 40 },
  { id: 7, type: "desk", name: "Escritorio 4", status: "available", capacity: 1, x: 170, y: 100, width: 40, height: 40 },
  { id: 8, type: "desk", name: "Escritorio 5", status: "occupied", capacity: 1, x: 220, y: 100, width: 40, height: 40 },
  { id: 9, type: "desk", name: "Escritorio 6", status: "available", capacity: 1, x: 270, y: 100, width: 40, height: 40 },

  // Cabinas individuales (abajo)
  { id: 10, type: "cabin", name: "Cabina 1", status: "available", capacity: 1, x: 20, y: 160, width: 50, height: 50 },
  { id: 11, type: "cabin", name: "Cabina 2", status: "available", capacity: 1, x: 80, y: 160, width: 50, height: 50 },
  { id: 12, type: "cabin", name: "Cabina 3", status: "occupied", capacity: 1, x: 140, y: 160, width: 50, height: 50 },
  { id: 13, type: "cabin", name: "Cabina 4", status: "available", capacity: 1, x: 200, y: 160, width: 50, height: 50 },
  { id: 14, type: "cabin", name: "Cabina 5", status: "available", capacity: 1, x: 260, y: 160, width: 50, height: 50 },
];

export function MapScreen() {
  const navigate = useNavigate();
  const { sedeId } = useParams();
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);

  const getSpaceColor = (status: SpaceStatus) => {
    return status === "available" ? "#4CAF50" : "#F44336";
  };

  const handleSpaceClick = (space: Space) => {
    if (space.status === "available") {
      setSelectedSpace(space);
    }
  };

  const handleReserve = () => {
    if (selectedSpace) {
      navigate("/confirmation", { state: { space: selectedSpace, sedeId } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Mapa de planta</h1>
              <p className="text-sm text-gray-600">Selecciona un espacio disponible</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Leyenda */}
        <Card className="mb-6 p-4 rounded-2xl border-0 shadow-sm">
          <div className="flex items-center justify-around text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[#4CAF50]"></div>
              <span className="text-gray-700">Disponible</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[#F44336]"></div>
              <span className="text-gray-700">Ocupado</span>
            </div>
          </div>
        </Card>

        {/* Mapa SVG */}
        <Card className="mb-6 overflow-hidden rounded-2xl border-0 shadow-sm">
          <div className="bg-gray-100 p-4">
            <svg
              viewBox="0 0 320 230"
              className="w-full h-auto"
              style={{ maxHeight: "400px" }}
            >
              {/* Fondo */}
              <rect width="320" height="230" fill="white" />

              {/* Espacios */}
              {spaces.map((space) => (
                <g
                  key={space.id}
                  onClick={() => handleSpaceClick(space)}
                  className={space.status === "available" ? "cursor-pointer" : "cursor-not-allowed"}
                  style={{ transition: "opacity 0.2s" }}
                  opacity={selectedSpace?.id === space.id ? 0.8 : 1}
                >
                  <rect
                    x={space.x}
                    y={space.y}
                    width={space.width}
                    height={space.height}
                    fill={getSpaceColor(space.status)}
                    stroke="#ffffff"
                    strokeWidth="2"
                    rx="4"
                  />
                  <text
                    x={space.x + space.width / 2}
                    y={space.y + space.height / 2}
                    fill="white"
                    fontSize="10"
                    fontWeight="600"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {space.name}
                  </text>
                </g>
              ))}

              {/* Etiquetas de sección */}
              <text x="10" y="15" fill="#666" fontSize="10" fontWeight="500">Salas de juntas</text>
              <text x="10" y="95" fill="#666" fontSize="10" fontWeight="500">Escritorios</text>
              <text x="10" y="155" fill="#666" fontSize="10" fontWeight="500">Cabinas individuales</text>
            </svg>
          </div>
        </Card>

        {/* Estadísticas */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-3 text-center rounded-xl border-0 bg-blue-50">
            <p className="text-xl font-semibold text-blue-600">
              {spaces.filter((s) => s.type === "meeting" && s.status === "available").length}
            </p>
            <p className="text-xs text-gray-600 mt-1">Salas libres</p>
          </Card>
          <Card className="p-3 text-center rounded-xl border-0 bg-green-50">
            <p className="text-xl font-semibold text-green-600">
              {spaces.filter((s) => s.type === "desk" && s.status === "available").length}
            </p>
            <p className="text-xs text-gray-600 mt-1">Escritorios</p>
          </Card>
          <Card className="p-3 text-center rounded-xl border-0 bg-purple-50">
            <p className="text-xl font-semibold text-purple-600">
              {spaces.filter((s) => s.type === "cabin" && s.status === "available").length}
            </p>
            <p className="text-xs text-gray-600 mt-1">Cabinas</p>
          </Card>
        </div>
      </div>

      {/* Modal de detalles */}
      {selectedSpace && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 px-4 pb-4">
          <Card className="w-full max-w-md rounded-3xl border-0 shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 relative">
              <button
                onClick={() => setSelectedSpace(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-semibold mb-2">{selectedSpace.name}</h3>
              <p className="text-blue-100 text-sm">Espacio disponible para reservar</p>
            </div>

            <div className="p-6">
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Capacidad</p>
                    <p className="font-medium">
                      {selectedSpace.capacity} {selectedSpace.capacity === 1 ? "persona" : "personas"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Wifi className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Conectividad</p>
                    <p className="font-medium">Wi-Fi de alta velocidad</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center">
                    <Wind className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Climatización</p>
                    <p className="font-medium">Aire acondicionado</p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleReserve}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-md"
              >
                Reservar ahora
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
