import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { Mail, Phone, Instagram, ArrowUpRight } from "lucide-react";

/**
 * Props for `Footer`.
 */
export type FooterProps = SliceComponentProps<Content.FooterSlice>;

/**
 * Component for "Footer" Slices.
 */
const Footer: FC<FooterProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-[#F9F4F0] pt-24 pb-12 px-6 font-unbounded border-t border-[#EAA79C]/20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Parte Superiore: Contact & Logo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          
          {/* Sezione Contact */}
          <div className="flex flex-col space-y-8">
            <div className="text-[#EAA79C] text-3xl md:text-5xl font-black italic uppercase">
              <PrismicRichText field={slice.primary.title} />
            </div>
            
            <div className="flex flex-col space-y-6">
              {/* Email */}
              <a 
                href={`mailto:${slice.primary.email}`} 
                className="group flex items-center gap-4 text-[#333] hover:text-[#EAA79C] transition-colors duration-300"
              >
                <div className="p-3 bg-white rounded-full shadow-sm group-hover:shadow-md transition-all">
                  <Mail size={20} />
                </div>
                <span className="text-lg md:text-xl font-medium">{slice.primary.email}</span>
                <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              {/* Phone */}
              <a 
                href={`tel:${slice.primary.phone}`}
                className="group flex items-center gap-4 text-[#333] hover:text-[#EAA79C] transition-colors duration-300"
              >
                <div className="p-3 bg-white rounded-full shadow-sm group-hover:shadow-md transition-all">
                  <Phone size={20} />
                </div>
                <span className="text-lg md:text-xl font-medium">{slice.primary.phone}</span>
              </a>

              {/* Instagram */}
              <PrismicNextLink 
                field={slice.primary.instagram_link}
                className="group flex items-center gap-4 text-[#333] hover:text-[#EAA79C] transition-colors duration-300"
              >
                <div className="p-3 bg-white rounded-full shadow-sm group-hover:shadow-md transition-all">
                  <Instagram size={20} />
                </div>
                <span className="text-lg md:text-xl font-medium">Instagram</span>
                <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </PrismicNextLink>
            </div>
          </div>

          {/* Sezione Logo / Newsletter o Info Extra */}
          <div className="flex flex-col items-center md:items-end justify-center">
            <div className="w-48 md:w-64 transition-all duration-700">
               <PrismicNextImage field={slice.primary.logo} className="w-full h-auto object-contain" />
            </div>
          </div>
        </div>

        {/* Parte Inferiore: Copyright */}
        <div className="pt-12 border-t border-[#EAA79C]/10 flex flex-col md:row items-center justify-between gap-6">
          <p className="text-[#333]/50 text-xs tracking-widest uppercase">
            {slice.primary.copyright_text}
          </p>
          
          <div className="flex gap-8 text-[10px] font-bold text-[#EAA79C] uppercase tracking-tighter">
            <span className="cursor-pointer hover:underline">Privacy Policy</span>
            <span className="cursor-pointer hover:underline">Cookies</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;