import { useEffect, useRef } from 'react';
import ContactForm from '@/components/ContactForm';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, Users, Calendar, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; 

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headingRef = useRef<HTMLHeadingElement | null>(null); // Ref for the heading
  const smokeContainerRef = useRef<HTMLDivElement | null>(null); // Ref for the smoke effect container

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

    // Stamping animation for the heading with smoke effect
    if (headingRef.current) {

      // Stamping animation with delay
      gsap.fromTo(
        headingRef.current,
        { scale: 0, opacity: 0 }, // Start with scale 0 and invisible
        {
          scale: 1, // Scale up to normal size
          opacity: 1, // Fade in
          duration: 0.8, // Animation duration
          ease: 'elastic.out(1, 0.5)', // Elastic easing for a stamping effect
          delay: 0.5, // 3-second delay
          scrollTrigger: {
            trigger: headingRef.current, // Trigger on the heading itself
            start: 'top 80%', // Start animation when the top of the heading is 80% in view
            end: 'bottom 20%', // End animation when the bottom of the heading is 20% in view
            toggleActions: 'play none none reverse', // Play animation on enter, reverse on leave
          },
          
        }
      );
    }
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
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-minecraft font-bold text-[#F7DC6F] text-4xl mb-4" style={{ textShadow: "0 0 5px #FFA500, 0 0 10px #FFC107, 0 0 15px #FFA500", display: "inline" }}>
            Daksha&nbsp;
          </h1>
          <h1 className="font-minecraft font-bold text-[#33CC33] text-4xl mb-4" style={{ textShadow: "0 0 10px #000000aa", display: "inline" }}>
            Yanthra
          </h1>
          <p
            className="max-w-2xl mx-auto"
            style={{ transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out' }}
            ref={(el) => {
              if (!el) return;
              const text = el.textContent as string;
              const characters = text.split('');
              const spans = characters.map((character) => `<span>${character}</span>`);
              el.innerHTML = spans.join('');
              const charactersElements = el.children;
              gsap.set(charactersElements, { opacity: 0, x: -50 });
              gsap.fromTo(
                charactersElements,
                { opacity: 0, x: -50 },
                {
                  opacity: 1,
                  x: 0,
                  duration: 0.6,
                  ease: 'power1.inOut',
                  stagger: 0.02,
                  scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse',
                  },
                }
              );
            }}
          >
            Learn more about Daksha Yanthra and get in touch with our team!
          </p>
        </div>

        {/* About Section */}
        <div ref={addToSectionRefs} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/90 border-4 border-minecraft-stone p-6 relative">
            

            {/* Heading with Stamping Animation */}
            <h2 ref={headingRef} className="font-minecraft text-2xl mb-4 relative z-10">
              About Daksha Yanthra
            </h2>
            <div>
              {/* First Paragraph */}
              <p ref={(el) => {
                if (!el) return;
                const text = "\u00A0\u00A0\u00A0\u00A0Experience the fusion of creativity, technology, and limitless possibilities as the College of Engineering Attingal presents the most awaited Techno-Cultural Fest: Daksha Yanthra 2025!";
                const characters = text.split('');
                const spans = characters.map((character) => `<span>${character}</span>`);
                el.innerHTML = spans.join('');
                const charactersElements = el.children;
                gsap.set(charactersElements, { opacity: 0, x: -50 });
                gsap.fromTo(
                  charactersElements,
                  { opacity: 0, x: -50 },
                  {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    ease: 'power1.inOut',
                    stagger: 0.02,
                  }
                );
              }} />

              {/* Second Paragraph */}
              <p ref={(el) => {
                if (!el) return;
                const text = `\u00A0\u00A0\u00A0\u00A0Step into a world where pixels become masterpieces, redstone powers innovation, and every block holds the potential for greatness. From mind-blowing tech challenges to intense hackathons, each event is designed to push the boundaries of what can be built, coded, and imagined.`;
                const characters = text.split('');
                const spans = characters.map((character) => `<span>${character}</span>`);
                el.innerHTML = spans.join('');
                const charactersElements = el.children;
                gsap.set(charactersElements, { opacity: 0, x: -50 });
                gsap.fromTo(
                  charactersElements,
                  { opacity: 0, x: -50 },
                  {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    ease: 'power1.inOut',
                    stagger: 0.02,
                    delay: 3.5, // Delay to start after the first paragraph
                  }
                );
              }} />

              {/* Third Paragraph */}
              <p ref={(el) => {
                if (!el) return;
                const text = "\u00A0\u00A0\u00A0\u00A0As you explore this vibrant landscape, you’ll witness a seamless fusion of skill and strategy, where visionaries craft the future—one block at a time. Whether you're competing, collaborating, or just placing your first block, this is your chance to mine ideas, craft solutions, and engineer a world of infinite possibilities.";
                const characters = text.split('');
                const spans = characters.map((character) => `<span>${character}</span>`);
                el.innerHTML = spans.join('');
                const charactersElements = el.children;
                gsap.set(charactersElements, { opacity: 0, x: -50 });
                gsap.fromTo(
                  charactersElements,
                  { opacity: 0, x: -50 },
                  {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    ease: 'power1.inOut',
                    stagger: 0.02,
                    delay: 9.0, // Delay to start after the second paragraph
                  }
                );
              }} />

              {/* Fourth Paragraph */}
              <p ref={(el) => {
                if (!el) return;
                const text = "\u00A0\u00A0\u00A0\u00A0Join us as we embark on an unforgettable journey through creativity, engineering, and the spirit of innovation.";
                const characters = text.split('');
                const spans = characters.map((character) => `<span>${character}</span>`);
                el.innerHTML = spans.join('');
                const charactersElements = el.children;
                gsap.set(charactersElements, { opacity: 0, x: -50 });
                gsap.fromTo(
                  charactersElements,
                  { opacity: 0, x: -50 },
                  {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    ease: 'power1.inOut',
                    stagger: 0.02,
                    delay: 15.5, // Delay to start after the third paragraph
                  }
                );
              }} />

            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="bg-minecraft-dirt/20 p-4 text-center">
                <Users size={24} className="mx-auto mb-2 text-minecraft-grass" />
                <span className="font-bold block">50+</span>
                <span className="text-sm">Attendees</span>
              </div>
              <div className="bg-minecraft-dirt/20 p-4 text-center">
                <Calendar size={24} className="mx-auto mb-2 text-minecraft-grass" />
                <span className="font-bold block">33+</span>
                <span className="text-sm">Events</span>
              </div>
              <div className="bg-minecraft-dirt/20 p-4 text-center">
                <Award size={24} className="mx-auto mb-2 text-minecraft-gold" />
                <span className="font-bold block">₹10,000+</span>
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