import { Mail, Phone, MapPin, Clock, ArrowLeft, Dam } from "lucide-react";
import { useNavigate } from "react-router";

export default function Contact() {
  const navigate = useNavigate();

  const contactDetails = [
    {
      title: "Email Us",
      value: "megas.marwanos@gmail.com",
      description: "Click to send us a direct message.",
      icon: <Mail className="text-orange-500" size={28} />,
      link: "mailto:megas.marwanos@gmail.com",
      color: "border-orange-500/20",
    },
    {
      title: "Call Us",
      value: "+218 922864767",
      description: "Available Sun-Thu, 9am - 5pm.",
      icon: <Phone className="text-orange-500" size={28} />,
      link: "tel:+218922864767",
      color: "border-orange-500/20",
    },
    {
      title: "Visit Our Office",
      value: "Bin Ashour, Tripoli",
      description: "Main Business District, Libya.",
      icon: <MapPin className="text-orange-500" size={28} />,
      link: "https://maps.google.com",
      color: "border-orange-500/20",
    },
  ];

  return (
    <div className="min-h-screen bg-[#04071d] text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>
        <button
          onClick={() => navigate('/doodling')}
          className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors mb-8 group"
        >
          <Dam size={20} className="group-hover:-translate-x-1 transition-transform" />
          doodling around
        </button>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get in <span className="text-orange-500">Touch</span>
          </h1>
          <p className="text-gray-400 max-w-lg">
            Have questions about merchandise or logistics in Tripoli? Our team is here to help.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactDetails.map((item) => (
            <a
              key={item.title}
              href={item.link}
              className={`group relative p-8 rounded-3xl border ${item.color} bg-[#0c0e23] hover:bg-[#161a31] transition-all duration-300 flex flex-col justify-between min-h-[250px] overflow-hidden`}
            >
              {/* Decorative background glow */}
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-all"></div>

              <div>
                <div className="mb-4 p-3 bg-orange-500/10 w-fit rounded-2xl">
                  {item.icon}
                </div>
                <h2 className="text-xl font-bold mb-1">{item.title}</h2>
                <p className="text-orange-500 font-medium text-sm mb-3">{item.value}</p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">
                Contact Now
              </div>
            </a>
          ))}
        </div>

        {/* Support Hours Card */}
        <div className="mt-10 p-6 bg-[#0c0e23] border border-white/5 rounded-3xl flex items-center gap-4 text-gray-400">
          <Clock className="text-orange-500" size={24} />
          <p className="text-sm">
            Our local Tripoli support is active Sunday through Thursday.
          </p>
        </div>
      </div>
    </div>
  );
}