import { Facebook, Instagram, MapPin, Phone, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Contact Information */}
          <div className="mx-auto">
            <h3 className="font-bold text-foreground text-lg mb-4">
              Contact Us
            </h3>
            <div className="space-y-3">
              <a
                href="tel:9220774381"
                className="flex items-start gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="h-5 w-5 mt-0.5 shrink-0" />
                <span>9220774381</span>
              </a>
              <a
                href="tel:+917982230815"
                className="flex items-start gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="h-5 w-5 mt-0.5 shrink-0" />
                <span>+91 79822 30815</span>
              </a>
            </div>
          </div>

          {/* Office Address */}
          <div className="mx-auto">
            <h3 className="font-bold text-foreground text-lg mb-4">
              Office Address
            </h3>
            <div className="flex items-start gap-3 text-muted-foreground mb-4">
              <MapPin className="h-5 w-5 mt-0.5 shrink-0" />
              <address className="not-italic leading-relaxed">
                Shop No. 2, 8771/14-B
                <br />
                Ground Floor, New Rohtak Road
                <br />
                Near Indian Gas, Sidipura
                <br />
                New Delhi, Central Delhi
                <br />
                Delhi - 110005
              </address>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=New+Generations+Bag+8771%2F14-B+New+Rohtak+Road+Sidipura+New+Delhi+110005"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <MapPin className="h-4 w-4" />
              Get Directions
            </a>
          </div>

          {/* Social Media */}
          <div className="mx-auto">
            <h3 className="font-bold text-foreground text-lg mb-4">
              Follow Us
            </h3>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border text-center">
          <p className="text-muted-foreground">
            © 2025 <span className="text-black">NG</span>
            <span className="text-primary">BAG</span>. Quality bags for every
            journey.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// --------------------------------------------------------------------------------------------------------------
// export default function Footer() {
//   return (
//     <footer className="bg-secondary border-t border-border mt-20">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           <div>
//             <h3 className="font-bold text-xl mb-4">BAGSMITH</h3>
//             <p className="text-sm text-muted-foreground leading-relaxed">
//               Premium bags crafted for the modern lifestyle. Quality materials,
//               timeless design.
//             </p>
//           </div>
//           <div>
//             <h4 className="font-semibold mb-4">Shop</h4>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <a
//                   href="#"
//                   className="text-muted-foreground hover:text-foreground transition-colors"
//                 >
//                   All Products
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="text-muted-foreground hover:text-foreground transition-colors"
//                 >
//                   New Arrivals
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="text-muted-foreground hover:text-foreground transition-colors"
//                 >
//                   Best Sellers
//                 </a>
//               </li>
//             </ul>
//           </div>

//           <div>
//             <h4 className="font-semibold mb-4">Support</h4>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <a
//                   href="#"
//                   className="text-muted-foreground hover:text-foreground transition-colors"
//                 >
//                   Contact Us
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="text-muted-foreground hover:text-foreground transition-colors"
//                 >
//                   Shipping Info
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="text-muted-foreground hover:text-foreground transition-colors"
//                 >
//                   Returns
//                 </a>
//               </li>
//             </ul>
//           </div>

//           <div>
//             <h4 className="font-semibold mb-4">Connect</h4>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <a
//                   href="#"
//                   className="text-muted-foreground hover:text-foreground transition-colors"
//                 >
//                   Instagram
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="text-muted-foreground hover:text-foreground transition-colors"
//                 >
//                   Twitter
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="text-muted-foreground hover:text-foreground transition-colors"
//                 >
//                   Facebook
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
//           <p>&copy; 2025 BAGSMITH. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// }
