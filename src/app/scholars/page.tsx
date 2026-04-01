import React from 'react';
import { BookOpen, Award, Quote } from "lucide-react";

export default function ScholarsPage() {
  const scholars = [
    {
      name: "Dr. A. P. J. Abdul Kalam",
      title: "The Missile Man of India",
      education: "Madras Institute of Technology",
      image: "https://upload.wikimedia.org/wikipedia/commons/b/b0/A.P.J._Abdul_Kalam.jpg",
      description: "An aerospace scientist who served as the 11th President of India. Dr. Kalam’s life is a testament to the power of education, proving that a student from a humble background in Rameswaram can reach the highest office.",
      achievement: "Architect of India's civilian space program and military missile development."
    },
    {
      name: "Srinivasa Ramanujan",
      title: "Mathematical Genius",
      education: "University of Cambridge",
      image: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Srinivasa_Ramanujan_-_OPC_-_1%28cropped%29.jpg",
      description: "A self-taught mathematician with almost no formal training in pure mathematics, he made substantial contributions to mathematical analysis, number theory, infinite series, and continued fractions.",
      achievement: "Fellow of the Royal Society for his profound intuition in mathematics."
    },
    {
      name: "Sir C. V. Raman",
      title: "Nobel Laureate in Physics",
      education: "University of Madras",
      image: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Sir_CV_Raman.jpg",
      description: "A groundbreaking Indian physicist whose work on light scattering drastically influenced quantum physics and molecular understanding globally.",
      achievement: "1930 Nobel Prize for Physics (Discovery of the Raman Effect)."
    },
    {
      name: "Marie Curie",
      title: "Pioneer of Radioactivity",
      education: "University of Paris",
      image: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Marie_Curie_c._1920s.jpg",
      description: "The first woman to win a Nobel Prize, the first person to win a Nobel Prize twice, and the only person to win a Nobel Prize in two scientific fields. Her research completely disrupted the scientific understanding of energy.",
      achievement: "Discovered the elements polonium and radium; pioneered treatments for neoplasms."
    },
    {
      name: "Albert Einstein",
      title: "Father of Modern Physics",
      education: "ETH Zurich",
      image: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Albert_Einstein_Head.jpg",
      description: "A theoretical physicist widely recognized as one of the greatest physicists of all time. He developed the theory of relativity, one of the two pillars of modern physics (alongside quantum mechanics).",
      achievement: "Nobel Prize in Physics for his discovery of the law of the photoelectric effect."
    },
    {
      name: "Ada Lovelace",
      title: "The First Computer Programmer",
      education: "University of London",
      image: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Ada_Lovelace_portrait.jpg",
      description: "An English mathematician and writer, chiefly known for her work on Charles Babbage's proposed mechanical general-purpose computer, the Analytical Engine. She recognized that the machine had applications beyond pure calculation.",
      achievement: "Published the first algorithm intended to be carried out by such a machine."
    }
  ];

  return (
    <div className="flex flex-col items-center justify-start py-12 px-4 w-full animate-in fade-in zoom-in duration-500">
      
      <div className="text-center max-w-3xl mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
          Great <span className="text-primary">Scholars</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          At RK Consultancy, we believe that ordinary students can achieve extraordinary global impact. Explore the educational journeys of history's greatest minds to find your inspiration.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-6xl">
        {scholars.map((scholar, index) => (
          <div key={index} className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col sm:flex-row group">
            
            <div className="sm:w-2/5 h-64 sm:h-auto overflow-hidden relative bg-gray-100 flex items-center justify-center">
              <img 
                src={scholar.image} 
                alt={scholar.name} 
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 sepia-[.3] group-hover:sepia-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent sm:bg-gradient-to-r"></div>
              <div className="absolute bottom-4 left-4 sm:hidden">
                <h3 className="text-2xl font-bold text-white">{scholar.name}</h3>
                <p className="text-amber-400 font-semibold">{scholar.title}</p>
              </div>
            </div>

            <div className="p-6 sm:w-3/5 flex flex-col justify-between">
              <div>
                <div className="hidden sm:block mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">{scholar.name}</h3>
                  <p className="text-secondary font-bold tracking-wide text-sm uppercase mt-1">{scholar.title}</p>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm italic mb-6 relative">
                  <Quote size={32} className="absolute -top-3 -left-2 text-primary/10 rotate-180" />
                  <span className="relative z-10 block pl-4">{scholar.description}</span>
                </p>
              </div>

              <div className="space-y-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-start">
                  <BookOpen className="text-primary mr-3 shrink-0" size={18} />
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Alma Mater</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{scholar.education}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Award className="text-amber-500 mr-3 shrink-0" size={18} />
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Legacy</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{scholar.achievement}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
