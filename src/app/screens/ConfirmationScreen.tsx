import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { ArrowLeft, Calendar, Clock, MapPin, CreditCard, Check, QrCode } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import { QRCodeSVG } from "qrcode.react";

export function ConfirmationScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { space, sedeId } = location.state || {};

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<string>("card");
  const [showSuccess, setShowSuccess] = useState(false);

  const services = [
    { id: "parking", name: "Parqueadero", price: 8000 },
    { id: "cafeteria", name: "Cafetería", price: 12000 },
  ];

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const calculateTotal = () => {
    const basePrice = 35000; // Precio base por hora
    const servicesTotal = selectedServices.reduce((total, serviceId) => {
      const service = services.find((s) => s.id === serviceId);
      return total + (service?.price || 0);
    }, 0);
    return basePrice + servicesTotal;
  };

  const handleConfirm = () => {
    setShowSuccess(true);
  };

  if (!space) {
    navigate("/dashboard");
    return null;
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <Card className="rounded-3xl border-0 shadow-2xl overflow-hidden">
            {/* Animación de éxito */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-8 text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in duration-500">
                <Check className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">¡Tu acceso está listo!</h2>
              <p className="text-green-100">Reserva confirmada exitosamente</p>
            </div>

            {/* Código QR */}
            <div className="p-8 bg-white">
              <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 flex items-center justify-center mb-6">
                <QRCodeSVG
                  value={`SPACEIT-${space.id}-${Date.now()}`}
                  size={200}
                  level="H"
                  includeMargin
                />
              </div>

              <div className="text-center mb-6">
                <p className="text-sm text-gray-600 mb-2">Código de acceso</p>
                <p className="text-2xl font-mono font-semibold text-gray-900">
                  {`SPACE-${String(space.id).padStart(4, "0")}`}
                </p>
              </div>

              {/* Detalles de la reserva */}
              <div className="bg-gray-50 rounded-2xl p-4 space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Espacio</span>
                  <span className="font-medium text-gray-900">{space.name}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Fecha</span>
                  <span className="font-medium text-gray-900">7 Abril, 2026</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Hora</span>
                  <span className="font-medium text-gray-900">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total pagado</span>
                  <span className="font-semibold text-green-600">
                    ${calculateTotal().toLocaleString()} COP
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => navigate("/dashboard")}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium"
                >
                  Volver al inicio
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-12 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50"
                >
                  Descargar QR
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Confirmar reserva</h1>
              <p className="text-sm text-gray-600">Revisa los detalles</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-md mx-auto px-4 py-6 pb-32">
        {/* Resumen de reserva */}
        <Card className="mb-6 p-5 rounded-2xl border-0 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-4">Resumen de reserva</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Espacio</p>
                <p className="font-medium text-gray-900">{space.name}</p>
                <p className="text-sm text-gray-600">Sede Medellín - Centro Innovation</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Fecha</p>
                <p className="font-medium text-gray-900">Martes, 7 de Abril 2026</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Horario</p>
                <p className="font-medium text-gray-900">9:00 AM - 6:00 PM</p>
                <p className="text-sm text-gray-600">9 horas</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Servicios adicionales */}
        <Card className="mb-6 p-5 rounded-2xl border-0 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-4">Servicios adicionales</h2>
          
          <div className="space-y-3">
            {services.map((service) => (
              <div
                key={service.id}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => toggleService(service.id)}
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={selectedServices.includes(service.id)}
                    onCheckedChange={() => toggleService(service.id)}
                  />
                  <span className="font-medium text-gray-900">{service.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-600">
                  +${service.price.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Método de pago */}
        <Card className="mb-6 p-5 rounded-2xl border-0 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-4">Método de pago</h2>
          
          <div className="space-y-3">
            <div
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedPayment === "card"
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setSelectedPayment("card")}
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-gray-600" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Tarjeta de crédito/débito</p>
                  <p className="text-sm text-gray-600">Visa, Mastercard</p>
                </div>
                {selectedPayment === "card" && (
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </div>

            <div
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedPayment === "paypal"
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setSelectedPayment("paypal")}
            >
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5">
                    <path
                      fill="#003087"
                      d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.06a.77.77 0 0 1 .76-.643h8.14c2.67 0 4.567.553 5.642 1.644 1.035 1.048 1.383 2.59 1.065 4.71-.368 2.455-1.273 4.15-2.768 5.183-1.423 1.004-3.536 1.514-6.29 1.514H9.605a.77.77 0 0 0-.76.643l-.824 5.226z"
                    />
                    <path
                      fill="#009cde"
                      d="M19.277 6.422c-.183 1.211-.768 2.066-1.753 2.565-.91.46-2.19.69-3.815.69h-2.326a.51.51 0 0 0-.505.426l-.687 4.35a.378.378 0 0 0 .373.438h2.616a.673.673 0 0 0 .665-.563l.028-.144.54-3.425.035-.19a.673.673 0 0 1 .665-.563h.42c2.153 0 3.838-.873 4.33-3.397.206-1.057.1-1.94-.407-2.563-.184-.226-.417-.413-.695-.563.215 1.178.23 2.495-.084 3.96z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">PayPal</p>
                  <p className="text-sm text-gray-600">Pago seguro</p>
                </div>
                {selectedPayment === "paypal" && (
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Desglose de precio */}
        <Card className="p-5 rounded-2xl border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Tarifa base (9 horas)</span>
              <span className="font-medium text-gray-900">$35,000 COP</span>
            </div>
            {selectedServices.map((serviceId) => {
              const service = services.find((s) => s.id === serviceId);
              return (
                <div key={serviceId} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{service?.name}</span>
                  <span className="font-medium text-gray-900">
                    ${service?.price.toLocaleString()} COP
                  </span>
                </div>
              );
            })}
            <div className="pt-3 border-t-2 border-blue-200 flex items-center justify-between">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="text-xl font-semibold text-blue-600">
                ${calculateTotal().toLocaleString()} COP
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Footer fijo con botón */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-md mx-auto">
          <Button
            onClick={handleConfirm}
            className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-base shadow-md"
          >
            Confirmar reserva
          </Button>
          <p className="text-center text-xs text-gray-500 mt-2">
            Al confirmar aceptas los términos y condiciones
          </p>
        </div>
      </div>
    </div>
  );
}
