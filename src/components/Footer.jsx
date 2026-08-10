import React from "react";
import ReactJS from "../assets/logos/react.png";
import CSS3 from "../assets/logos/css.png";
import JWT from "../assets/logos/jwt.png";
import MongoDB from "../assets/logos/mongo.png";
import NodeJS from "../assets/logos/node.png";

const Footer = () => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 text-slate-300">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-8 md:flex-row md:justify-between">
        <p className="font-mono text-xs tracking-wide text-slate-400">
          &copy; {new Date().getFullYear()} Sandali Liyanage
        </p>

        <div className="flex items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-widest text-indigo-400">Built with</span>
          <div className="flex items-center gap-3">
            {[
              { src: ReactJS, name: 'React' },
              { src: CSS3, name: 'CSS3' },
              { src: JWT, name: 'JWT' },
              { src: MongoDB, name: 'MongoDB' },
              { src: NodeJS, name: 'NodeJS' }
            ].map((tech, i) => (
              <div key={i} className="rounded-lg border border-slate-800 bg-slate-900/60 p-1.5">
                <img
                  src={tech.src}
                  alt={tech.name}
                  title={tech.name}
                  className="h-4 w-4 grayscale transition duration-300 hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;