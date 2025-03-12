import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PixelButton from "@/components/PixelButton";
import {
  User,
  Mail,
  Phone,
  School,
  Calendar,
  UserPlus,
  Users,
  Award,
  BookOpen,
  Check,
  AlertCircle,
  ArrowRight,
  ChevronDown,
  ArrowLeft,
  CreditCard,
  Image as ImageIcon,
  Plus,
  Receipt,
} from "lucide-react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const EventRegistration = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [formStep, setFormStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState(false);
  const [paymentPreview, setPaymentPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    year: "",
    department: "",
    events: [],
    teamMembers: [],
    teamName: "",
    hasTeam: false,
    paymentTransactionId: "",
    paymentScreenshot: "",
    useSameTeam: false,
    teams: {},
  });

  const [availableEvents] = useState([
    {
      id: 1,
      name: "MX. DY",
      category: "Cultural",
      teamEvent: false,
      registrationFee: 150,
    },
    {
      id: 2,
      name: "LA COUTURE",
      category: "Cultural",
      teamEvent: true,
      minTeamSize: 8,
      registrationFee: 150,
    },
    {
      id: 3,
      name: "BAILAMO",
      category: "Cultural",
      teamEvent: true,
      minTeamSize: 7,
      registrationFee: 150,
    },
    {
      id: 4,
      name: "EUPHONY",
      category: "Cultural",
      teamEvent: true,
      minTeamSize: 4,
      registrationFee: 150,
    },
    {
      id: 5,
      name: "BLOOMER",
      category: "Cultural",
      teamEvent: false,
      registrationFee: 150,
    },
    {
      id: 6,
      name: "BEAT THE SPOT",
      category: "Cultural",
      teamEvent: false,
      registrationFee: 150,
    },
    {
      id: 7,
      name: "GROOVE",
      category: "Cultural",
      teamEvent: false,
      registrationFee: 100,
    },
    {
      id: 8,
      name: "EL DUETO",
      category: "Cultural",
      teamEvent: true,
      maxTeamSize: 2,
      registrationFee: 200,
    },
    {
      id: 9,
      name: "ONE MIC STAND",
      category: "Cultural",
      teamEvent: false,
      registrationFee: 150,
    },
    {
      id: 10,
      name: "JAM",
      category: "Cultural",
      teamEvent: false,
      registrationFee: 100,
    },
    {
      id: 11,
      name: "CAMPUS AMBASSADOR",
      category: "Cultural",
      teamEvent: false,
    },
    {
      id: 12,
      name: "BGMI",
      category: "E SPORTS",
      teamEvent: true,
      maxTeamSize: 4,
      registrationFee: 100,
    },
    {
      id: 13,
      name: "VALORANT",
      category: "E SPORTS",
      teamEvent: true,
      maxTeamSize: 6,
      registrationFee: `${300}(per team)`,
    },
    {
      id: 14,
      name: "CODM",
      category: "E SPORTS",
      teamEvent: true,
      maxTeamSize: 5,
      registrationFee: `${300}(per team)`,
    },
    {
      id: 15,
      name: "E-FOOTBALL",
      category: "E SPORTS",
      teamEvent: false,
      registrationFee: 50,
    },
  ]);

  // Error states
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const isStepValid = () => {
    const newErrors: { [key: string]: string } = {};

    if (formStep === 0) {
      if (!formData.fullName) newErrors.fullName = "Name is required";
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid";
      }
      if (!formData.phone) {
        newErrors.phone = "Phone number is required";
      } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = "Phone number should be 10 digits";
      }
    } else if (formStep === 1) {
      if (!formData.college) newErrors.college = "College name is required";
      if (!formData.year) newErrors.year = "Year of study is required";
      if (!formData.department) newErrors.department = "Department is required";
    } else if (formStep === 2) {
      if (formData.events.length === 0)
        newErrors.events = "Select at least one event";
    } else if (formStep === 3 && formData.hasTeam) {
      if (!formData.teamName) newErrors.teamName = "Team name is required";
      if (formData.teamMembers.length === 0)
        newErrors.teamMembers = "Add at least one team member";

      formData.teamMembers.forEach((member, index) => {
        if (!member.name || !member.email) {
          newErrors[`teamMember${index}`] =
            "Name and email required for all team members";
        }
      });
    } else if (formStep === 4) {
      if (!formData.paymentTransactionId) {
        newErrors.paymentTransactionId = "Transaction ID is required";
      }
      if (!formData.paymentScreenshot) {
        newErrors.paymentScreenshot = "Payment screenshot is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTeamChange = (eventId, field, value) => {
    setFormData((prev) => ({
      ...prev,
      teams: {
        ...prev.teams,
        [eventId]: {
          ...prev.teams[eventId],
          [field]: value,
        },
      },
    }));
  };

  // const handleTeamMemberChange = (eventId, memberIndex, field, value) => {
  //   setFormData(prev => {
  //     const updatedMembers = [...prev.teams[eventId].members];
  //     updatedMembers[memberIndex] = {
  //       ...updatedMembers[memberIndex],
  //       [field]: value
  //     };

  //     return {
  //       ...prev,
  //       teams: {
  //         ...prev.teams,
  //         [eventId]: {
  //           ...prev.teams[eventId],
  //           members: updatedMembers
  //         }
  //       }
  //     };
  //   });
  // };
  const handleNextStep = () => {
    if (isStepValid()) {
      if (formStep === 4) {
        handleSubmit();
      } else {
        setFormStep((prev) => prev + 1);
        gsap.fromTo(
          ".form-step",
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5 }
        );
      }
    }
  };

  const handlePrevStep = () => {
    if (formStep > 0) {
      setFormStep((prev) => prev - 1);
      gsap.fromTo(
        ".form-step",
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }
      );
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData((prev) => ({ ...prev, paymentScreenshot: base64String }));
        setPaymentPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!isStepValid()) return;
    setIsSubmitting(true);

    try {
      const scriptUrl =
        "https://script.google.com/macros/s/YOUR_GOOGLE_SCRIPT_ID/exec";

      const response = await fetch(scriptUrl, {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          events: formData.events.join(", "),
          teamMembers: formData.teamMembers
            .map((m) => `${m.name} (${m.email})`)
            .join(", "),
        }),
      });

      if (!response.ok) throw new Error("Submission failed");

      setFormSuccess(true);
      createMinecraftParticles();
    } catch (error) {
      console.error("Registration failed:", error);
      setFormError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Handle checkbox changes for events
  const handleEventSelect = (eventId) => {
    setFormData((prev) => {
      const eventExists = prev.events.includes(eventId);
      let events;

      if (eventExists) {
        events = prev.events.filter((id) => id !== eventId);
      } else {
        events = [...prev.events, eventId];
      }

      // Clear events error if any
      if (errors.events && events.length > 0) {
        setErrors((prev) => ({ ...prev, events: undefined }));
      }

      return { ...prev, events };
    });
  };

  // Toggle team participation
  const handleTeamToggle = () => {
    setFormData((prev) => ({
      ...prev,
      hasTeam: !prev.hasTeam,
      // Reset team data when toggling off
      teamName: !prev.hasTeam ? prev.teamName : "",
      teamMembers: !prev.hasTeam ? prev.teamMembers : [],
    }));
  };

  // Add team member
  const addTeamMember = (eventId) => {
    setFormData((prev) => {
      const newMember = { name: "", email: "", phone: "" };
      const newTeams = { ...prev.teams };

      if (prev.useSameTeam) {
        // Add to all teams
        Object.keys(newTeams).forEach((teamId) => {
          newTeams[teamId].members = [...newTeams[teamId].members, newMember];
        });
      } else {
        // Add to single team
        newTeams[eventId].members = [...newTeams[eventId].members, newMember];
      }

      return { ...prev, teams: newTeams };
    });
  };

  // Remove team member
  const removeTeamMember = (eventId, index) => {
    setFormData((prev) => ({
      ...prev,
      teams: {
        ...prev.teams,
        [eventId]: {
          ...prev.teams[eventId],
          members: prev.teams[eventId].members.filter((_, i) => i !== index),
        },
      },
    }));
  };

  // Update team member info
  const updateTeamMember = (index, field, value) => {
    setFormData((prev) => {
      const updatedMembers = [...prev.teamMembers];
      updatedMembers[index] = { ...updatedMembers[index], [field]: value };
      return { ...prev, teamMembers: updatedMembers };
    });

    // Clear team member error if any
    if (errors[`teamMember${index}`]) {
      setErrors((prev) => ({ ...prev, [`teamMember${index}`]: undefined }));
    }
  };

  // Add these state handlers in your component
  // Add these state handlers in your component
  const handleTeamMemberChange = (eventId, memberIndex, field, value) => {
    setFormData((prev) => {
      const newTeams = { ...prev.teams };

      // If using same team, update all teams
      if (prev.useSameTeam) {
        Object.keys(newTeams).forEach((teamId) => {
          newTeams[teamId] = {
            ...newTeams[teamId],
            members: newTeams[teamId].members.map((member, idx) =>
              idx === memberIndex ? { ...member, [field]: value } : member
            ),
          };
        });
      }
      // Otherwise update only the current team
      else {
        newTeams[eventId] = {
          ...newTeams[eventId],
          members: newTeams[eventId].members.map((member, idx) =>
            idx === memberIndex ? { ...member, [field]: value } : member
          ),
        };
      }

      return { ...prev, teams: newTeams };
    });
  };

  // Handle form submission
  //   const handleSubmit = async () => {
  //     if (!isStepValid()) return;

  //     setIsSubmitting(true);

  //     try {
  //       // Simulate API call with timeout
  //       await new Promise((resolve) => setTimeout(resolve, 2000));

  //       // Successful submission
  //       setFormSuccess(true);

  //       // Animate success message
  //       gsap.fromTo(
  //         ".success-message",
  //         { scale: 0.8, opacity: 0 },
  //         { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
  //       );

  //       // Create floating celebration particles
  //       createMinecraftParticles();
  //     } catch (error) {
  //       console.error("Registration failed:", error);
  //       setFormError(true);
  //     } finally {
  //       setIsSubmitting(false);
  //     }
  //   };

  // Create floating minecraft particles for success animation
  const createMinecraftParticles = () => {
    const particleContainer = document.createElement("div");
    particleContainer.className = "absolute inset-0 pointer-events-none z-50";
    document.body.appendChild(particleContainer);

    // Create particles
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement("div");
      particle.className = "absolute w-2 h-2 bg-green-500 opacity-60";
      particle.style.top = "50%";
      particle.style.left = "50%";

      // Pixelated shape
      particle.style.clipPath = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

      // Random colors for celebration
      const colors = ["#5cdb5c", "#4682B4", "#BA55D3", "#FFD700", "#FF6347"];
      particle.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];

      particleContainer.appendChild(particle);

      // Animate each particle outward in a firework pattern
      gsap.to(particle, {
        y: -200 + Math.random() * 400,
        x: -200 + Math.random() * 400,
        opacity: 0,
        duration: 2 + Math.random() * 3,
        ease: "power2.out",
        onComplete: () => {
          particle.remove();
        },
      });
    }

    // Clean up the container after all animations
    setTimeout(() => {
      particleContainer.remove();
    }, 5000);
  };

  // Setup animations when component mounts
  useEffect(() => {
    // Form entrance animation
    gsap.from(".form-container", {
      y: 100,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    // Animate the cube decorations
    gsap.to(".minecraft-cube", {
      rotateY: 360,
      duration: 10,
      repeat: -1,
      ease: "none",
    });

    // Create initial pixel blocks for the page
    createPixelBlocks();

    return () => {
      // Cleanup ScrollTrigger
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Create minecraft-style pixel blocks for decoration
  const createPixelBlocks = () => {
    const container = document.createElement("div");
    container.className =
      "absolute inset-0 pointer-events-none overflow-hidden";
    container.style.zIndex = "-1";
    document.body.appendChild(container);

    for (let i = 0; i < 30; i++) {
      const block = document.createElement("div");
      block.className = "absolute w-8 h-8 bg-gray-800 opacity-30";
      block.style.top = `${Math.random() * 100}vh`;
      block.style.left = `${Math.random() * 100}vw`;

      // Random colors
      const colors = ["#5cdb5c80", "#4682B480", "#BA55D380", "#FFD70080"];
      block.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];

      container.appendChild(block);

      // Subtle float animation
      gsap.to(block, {
        y: "-=20",
        duration: 3 + Math.random() * 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  };

  // Get selected events details
  const getSelectedEvents = () => {
    return availableEvents.filter((event) =>
      formData.events.includes(event.id)
    );
  };

  const steps = [
    "Personal Info",
    "Academic Details",
    "Select Events",
    "Team Setup",
    "Payment",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/images/okk.jpg')] bg-repeat bg-cover bg-center"></div>

        {/* Minecraft cubes */}
        <div className="absolute top-20 right-20 minecraft-cube w-16 h-16">
          <div className="cube-face cube-face-front bg-blue-700"></div>
          <div className="cube-face cube-face-back bg-blue-700"></div>
          <div className="cube-face cube-face-right bg-blue-800"></div>
          <div className="cube-face cube-face-left bg-blue-800"></div>
          <div className="cube-face cube-face-top bg-blue-600"></div>
          <div className="cube-face cube-face-bottom bg-blue-900"></div>
        </div>

        <div className="absolute bottom-40 left-20 minecraft-cube w-12 h-12">
          <div className="cube-face cube-face-front bg-purple-700"></div>
          <div className="cube-face cube-face-back bg-purple-700"></div>
          <div className="cube-face cube-face-right bg-purple-800"></div>
          <div className="cube-face cube-face-left bg-purple-800"></div>
          <div className="cube-face cube-face-top bg-purple-600"></div>
          <div className="cube-face cube-face-bottom bg-purple-900"></div>
        </div>

        <div className="absolute top-40 left-40 minecraft-cube w-14 h-14">
          <div className="cube-face cube-face-front bg-green-700"></div>
          <div className="cube-face cube-face-back bg-green-700"></div>
          <div className="cube-face cube-face-right bg-green-800"></div>
          <div className="cube-face cube-face-left bg-green-800"></div>
          <div className="cube-face cube-face-top bg-green-600"></div>
          <div className="cube-face cube-face-bottom bg-green-900"></div>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-grow relative z-10 pt-12 pb-24 px-4">
        <div className="container mx-auto">
          <Link
            to="/"
            className="inline-flex items-center text-white font-minecraft mb-6"
          >
            <ArrowLeft className="mr-2" size={20} />
            {/* <span>Back to Home</span> */}
          </Link>

          <h1 className="font-minecraft text-4xl md:text-5xl text-center text-white mb-4 pixel-text-shadow shimmer-effect">
            Event Registration
          </h1>
          <p className="text-center font-minecraft text-lg text-cyan-400 mb-8">
            Join the epic Minecraft adventure at our college fest!
          </p>
          {/* Form Container */}
          <div className="max-w-3xl mx-auto">
            {!formSuccess ? (
              <div className="form-container relative bg-gray-800 border-4 border-gray-700 p-6 rounded-lg shadow-2xl mb-8">
                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    {steps.map((step, index) => (
                      <div
                        key={index}
                        className={`text-xs md:text-sm font-minecraft ${
                          formStep >= index ? "text-green-400" : "text-gray-500"
                        }`}
                      >
                        {step}
                      </div>
                    ))}
                  </div>
                  <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-green-500"
                      initial={{ width: "0%" }}
                      animate={{ width: `${(formStep / 4) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Form Step 1: Personal Information */}
                {formStep === 0 && (
                  <div className="form-step space-y-4">
                    <h2 className="font-minecraft text-xl text-yellow-400 mb-4 border-b-2 border-yellow-400 pb-2">
                      <User className="inline-block mr-2" /> Personal
                      Information
                    </h2>

                    <div className="form-group">
                      <label
                        className="block font-minecraft text-white mb-2"
                        htmlFor="fullName"
                      >
                        Full Name
                      </label>
                      <div className="relative">
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          value={formData.fullName}
                          onChange={handleChange}
                          className={`w-full font-minecraft bg-gray-700 text-white border-2 ${
                            errors.fullName
                              ? "border-red-500"
                              : "border-gray-600"
                          } p-3 rounded-lg focus:border-cyan-500 focus:outline-none transition-all`}
                          placeholder="Steve Minecraft"
                        />
                        <User
                          className="absolute right-3 top-3 text-gray-400"
                          size={20}
                        />
                      </div>
                      {errors.fullName && (
                        <p className="text-red-500 text-sm mt-1 font-minecraft">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div className="form-group">
                      <label
                        className="block font-minecraft text-white mb-2"
                        htmlFor="email"
                      >
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full font-minecraft bg-gray-700 text-white border-2 ${
                            errors.email ? "border-red-500" : "border-gray-600"
                          } p-3 rounded-lg focus:border-cyan-500 focus:outline-none transition-all`}
                          placeholder="steve@minecraft.edu"
                        />
                        <Mail
                          className="absolute right-3 top-3 text-gray-400"
                          size={20}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1 font-minecraft">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="form-group">
                      <label
                        className="block font-minecraft text-white mb-2"
                        htmlFor="phone"
                      >
                        Phone Number
                      </label>
                      <div className="relative">
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full font-minecraft bg-gray-700 text-white border-2 ${
                            errors.phone ? "border-red-500" : "border-gray-600"
                          } p-3 rounded-lg focus:border-cyan-500 focus:outline-none transition-all`}
                          placeholder="1234567890"
                        />
                        <Phone
                          className="absolute right-3 top-3 text-gray-400"
                          size={20}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1 font-minecraft">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Form Step 2: Academic Details */}
                {formStep === 1 && (
                  <div className="form-step space-y-4">
                    <h2 className="font-minecraft text-xl text-yellow-400 mb-4 border-b-2 border-yellow-400 pb-2">
                      <School className="inline-block mr-2" /> Academic Details
                    </h2>

                    <div className="form-group">
                      <label
                        className="block font-minecraft text-white mb-2"
                        htmlFor="college"
                      >
                        College Name
                      </label>
                      <div className="relative">
                        <input
                          id="college"
                          name="college"
                          type="text"
                          value={formData.college}
                          onChange={handleChange}
                          className={`w-full font-minecraft bg-gray-700 text-white border-2 ${
                            errors.college
                              ? "border-red-500"
                              : "border-gray-600"
                          } p-3 rounded-lg focus:border-cyan-500 focus:outline-none transition-all`}
                          placeholder="Minecraft University"
                        />
                        <School
                          className="absolute right-3 top-3 text-gray-400"
                          size={20}
                        />
                      </div>
                      {errors.college && (
                        <p className="text-red-500 text-sm mt-1 font-minecraft">
                          {errors.college}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="form-group">
                        <label
                          className="block font-minecraft text-white mb-2"
                          htmlFor="year"
                        >
                          Year of Study
                        </label>
                        <div className="relative">
                          <select
                            id="year"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            className={`w-full font-minecraft bg-gray-700 text-white border-2 ${
                              errors.year ? "border-red-500" : "border-gray-600"
                            } p-3 rounded-lg focus:border-cyan-500 focus:outline-none transition-all appearance-none`}
                          >
                            <option value="">Select Year</option>
                            <option value="1st">1st Year</option>
                            <option value="2nd">2nd Year</option>
                            <option value="3rd">3rd Year</option>
                            <option value="4th">4th Year</option>
                            <option value="5th">5th Year</option>
                          </select>
                          <ChevronDown
                            className="absolute right-3 top-3 text-gray-400"
                            size={20}
                          />
                        </div>
                        {errors.year && (
                          <p className="text-red-500 text-sm mt-1 font-minecraft">
                            {errors.year}
                          </p>
                        )}
                      </div>

                      <div className="form-group">
                        <label
                          className="block font-minecraft text-white mb-2"
                          htmlFor="department"
                        >
                          Department
                        </label>
                        <div className="relative">
                          <input
                            id="department"
                            name="department"
                            type="text"
                            value={formData.department}
                            onChange={handleChange}
                            className={`w-full font-minecraft bg-gray-700 text-white border-2 ${
                              errors.department
                                ? "border-red-500"
                                : "border-gray-600"
                            } p-3 rounded-lg focus:border-cyan-500 focus:outline-none transition-all`}
                            placeholder="Computer Science"
                          />
                          <BookOpen
                            className="absolute right-3 top-3 text-gray-400"
                            size={20}
                          />
                        </div>
                        {errors.department && (
                          <p className="text-red-500 text-sm mt-1 font-minecraft">
                            {errors.department}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Form Step 3: Event Selection */}
                {formStep === 2 && (
                  <div className="form-step space-y-4">
                    <h2 className="font-minecraft text-xl text-yellow-400 mb-4 border-b-2 border-yellow-400 pb-2">
                      <Calendar className="inline-block mr-2" /> Select Events
                    </h2>
                    {errors.events && (
                      <p className="text-red-500 text-sm mb-3 font-minecraft bg-red-900/30 p-2 rounded">
                        {errors.events}
                      </p>
                    )}
                    ...
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {availableEvents.map((event) => (
                        <motion.div
                          key={event.id}
                          whileHover={{ scale: 1.02 }}
                          className={`bg-gray-700 border-2 ${
                            formData.events.includes(event.id)
                              ? "border-green-500"
                              : "border-gray-600"
                          } rounded-lg p-4 cursor-pointer transition-all relative`}
                          onClick={() => handleEventSelect(event.id)}
                        >
                          <div className="flex justify-between">
                            <h3 className="font-minecraft text-white">
                              {event.name}
                            </h3>
                            <span
                              className={`font-minecraft px-2 py-1 text-xs rounded ${
                                event.category === "Technical"
                                  ? "bg-blue-900 text-blue-300"
                                  : event.category === "Cultural"
                                  ? "bg-purple-900 text-purple-300"
                                  : event.category === "Gaming"
                                  ? "bg-red-900 text-red-300"
                                  : "bg-green-900 text-green-300"
                              }`}
                            >
                              {event.category}
                            </span>
                          </div>
                          <div className="mt-2 flex items-center text-sm">
                            {event.teamEvent ? (
                              event.maxTeamSize ? (
                                <div className="flex items-center text-yellow-300">
                                  <Users size={16} className="mr-1" />
                                  <span>Team (max {event.maxTeamSize})</span>
                                </div>
                              ) : (
                                <div className="flex items-center text-yellow-300">
                                  <Users size={16} className="mr-1" />
                                  <span>Team (min {event.minTeamSize})</span>
                                </div>
                              )
                            ) : (
                              <div className="flex items-center text-cyan-300">
                                <User size={16} className="mr-1" />
                                <span>Individual</span>
                              </div>
                            )}
                          </div>
                          {event.registrationFee && (
                            <div className="mt-2 text-sm text-gray-400">
                              Registration Fee: ₹{event.registrationFee}
                            </div>
                          )}
                          {formData.events.includes(event.id) && (
                            <div className="absolute bottom-2 right-2">
                              <Check className="text-green-500" size={20} />
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                    ...
                  </div>
                )}

                {/* Form Step 4: Team Setup */}
                {formStep === 3 && (
                  <div className="form-step space-y-4">
                    <h2 className="font-minecraft text-xl text-yellow-400 mb-4 border-b-2 border-yellow-400 pb-2">
                      <Users className="inline-block mr-2" /> Team Setup
                    </h2>

                    {getSelectedEvents().some((event) => event.teamEvent) ? (
                      <>
                        <div className="bg-gray-700 border-2 border-gray-600 rounded-lg p-4 mb-4">
                          <label className="flex items-center font-minecraft text-white cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.useSameTeam}
                              onChange={(e) => {
                                const useSame = e.target.checked;
                                const firstTeamEventId =
                                  getSelectedEvents().find(
                                    (e) => e.teamEvent
                                  )?.id;

                                setFormData((prev) => {
                                  const baseTeam = prev.teams[
                                    firstTeamEventId
                                  ] || { name: "", members: [] };

                                  return {
                                    ...prev,
                                    useSameTeam: useSame,
                                    teams: useSame
                                      ? Object.fromEntries(
                                          getSelectedEvents()
                                            .filter((e) => e.teamEvent)
                                            .map((event) => [
                                              event.id,
                                              JSON.parse(
                                                JSON.stringify(baseTeam)
                                              ),
                                            ])
                                        )
                                      : prev.teams,
                                  };
                                });
                              }}
                              className="form-checkbox h-5 w-5 text-green-500 rounded mr-2"
                            />
                            Use the same team for all events
                          </label>
                        </div>

                        {getSelectedEvents()
                          .filter((event) => event.teamEvent)
                          .map((event, index) => {
                            const teamData = formData.teams[event.id] || {
                              name: "",
                              members: [],
                            };
                            const isFirstTeam = index === 0;
                            const maxTeamSize =
                              event.maxTeamSize || event.minTeamSize * 2;

                            return (
                              <div
                                key={event.id}
                                className="bg-gray-700 border-2 border-gray-600 rounded-lg p-4"
                              >
                                {/* Event Header */}
                                <div className="flex items-center mb-4">
                                  <span className="font-minecraft text-yellow-400 text-lg mr-2">
                                    {event.name}
                                  </span>
                                  <span
                                    className={`font-minecraft px-2 py-1 text-xs rounded ${
                                      event.category === "Technical"
                                        ? "bg-blue-900 text-blue-300"
                                        : event.category === "Cultural"
                                        ? "bg-purple-900 text-purple-300"
                                        : event.category === "Gaming"
                                        ? "bg-red-900 text-red-300"
                                        : "bg-green-900 text-green-300"
                                    }`}
                                  >
                                    {event.category}
                                  </span>
                                </div>

                                {(isFirstTeam || !formData.useSameTeam) && (
                                  <div className="space-y-4">
                                    {/* Team Name Input */}
                                    <div className="form-group">
                                      <label className="block font-minecraft text-white mb-2">
                                        Team Name{" "}
                                        {formData.useSameTeam &&
                                          "(Applied to all events)"}
                                      </label>
                                      <div className="relative">
                                        <input
                                          value={teamData.name}
                                          // In the team name input's onChange handler, replace with:
                                          onChange={(e) => {
                                            const value = e.target.value;
                                            setFormData((prev) => {
                                              const newTeams = {
                                                ...prev.teams,
                                              };

                                              if (prev.useSameTeam) {
                                                // Create new object for each team
                                                Object.keys(newTeams).forEach(
                                                  (teamId) => {
                                                    newTeams[teamId] = {
                                                      ...newTeams[teamId],
                                                      name: value,
                                                      members: [
                                                        ...(newTeams[teamId]
                                                          .members || []),
                                                      ], // Preserve members
                                                    };
                                                  }
                                                );
                                              } else {
                                                newTeams[event.id] = {
                                                  ...newTeams[event.id],
                                                  name: value,
                                                  members: [
                                                    ...(newTeams[event.id]
                                                      ?.members || []),
                                                  ], // Preserve members // Preserve members
                                                };
                                              }

                                              return {
                                                ...prev,
                                                teams: newTeams,
                                              };
                                            });
                                          }}
                                          className="w-full font-minecraft bg-gray-700 text-white border-2 border-gray-600 p-3 rounded-lg focus:border-cyan-500 focus:outline-none transition-all"
                                          placeholder="Enter team name"
                                          disabled={
                                            !isFirstTeam && formData.useSameTeam
                                          }
                                        />
                                        <Users
                                          className="absolute right-3 top-3 text-gray-400"
                                          size={20}
                                        />
                                      </div>
                                    </div>

                                    {/* Team Members Section */}
                                    <div>
                                      <h3 className="font-minecraft text-white mb-2">
                                        Team Members{" "}
                                        {formData.useSameTeam &&
                                          "(Applied to all events)"}
                                      </h3>

                                      {teamData.members.map(
                                        (member, memberIndex) => (
                                          <div
                                            key={memberIndex}
                                            className="mb-4 bg-gray-800 border-2 border-gray-700 rounded-lg p-4"
                                          >
                                            {/* Member fields */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                              {/* Name Input */}
                                              <div className="form-group">
                                                <label className="block font-minecraft text-white mb-2">
                                                  Full Name
                                                </label>
                                                <input
                                                  type="text"
                                                  value={member.name}
                                                  onChange={(e) =>
                                                    handleTeamMemberChange(
                                                      event.id,
                                                      memberIndex,
                                                      "name",
                                                      e.target.value
                                                    )
                                                  }
                                                  className="w-full font-minecraft bg-gray-700 text-white border-2 border-gray-600 p-3 rounded-lg focus:border-cyan-500 focus:outline-none transition-all"
                                                  placeholder="John Doe"
                                                  disabled={
                                                    !isFirstTeam &&
                                                    formData.useSameTeam
                                                  }
                                                />
                                              </div>
                                              <div className="form-group">
                                                <label className="block font-minecraft text-white mb-2">
                                                  Phone Number
                                                </label>
                                                <input
                                                  type="text"
                                                  value={member.phone}
                                                  onChange={(e) =>
                                                    handleTeamMemberChange(
                                                      event.id,
                                                      memberIndex,
                                                      "phone",
                                                      e.target.value
                                                    )
                                                  }
                                                  className="w-full font-minecraft bg-gray-700 text-white border-2 border-gray-600 p-3 rounded-lg focus:border-cyan-500 focus:outline-none transition-all"
                                                  placeholder="1234567890"
                                                  disabled={
                                                    !isFirstTeam &&
                                                    formData.useSameTeam
                                                  }
                                                />
                                              </div>
                                              <div className="form-group">
                                                <label className="block font-minecraft text-white mb-2">
                                                  Mail ID
                                                </label>
                                                <input
                                                  type="email"
                                                  value={member.email}
                                                  onChange={(e) =>
                                                    handleTeamMemberChange(
                                                      event.id,
                                                      memberIndex,
                                                      "email",
                                                      e.target.value
                                                    )
                                                  }
                                                  className="w-full font-minecraft bg-gray-700 text-white border-2 border-gray-600 p-3 rounded-lg focus:border-cyan-500 focus:outline-none transition-all"
                                                  placeholder="example@example.com"
                                                  disabled={
                                                    !isFirstTeam &&
                                                    formData.useSameTeam
                                                  }
                                                />
                                              </div>

                                              {/* Similar changes for email and phone inputs */}
                                            </div>
                                          </div>
                                        )
                                      )}

                                      {/* Add Member Button */}
                                      {teamData.members.length <
                                        maxTeamSize && (
                                        <button
                                          type="button"
                                          onClick={() => {
                                            if (formData.useSameTeam) {
                                              // Add member to all teams
                                              setFormData((prev) => {
                                                const newTeams = {
                                                  ...prev.teams,
                                                };
                                                const newMember = {
                                                  name: "",
                                                  email: "",
                                                  phone: "",
                                                };

                                                Object.keys(newTeams).forEach(
                                                  (teamId) => {
                                                    newTeams[teamId].members = [
                                                      ...newTeams[teamId]
                                                        .members,
                                                      newMember,
                                                    ];
                                                  }
                                                );

                                                return {
                                                  ...prev,
                                                  teams: newTeams,
                                                };
                                              });
                                            } else {
                                              addTeamMember(event.id);
                                            }
                                          }}
                                          className="bg-gray-700 border-2 border-gray-600 rounded-lg p-3 w-full font-minecraft text-cyan-400 hover:text-cyan-300 hover:border-cyan-600 transition-colors flex items-center justify-center"
                                          disabled={
                                            !isFirstTeam && formData.useSameTeam
                                          }
                                        >
                                          <UserPlus
                                            className="mr-2"
                                            size={18}
                                          />
                                          Add Team Member
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                      </>
                    ) : (
                      <div className="bg-gray-700 border-2 border-gray-600 rounded-lg p-6">
                        <div className="flex items-center justify-center text-center">
                          <div>
                            <Award
                              className="mx-auto text-yellow-500 mb-3"
                              size={48}
                            />
                            <h3 className="font-minecraft text-white text-lg mb-2">
                              Individual Registration
                            </h3>
                            <p className="font-minecraft text-gray-400">
                              You've selected only individual events.
                              <br />
                              No team setup is required.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {formStep === 4 && (
                  <div className="form-step space-y-4">
                    <h2 className="font-minecraft text-xl text-yellow-400 mb-4 border-b-2 border-yellow-400 pb-2">
                      <CreditCard className="inline-block mr-2" /> Payment
                      Details
                    </h2>

                    <div className="bg-gray-700 p-4 rounded-lg border-2 border-gray-600 space-y-6">
                      {/* Fee Breakdown Section */}
                      <div className="bg-gray-800 p-4 rounded-lg border-2 border-gray-700">
                        <h3 className="font-minecraft text-yellow-400 mb-4 text-lg">
                          Fee Breakdown
                        </h3>

                        <div className="space-y-3 mb-4">
                          {formData.events.map((eventId) => {
                            const event = availableEvents.find(
                              (e) => e.id === eventId
                            );
                            if (!event) return null;

                            return (
                              <div
                                key={eventId}
                                className="flex justify-between items-center bg-gray-700 px-4 py-3 rounded"
                              >
                                <div className="flex items-center">
                                  <span className="font-minecraft text-gray-300">
                                    {event.name}
                                  </span>
                                  <span
                                    className={`ml-2 text-xs px-2 py-1 rounded ${
                                      event.category === "Technical"
                                        ? "bg-blue-900 text-blue-300"
                                        : event.category === "Cultural"
                                        ? "bg-purple-900 text-purple-300"
                                        : event.category === "Gaming"
                                        ? "bg-red-900 text-red-300"
                                        : "bg-green-900 text-green-300"
                                    }`}
                                  >
                                    {event.category}
                                  </span>
                                </div>
                                <span className="font-minecraft text-yellow-400">
                                  ₹{event.registrationFee}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        <div className="border-t-2 border-gray-600 pt-4">
                          <div className="flex justify-between items-center">
                            <span className="font-minecraft text-white text-lg">
                              Total Amount:
                            </span>
                            <span className="font-minecraft text-green-400 text-2xl">
                              ₹
                              {formData.events.reduce((total, eventId) => {
                                const event = availableEvents.find(
                                  (e) => e.id === eventId
                                );
                                return total + (event?.registrationFee || 0);
                              }, 0)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Payment Instructions */}
                      <div className="bg-gray-800 p-4 rounded-lg border-2 border-gray-700">
                        <h3 className="font-minecraft text-yellow-400 mb-3 text-lg">
                          Payment Instructions
                        </h3>
                        <div className="font-minecraft text-gray-400 space-y-2 text-sm">
                          <p>
                            ➤ Total Amount: ₹
                            {formData.events.reduce((total, eventId) => {
                              const event = availableEvents.find(
                                (e) => e.id === eventId
                              );
                              return total + (event?.registrationFee || 0);
                            }, 0)}
                          </p>
                          <p>
                            ➤ UPI ID:{" "}
                            <span className="text-cyan-400">
                              collegefest@upi
                            </span>
                          </p>
                          <p>➤ Bank Details:</p>
                          <div className="ml-4">
                            <p>Bank Name: ABC Bank</p>
                            <p>Account Number: 1234567890</p>
                            <p>IFSC Code: ABCD1234567</p>
                          </div>
                          <p className="text-red-400">
                            ⚠️ Please complete payment within 24 hours of
                            registration
                          </p>
                        </div>
                      </div>

                      {/* Transaction ID Input */}
                      <div className="form-group">
                        <label className="block font-minecraft text-white mb-2">
                          Transaction ID <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="paymentTransactionId"
                            value={formData.paymentTransactionId}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                paymentTransactionId: e.target.value,
                              }))
                            }
                            className={`w-full bg-gray-800 text-white border-2 ${
                              errors.paymentTransactionId
                                ? "border-red-500"
                                : "border-gray-700"
                            } p-3 rounded-lg focus:border-cyan-500 transition-all font-minecraft`}
                            placeholder="Enter UPI/Transaction ID"
                          />
                          <Receipt
                            className="absolute right-3 top-3 text-gray-400"
                            size={20}
                          />
                        </div>
                        {errors.paymentTransactionId && (
                          <p className="text-red-500 text-sm mt-2 font-minecraft">
                            {errors.paymentTransactionId}
                          </p>
                        )}
                      </div>

                      {/* Payment Screenshot Upload */}
                      <div className="form-group">
                        <label className="block font-minecraft text-white mb-2">
                          Payment Screenshot{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="paymentScreenshot"
                          />
                          <label
                            htmlFor="paymentScreenshot"
                            className={`w-full bg-gray-800 text-white border-2 ${
                              errors.paymentScreenshot
                                ? "border-red-500"
                                : "border-gray-700"
                            } p-3 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors font-minecraft`}
                          >
                            <ImageIcon className="mr-2" size={20} />
                            {paymentPreview
                              ? "Change Screenshot"
                              : "Upload Payment Proof"}
                          </label>
                        </div>
                        {errors.paymentScreenshot && (
                          <p className="text-red-500 text-sm mt-2 font-minecraft">
                            {errors.paymentScreenshot}
                          </p>
                        )}

                        {paymentPreview && (
                          <div className="mt-4 p-2 border-2 border-gray-700 rounded-lg">
                            <h4 className="font-minecraft text-gray-400 mb-2">
                              Preview:
                            </h4>
                            <img
                              src={paymentPreview}
                              alt="Payment preview"
                              className="max-h-48 rounded-lg mx-auto border-2 border-gray-600"
                            />
                          </div>
                        )}
                      </div>

                      {/* Payment Disclaimer */}
                      <div className="bg-red-900/20 p-4 rounded-lg border-2 border-red-800">
                        <p className="font-minecraft text-red-400 text-sm">
                          <span className="text-lg">⚠️</span> Your registration
                          will be confirmed only after payment verification.
                          Keep your transaction ID ready for reference.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  {formStep > 0 && (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="font-minecraft bg-gray-700 text-white border-2 border-gray-600 px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center"
                    >
                      <ArrowLeft className="mr-2" size={18} />
                      Back
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleNextStep}
                    disabled={isSubmitting}
                    className={`font-minecraft ml-auto ${
                      formStep === 4
                        ? "bg-green-700 hover:bg-green-600 border-green-600"
                        : "bg-blue-700 hover:bg-blue-600 border-blue-600"
                    } text-white border-2 px-6 py-3 rounded-lg transition-colors flex items-center ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        {formStep === 4 ? "Complete Registration" : "Continue"}
                        <ArrowRight className="ml-2" size={18} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <motion.div
                className="success-message bg-gray-800 border-4 border-green-600 p-8 rounded-lg shadow-2xl text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <div className="w-20 h-20 mx-auto bg-green-600 rounded-full flex items-center justify-center mb-6">
                  <Check size={40} className="text-white" />
                </div>
                <h2 className="font-minecraft text-3xl text-green-500 mb-4">
                  Registration Complete!
                </h2>
                <p className="font-minecraft text-white mb-6">
                  Thank you for registering! A confirmation email has been sent.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <PixelButton
                    onClick={() => navigate("/")}
                    className="bg-blue-700 hover:bg-blue-600"
                  >
                    Return Home
                  </PixelButton>
                  <PixelButton
                    onClick={() => {
                      setFormData({
                        fullName: "",
                        email: "",
                        phone: "",
                        college: "",
                        year: "",
                        department: "",
                        events: [],
                        teamMembers: [],
                        teamName: "",
                        hasTeam: false,
                        paymentTransactionId: "",
                        paymentScreenshot: "",
                        useSameTeam: false,
                        teams: {},
                      });
                      setFormStep(0);
                      setFormSuccess(false);
                    }}
                    className="bg-green-700 hover:bg-green-600"
                  >
                    New Registration
                  </PixelButton>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Error message if form submission fails */}
        {formError && (
          <div className="bg-red-900 border-2 border-red-700 p-4 rounded-lg mt-4">
            <div className="flex items-start">
              <AlertCircle className="text-red-500 mr-3 mt-0.5" size={20} />
              <div>
                <h3 className="font-minecraft text-red-500 mb-1">
                  Registration Error
                </h3>
                <p className="font-minecraft text-white text-sm">
                  There was a problem submitting your registration. Please try
                  again later or contact support.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* CSS for Minecraft cube animation */}
      <style>{`
        .minecraft-cube {
          transform-style: preserve-3d;
          transform: rotateX(-20deg) rotateY(45deg);
          position: relative;
        }

        .cube-face {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0.8;
        }

        .cube-face-front {
          transform: translateZ(calc(var(--size) / 2));
        }

        .cube-face-back {
          transform: translateZ(calc(var(--size) / -2)) rotateY(180deg);
        }

        .cube-face-right {
          transform: translateX(calc(var(--size) / 2)) rotateY(90deg);
        }

        .cube-face-left {
          transform: translateX(calc(var(--size) / -2)) rotateY(-90deg);
        }

        .cube-face-top {
          transform: translateY(calc(var(--size) / -2)) rotateX(90deg);
        }

        .cube-face-bottom {
          transform: translateY(calc(var(--size) / 2)) rotateX(-90deg);
        }

        .pixel-text-shadow {
          text-shadow: 0.2rem 0.2rem 0 #2d3748;
        }

        .shimmer-effect {
          background-image: linear-gradient(
            -45deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0) 40%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0) 60%,
            rgba(255, 255, 255, 0) 100%
          );
          background-size: 200% 200%;
          background-repeat: no-repeat;
          background-position: 0% 0%;
          animation: shimmer 4s infinite;
        }

        @keyframes shimmer {
          0% {
            background-position: -100% -100%;
          }
          100% {
            background-position: 100% 100%;
          }
        }

        .form-container {
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.1);
        }
      `}</style>
      );
    </div>
  );
};

export default EventRegistration;
