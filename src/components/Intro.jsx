import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaArrowRight, 
  FaRegEnvelope, 
  FaLinkedin, 
  FaGithub, 
  FaBookOpen, 
  FaMagic 
} from 'react-icons/fa';

// Profile Images for Auto-Slide
import MyImage from '../assets/images/Sandali Liyanage.jpg'; // Replace with your first profile image path
import ProfileTwo from '../assets/images/3mt.jpg'; // Replace with your second profile image path
import ProfileThree from '../assets/images/deanslist.jpeg'; // Replace with your third profile image path
import ProfileFour from '../assets/images/WIE.jpg'; // Replace with your fourth profile image path

import Karate from '../assets/images/karate.jpg';
import Announcing from '../assets/images/announcing.jpg';
import TechOne from '../assets/images/tech1.jpg';
import TechTwo from '../assets/images/tec2.jpg';
import LeadershipOne from '../assets/images/leader1.jpg';
import LeadershipTwo from '../assets/images/leader2.jpg';
import VolunteeringOne from '../assets/images/ieee.png';
import VolunteeringTwo from '../assets/images/Rotaract.png';
import Skills from '../components/Skills';
import Img1 from '../assets/image-bar/img1.png';
import Img2 from '../assets/image-bar/img2.jpg';
import Img3 from '../assets/image-bar/img3.jpg';
import Img4 from '../assets/image-bar/img4.jpg';
import Img5 from '../assets/image-bar/img5.jpg';
import Img6 from '../assets/image-bar/img6.jpg';
import Img7 from '../assets/image-bar/img7.jpg';
import Img8 from '../assets/image-bar/img8.jpg';
import Img9 from '../assets/image-bar/img9.jpg';
import Img10 from '../assets/image-bar/img10.jpg';

const profileImages = [MyImage, ProfileTwo, ProfileThree, ProfileFour];

const imageBarImages = [Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8, Img9, Img10];

const buildCardGlows = [
  'border-indigo-500/40 bg-slate-900/90 hover:border-indigo-400 shadow-lg shadow-indigo-950/30',
  'border-emerald-500/40 bg-slate-900/90 hover:border-emerald-400 shadow-lg shadow-emerald-950/30',
  'border-violet-500/40 bg-slate-900/90 hover:border-violet-400 shadow-lg shadow-violet-950/30',
  'border-amber-500/40 bg-slate-900/90 hover:border-amber-400 shadow-lg shadow-amber-950/30',
];

const whatICanDo = [
  {
    number: '01',
    title: 'Tech Background',
    images: [TechOne, TechTwo],
    content: (
      <>
        <p className="mb-3 text-slate-200">
          I am an IT undergraduate who actively participates in hackathons and coding
          competitions including Codegoda by Agoda, alongside completing learning paths on IT.
          My expertise lies in:
        </p>
        <ul className="space-y-1.5 text-slate-100">
          <li><strong className="font-semibold text-white">• Web Full-Stack Development</strong></li>
          <li><strong className="font-semibold text-white">• AI/ML</strong></li>
          <li><strong className="font-semibold text-white">• Android Development</strong></li>
          <li><strong className="font-semibold text-white">• UI/UX Design</strong></li>
        </ul>
      </>
    ),
  },
  {
    number: '02',
    title: 'Leadership',
    images: [LeadershipOne, LeadershipTwo],
    content: (
      <>
        <p className="mb-3 text-slate-200">
          I believe in leading by example and fostering collaboration. My leadership experience
          includes:
        </p>
        <ul className="space-y-1.5 text-slate-100">
          <li><strong className="font-semibold text-white">• Assistant Secretary of Charter Excom</strong> — Rotaract Club of Rajarata University</li>
          <li><strong className="font-semibold text-white">• Founding Chairperson</strong> — IEEE WIE Student Branch Affinity Group of RUSL</li>
          <li><strong className="font-semibold text-white">• Senior Prefect</strong> — School Prefect Guild</li>
          <li><strong className="font-semibold text-white">• Starter President</strong> — School Debating Unit</li>
        </ul>
      </>
    ),
  },
  {
    number: '03',
    title: 'Volunteering',
    images: [VolunteeringOne, VolunteeringTwo],
    content: (
      <>
        <p className="mb-3 text-slate-200">
          Giving back to the community is close to my heart. I actively contribute to various
          organizations, including:
        </p>
        <ul className="space-y-1.5 text-slate-100">
          <li><strong className="font-semibold text-white">• IEEE &amp; IEEE WIE</strong> — Promoting STEM education and women in tech</li>
          <li><strong className="font-semibold text-white">• Rotaract</strong> — Engaging in social service and youth empowerment programs</li>
          <li><strong className="font-semibold text-white">• Volunteer Teacher</strong> — Teaching Mathematics and IT to underprivileged students</li>
          <li><strong className="font-semibold text-white">• SEDSSL &amp; SEDSOUSL</strong> — Former member, contributing to student development initiatives</li>
        </ul>
      </>
    ),
  },
  {
    number: '04',
    title: 'Other Activities',
    images: [Karate, Announcing],
    content: (
      <>
        <p className="mb-3 text-slate-200">
          Beyond tech and leadership, I have a passion for public speaking, debating, and physical
          fitness.
        </p>
        <ul className="space-y-1.5 text-slate-100">
          <li><strong className="font-semibold text-white">• Public Speaker &amp; Announcer</strong> — Hosted tech events, university and school programs</li>
          <li><strong className="font-semibold text-white">• Program Presenter</strong> — Conducted various events; former child Radio Presenter of SLBC</li>
          <li><strong className="font-semibold text-white">• Debater</strong> — Former school debate team member and Starter President of the School Debating Unit</li>
          <li><strong className="font-semibold text-white">• Karate Player</strong> — Disciplined in martial arts, embracing perseverance and self-control</li>
          <li><strong className="font-semibold text-white">• Former Cadet</strong> — National Cadet Corps Sri Lanka, instilling discipline and resilience</li>
        </ul>
      </>
    ),
  },
];

const Intro = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // AOS Init
  useEffect(() => {
    const AOS = require('aos');
    AOS.init({ duration: 800, once: true });
  }, []);

  // Profile Auto-Slide Logic (3 seconds interval)
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % profileImages.length);
    }, 3000);

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Background Radial Glow Effects */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[45rem] bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.25),transparent_50%),radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.20),transparent_40%)]" />

      {/* Hero Section */}
      <section className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pt-16 pb-20 md:grid-cols-5 md:pt-24 md:pb-28">
        <div className="order-2 md:order-1 md:col-span-3" data-aos="fade-right">
          {/* Badge Pills */}
          <div className="flex flex-wrap gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-400/50 bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300 shadow-sm">
              <FaMagic className="text-[10px]" /> Portfolio
            </span>
            <span className="rounded-full border border-slate-700 bg-slate-800/80 px-3 py-1 text-xs font-medium text-slate-200">
              Full-Stack
            </span>
            <span className="rounded-full border border-slate-700 bg-slate-800/80 px-3 py-1 text-xs font-medium text-slate-200">
              Research
            </span>
            <span className="rounded-full border border-slate-700 bg-slate-800/80 px-3 py-1 text-xs font-medium text-slate-200">
              Leadership
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl drop-shadow-sm">
            Sandali Liyanage
          </h1>
          <p className="mt-4 max-w-2xl text-lg font-medium leading-relaxed text-slate-200 md:text-xl">
            IT undergraduate, software developer, and community leader building thoughtful digital
            experiences with a strong visual identity.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300">
            I work across full-stack development, Android, AI/ML, and UI/UX design. My background
            also includes public speaking, volunteering, and leadership roles, which shape the way
            I build products that are clear, useful, and human.
          </p>

          {/* Social Links Bar */}
          <div className="mt-6 flex items-center gap-3">
            {[
              { href: "https://www.linkedin.com/in/sandali-liyanage/", label: "LinkedIn", icon: <FaLinkedin /> },
              { href: "https://github.com/sithusss/", label: "GitHub", icon: <FaGithub /> },
              { href: "https://medium.com/@sithumanisandali", label: "Blog", icon: <FaBookOpen /> }
            ].map((soc) => (
              <a
                key={soc.label}
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/90 px-3.5 py-2 text-xs font-semibold text-slate-200 shadow-md transition duration-300 hover:border-indigo-400 hover:bg-slate-800 hover:text-indigo-300"
              >
                {soc.icon} {soc.label}
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-indigo-600/30 transition duration-300 hover:-translate-y-0.5 hover:bg-indigo-500"
            >
              View Projects <FaArrowRight />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-100 transition duration-300 hover:-translate-y-0.5 hover:border-slate-600 hover:bg-slate-700"
            >
              Contact Me <FaRegEnvelope />
            </Link>
          </div>

          {/* Highlights Cards */}
          <div className="mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { label: 'Focus', value: 'Growth & purpose' },
              { label: 'Approach', value: 'Thoughtful & curious' },
              { label: 'Mindset', value: 'Open to learning' },
              { label: 'Research', value: 'Linux, Cloud, Serverless Computing, Devops' },
              { label: 'Interest', value: 'Research & Sharing Knowledge' },
            ].map((item) => (
              <div 
                key={item.label} 
                className="rounded-xl border border-slate-700/80 bg-slate-900/90 p-4 shadow-md transition duration-300 hover:border-indigo-500/50"
              >
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-indigo-400">
                  {item.label}
                </p>
                <p className="mt-1 text-sm font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Profile Auto-Slider Frame */}
        <div className="order-1 md:order-2 md:col-span-2" data-aos="fade-left">
          <div className="relative mx-auto max-w-xs md:max-w-full">
            <div className="absolute -left-6 top-8 h-36 w-36 rounded-full bg-indigo-500/25 blur-3xl" />
            <div className="absolute -right-4 bottom-6 h-44 w-44 rounded-full bg-purple-500/25 blur-3xl" />
            
            <div className="relative overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 p-3 shadow-2xl">
              {/* Image Container with Fixed Height & Aspect Ratio */}
              <div className="relative h-96 w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
                {profileImages.map((imgSrc, index) => (
                  <img
                    key={index}
                    src={imgSrc}
                    alt={`Sandali Liyanage Profile ${index + 1}`}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
                      index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                    }`}
                  />
                ))}

                {/* Carousel Indicator Dots */}
                <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-slate-950/60 px-2.5 py-1 backdrop-blur-md">
                  {profileImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide ? 'w-5 bg-indigo-400' : 'w-2 bg-slate-500/60'
                      }`}
                      aria-label={`Slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between rounded-xl border border-slate-700/80 bg-slate-800/90 px-4 py-3 shadow-sm">
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-indigo-400">
                    Currently
                  </p>
                  <p className="mt-0.5 text-xs font-semibold text-slate-200">Undergraduate</p>
                </div>
                <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Glow Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

      {/* Capabilities Section */}
      <section className="bg-slate-900/90 px-6 py-20 backdrop-blur-md" data-aos="fade-up">
        <div className="mx-auto max-w-6xl">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-indigo-400">Capabilities</span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">What I Can Do</h2>
          <div className="mt-3 h-1 w-16 rounded-full bg-indigo-500" />

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {whatICanDo.map((cat, i) => (
              <div
                key={cat.title}
                data-aos="zoom-in"
                data-aos-delay={i * 100}
                className={`group rounded-2xl border p-8 transition duration-300 hover:-translate-y-1 ${buildCardGlows[i % buildCardGlows.length]}`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">{cat.title}</h3>
                  <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 font-mono text-xs font-bold text-indigo-300">
                    {cat.number}
                  </span>
                </div>
                <div className="mt-5 flex gap-3">
                  <img 
                    src={cat.images[0]} 
                    alt={`${cat.title} preview 1`} 
                    className="h-16 w-24 rounded-xl border border-slate-700 object-cover shadow-md transition duration-300 group-hover:scale-105" 
                  />
                  <img 
                    src={cat.images[1]} 
                    alt={`${cat.title} preview 2`} 
                    className="h-16 w-24 rounded-xl border border-slate-700 object-cover shadow-md transition duration-300 group-hover:scale-105" 
                  />
                </div>
                <div className="mt-5 text-sm leading-relaxed">{cat.content}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Decorative Glow Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

      {/* Skills Section */}
      <section className="bg-slate-950 px-6 py-20" data-aos="fade-up">
        <div className="mx-auto max-w-6xl">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-indigo-400">Toolkit</span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Skills</h2>
          <div className="mt-3 h-1 w-16 rounded-full bg-indigo-500" />
          <div className="mt-12">
            <Skills />
          </div>
        </div>
      </section>

      {/* Decorative Glow Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

      {/* Image Marquee - Increased Image Height (h-56) */}
      <section className="bg-slate-900/90 py-16" data-aos="fade-up">
        <h2 className="mb-8 text-center font-mono text-xs font-bold uppercase tracking-widest text-slate-300">
          More About Me
        </h2>
        <div className="overflow-hidden">
          <div className="flex w-max animate-marquee gap-5">
            {[...imageBarImages, ...imageBarImages].map((imgSrc, index) => (
              <img
                key={index}
                src={imgSrc}
                alt={`glimpse ${index + 1}`}
                className="h-56 w-72 flex-shrink-0 rounded-2xl border border-slate-700 object-cover opacity-90 transition duration-300 hover:opacity-100 hover:scale-105 shadow-md"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Intro;