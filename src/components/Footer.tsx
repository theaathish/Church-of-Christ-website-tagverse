import { Heart, Church } from "lucide-react";
import logo from "../assets/church-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo and tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
              <img 
                src={logo}
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Proclaiming the truth of the New Testament and the love found in the Blood of the New Covenant.
            </p>
          </div>

          {/* Scripture */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-accent">Our Foundation</h3>
            <blockquote className="text-sm text-primary-foreground/80 italic border-l-2 border-accent pl-4">
              "For this is My blood of the new covenant, which is shed for many for the remission of sins."
              <footer className="text-accent font-medium mt-2 not-italic text-xs">— Matthew 26:28</footer>
            </blockquote>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-accent">Connect With Us</h3>
            <div className="space-y-2 text-sm text-primary-foreground/80">
              <p>Email: pcs.chinna@gmail.com</p>
              <p>Phone: +91 9052402299</p>
              <p>Address: No.2, Thanigai St, Venkateshwara Nagar, Shastri Nagar, Villivakkam, Chennai, Tamil Nadu 600049</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center">
          <p className="text-sm text-primary-foreground/80 flex items-center justify-center gap-2">
            Made with <Heart className="h-4 w-4 text-accent fill-accent" /> for the glory of God
          </p>
          <p className="text-xs text-primary-foreground/60 mt-2">
            © {currentYear} The Church of Christ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
