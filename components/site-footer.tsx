import Link from "next/link"
import { Phone, Mail, MapPin, MessageCircle, Twitter } from "lucide-react"

// Component for social media links for cleaner code
const SocialLink = ({ href, icon: Icon, 'aria-label': ariaLabel }: { href: string, icon: React.ElementType, 'aria-label': string }) => (
  <a href={href} aria-label={ariaLabel} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
    <Icon className="h-5 w-5" />
  </a>
);

export function Footer() {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/products", label: "Products" },
    { href: "/contact", label: "Contact" },
  ];
  
  const productLinks = [
    { href: "/products/hdpe", label: "HDPE Granules" },
    { href: "/products/pp", label: "PP Granules" },
    { href: "/products/custom-colors", label: "Custom Colors" },
  ];
  
  const socialLinks = [
    { href: "https://wa.me/91YOURPHONENUMBER", icon: MessageCircle, label: "Chat on WhatsApp" },
    { href: "https://twitter.com/yourprofile", icon: Twitter, label: "Follow us on Twitter" },
  ];

  return (
    // A dark background provides a modern, premium feel and clearly separates the footer
    <footer className="bg-slate-800 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Responsive multi-column layout */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          
          {/* Column 1: Brand & Socials */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-lg font-semibold">Dharamraj Polymer</h3>
            <p className="mt-4 text-sm text-slate-300">
              Leading manufacturer of high-quality HDPE & PP granules in Gandhinagar, Gujarat.
            </p>
            {/* <div className="mt-6 flex items-center space-x-4">
              {socialLinks.map((link) => (
                <SocialLink key={link.label} href={link.href} icon={link.icon} aria-label={link.label} />
              ))}
            </div> */}
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-semibold tracking-wider text-slate-200">Quick Links</h4>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-300 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Products */}
          {/* <div>
            <h4 className="font-semibold tracking-wider text-slate-200">Our Products</h4>
            <ul className="mt-4 space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-300 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}
          
          {/* Column 4: Contact Info */}
          <div>
            <h4 className="font-semibold tracking-wider text-slate-200">Contact Us</h4>
            <div className="mt-4 space-y-4 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 flex-shrink-0 text-slate-400 mt-0.5" />
                <address className="not-italic">
                 {` Mota Chiloda, Himatnagar Hwy,
                  Gandhinagar, Gujarat 382355`}
                </address>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-slate-400" />
                <a href="tel:+919316445402" className="hover:text-white transition-colors">
                 {` +91 9316445402`}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-slate-400" />
                <a href="mailto:dharamrajpolymer@gmail.com" className="hover:text-white transition-colors">
                  dharamrajpolymer@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-footer for copyright */}
      <div className="bg-slate-900 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Dharamraj Polymer. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}