import { useEffect, useRef } from 'react';
import ContactForm from '@/components/ContactForm';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, Users, Calendar, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Animate sections on scroll
    sectionRefs.current.forEach((section, index) => {
      if (!section) return;

      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, []);

  const addToSectionRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <div 
      style={{
        minHeight: "100vh",
        padding: "7rem 1rem",
        backgroundImage: "url('/images/minecraft-bg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-minecraft text-4xl mb-4">Daksha Yanthra</h1>
          <p className="max-w-2xl mx-auto">
            Learn more about Daksha Yanthra and get in touch with our team!
          </p>
        </div>

        {/* About Section */}
        <div ref={addToSectionRefs} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/90 border-4 border-minecraft-stone p-6">
            <h2 className="font-minecraft text-2xl mb-4">About Daksha Yanthra</h2>
            <p className="mb-4">
              Daksha Yanthra is the annual college festival organized by the students of
              Pixel University. Started in 2018, the fest has grown to become one
              of the most anticipated collegiate events in the region.
            </p>
            <p className="mb-4">
              Each year, we adopt a unique theme to make the experience fresh and
              exciting. For 2024, we've chosen Minecraft as our theme, transforming
              our campus into an interactive blocky world filled with creativity,
              technology, and fun!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="bg-minecraft-dirt/20 p-4 text-center">
                <Users size={24} className="mx-auto mb-2 text-minecraft-grass" />
                <span className="font-bold block">50000+</span>
                <span className="text-sm">Attendees</span>
              </div>
              <div className="bg-minecraft-dirt/20 p-4 text-center">
                <Calendar size={24} className="mx-auto mb-2 text-minecraft-grass" />
                <span className="font-bold block">33+</span>
                <span className="text-sm">Events</span>
              </div>
              <div className="bg-minecraft-dirt/20 p-4 text-center">
                <Award size={24} className="mx-auto mb-2 text-minecraft-gold" />
                <span className="font-bold block">$10,000+</span>
                <span className="text-sm">In Prizes</span>
              </div>
            </div>
          </div>

          <div className="bg-minecraft-stone">
            <img
              src="/images/about-team.jpg"
              alt="Daksha Yanthra Organizers"
              className="w-full h-full object-cover border-4 border-minecraft-stone"
            />
          </div>
        </div>

        {/* Contact Section */}
        <div ref={addToSectionRefs} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className="font-minecraft text-2xl mb-6">Get In Touch</h2>
            <p className="mb-6">
              Have questions about Daksha Yanthra? Want to sponsor the event or get involved?
              Feel free to reach out to us using the contact form or through our social media channels.
            </p>

            <div className="bg-white/90 border-4 border-minecraft-stone p-6 mb-6">
              <h3 className="font-minecraft text-xl mb-4">Contact Info</h3>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail size={20} className="mr-3 text-minecraft-grass" />
                  <div>
                    <span className="font-bold block">Email</span>
                    <a
                      href="mailto:info@dakshayathra.edu"
                      className="hover:text-minecraft-grass transition-colors duration-200"
                    >
                      info@dakshayathra.edu
                    </a>
                  </div>
                </div>

                <div className="flex items-center">
                  <Phone size={20} className="mr-3 text-minecraft-grass" />
                  <div>
                    <span className="font-bold block">Phone</span>
                    <a
                      href="tel:+123456789"
                      className="hover:text-minecraft-grass transition-colors duration-200"
                    >
                      +1 (234) 567-8900
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/90 border-4 border-minecraft-stone p-6">
              <h3 className="font-minecraft text-xl mb-4">Follow Us</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <a href="https://facebook.com" className="flex flex-col items-center p-3 bg-minecraft-dirt/20 hover:bg-minecraft-dirt/40">
                  <Facebook size={24} className="mb-2 text-minecraft-grass" />
                  <span className="text-sm">Facebook</span>
                </a>
                <a href="https://twitter.com" className="flex flex-col items-center p-3 bg-minecraft-dirt/20 hover:bg-minecraft-dirt/40">
                  <Twitter size={24} className="mb-2 text-minecraft-grass" />
                  <span className="text-sm">Twitter</span>
                </a>
                <a href="https://instagram.com" className="flex flex-col items-center p-3 bg-minecraft-dirt/20 hover:bg-minecraft-dirt/40">
                  <Instagram size={24} className="mb-2 text-minecraft-grass" />
                  <span className="text-sm">Instagram</span>
                </a>
                <a href="https://youtube.com" className="flex flex-col items-center p-3 bg-minecraft-dirt/20 hover:bg-minecraft-dirt/40">
                  <Youtube size={24} className="mb-2 text-minecraft-grass" />
                  <span className="text-sm">YouTube</span>
                </a>
              </div>
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
