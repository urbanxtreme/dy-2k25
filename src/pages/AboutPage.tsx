import { useEffect, useRef ,  useState } from 'react';
import { Instagram, Mail, Phone, Users, Calendar, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import  VideoComponent  from '../components/VideoComponent';
import AnimatedContent from '../components/animation'
import ScrollReveal from '../components/scrollreveal';

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [bgOpacity, setBgOpacity] = useState(0);
  const headingRef = useRef<HTMLHeadingElement >(null);
  const mainContentRef = useRef<HTMLDivElement >(null);

  useEffect(() => {
    // Animate sections on scroll
    sectionRefs.current.forEach((section) => {
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
      gsap.fromTo(
        headingRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'elastic.out(1, 0.5)',
          delay: 0.5,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    ScrollTrigger.create({
      start: 'top top',
      end: 'top -100',
      onUpdate: (self) => {

        setBgOpacity(self.progress*1.1);
        const videoContainer:any = document.querySelector('.video-container');
        if (videoContainer) {
          videoContainer.style.transform = `perspective(200px) translateZ(${self.progress * 180}px)`;
        }
        
      },
    });
  
  }, []);

  const addToSectionRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <div className="relative">
      {/* Scroll-based Background Overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
          opacity: bgOpacity,
          zIndex: -1,
          transition: 'opacity 2s ease-in-out',
        }}
      />
      <div
        
        style={{
          position: 'fixed',
          top: -80,
          left: 170,
          width: '80%',
          height: '80%',
          zIndex: -2,
        }}
      >
        <VideoComponent/>
      </div>
      {/* Static Background */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: "url('./images/About page - BG-DY 2 1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: -3,
        }}
      />
      
      {/* Interactive Content */}
      <div ref={mainContentRef} className="relative z-10">
        {/* Centered Heading Container */}
        <div style={{height: "100vh",
          width: "100vw",
        }}></div>
        {/* About Section */}
        
        <div ref={addToSectionRefs} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <ScrollReveal
                scrollContainerRef={sectionRefs}
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
              >
                <div className="bg-white/90 border-4 border-minecraft-stone p-6">
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
            </ScrollReveal>
          
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
                <div className="flex items-center">
                  
                  <div>
                    <span className='font-bold block'>Instagram</span>  
                      <a href="https://www.instagram.com/dakshayanthra?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="hover:text-minecraft-grass transition-colors duration-200">  
                      <Instagram size={20} className="mr-3 text-minecraft-grass" />
                      </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
      </div>
        
    </div>
  </div>
   
  
  );
};

export default AboutPage;
