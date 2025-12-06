import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from './Footer';
import Tooltip from './Tooltip';
import AnimatedLogo from './AnimatedLogo';
import Navbar from './Navbar';
import type { TeamMemberData, SocialLink } from '../types/components';

// Stat Display (showing final value)
const StatCounter = ({ end, label }: { end: number; label: string }) => {
  const ref = useRef(null);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">{end}+</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
};

// Team Member Card
const TeamMember = ({ member }: { member: TeamMemberData }) => {
  return (
    <motion.div className="bg-white rounded-xl shadow-lg overflow-hidden" whileHover={{ y: -10 }}>
      <div className="h-48 relative">
        <img
          src={member.image}
          alt={`${member.name} - ${member.role}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold">{member.name}</h3>
          <p className="text-orange-300">{member.role}</p>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
        <div className="flex space-x-4">
          {member.social.map((social: SocialLink, index: number) => (
            <a
              key={index}
              href={social.url}
              className="text-gray-400 hover:text-orange-500 transition-colors"
              aria-label={social.name}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d={social.icon} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const About = () => {
  const stats = [
    { end: 300, label: 'Projects Delivered' },
    { end: 35, label: 'Creative Experts' },
    { end: 120, label: 'Global Clients' },
    { end: 8, label: 'Years of Innovation' },
  ];

  const team = [
    {
      name: 'Alex Johnson',
      role: 'Creative Director',
      bio: '10+ years of experience in digital design and brand strategy.',
      image: '/images/alex-johnson.jpg',
      social: [
        {
          name: 'Twitter',
          url: '#',
          icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z',
        },
      ],
    },
    {
      name: 'Sarah Williams',
      role: 'Lead Developer',
      bio: 'Full-stack developer specializing in React and 3D web technologies.',
      image: '/images/sarah-williams.jpg',
      social: [
        {
          name: 'GitHub',
          url: '#',
          icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
        },
      ],
    },
    {
      name: 'Michael Chen',
      role: '3D Artist',
      bio: 'Specialist in creating immersive 3D experiences and animations.',
      image: '/images/michael-chen.jpg',
      social: [
        {
          name: 'LinkedIn',
          url: '#',
          icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      {/* About Content */}
      <div className="container mx-auto px-4 sm:px-6 py-24 md:py-32 flex-grow">
        <div className="text-center mb-10 md:mb-16">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Creative★ Agency
          </motion.h1>
          <motion.p
            className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We are a team of passionate designers, developers, and digital strategists dedicated to
            creating exceptional experiences.
          </motion.p>
        </div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {stats.map((stat, index) => (
            <StatCounter key={index} end={stat.end} label={stat.label} />
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4 text-base md:text-lg">
              Founded in 2015, Creative★ began as a small collective of designers and developers
              with a shared vision: to push the boundaries of digital creativity. What started as a
              three-person operation has grown into a team of 25+ specialists spanning multiple
              disciplines.
            </p>
            <p className="text-gray-600 mb-4 text-base md:text-lg">
              Our approach has always been rooted in the belief that great design solves problems.
              We don't just create beautiful interfaces; we craft meaningful experiences that drive
              real business results. Every project is an opportunity to challenge conventions and
              explore new possibilities.
            </p>
            <p className="text-gray-600 text-base md:text-lg">
              Today, we work with startups and Fortune 500 companies alike, helping them navigate
              the ever-evolving digital landscape with innovative solutions that stand out in a
              crowded marketplace.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <AnimatedLogo />
          </motion.div>
        </div>

        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <motion.div
              className="bg-white p-6 md:p-8 rounded-xl shadow-lg"
              whileHover={{ y: -10 }}
            >
              <div className="text-orange-500 text-3xl md:text-4xl mb-3 md:mb-4">★</div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Innovation</h3>
              <p className="text-gray-600 text-sm md:text-base">
                We constantly explore new technologies and methodologies to deliver cutting-edge
                solutions that set our clients apart.
              </p>
            </motion.div>
            <motion.div
              className="bg-white p-6 md:p-8 rounded-xl shadow-lg"
              whileHover={{ y: -10 }}
            >
              <div className="text-orange-500 text-3xl md:text-4xl mb-3 md:mb-4">★</div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Excellence</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Quality is at the heart of everything we do. We hold ourselves to the highest
                standards in every project we undertake.
              </p>
            </motion.div>
            <motion.div
              className="bg-white p-6 md:p-8 rounded-xl shadow-lg"
              whileHover={{ y: -10 }}
            >
              <div className="text-orange-500 text-3xl md:text-4xl mb-3 md:mb-4">★</div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Collaboration</h3>
              <p className="text-gray-600 text-sm md:text-base">
                We believe the best results come from strong partnerships. We work closely with our
                clients as true collaborators.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {team.map((member, index) => (
              <TeamMember key={index} member={member} />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          <Link to="/contact">
            <Tooltip content="Work with our creative team" position="top">
              <button className="bg-black text-white w-full sm:w-auto px-8 py-4 rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 font-medium shadow-lg text-lg">
                Work With Us
              </button>
            </Tooltip>
          </Link>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
