import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ApiService } from '../services/apiService';
import type { PortfolioProject } from '../types/api';
import Footer from './Footer';
import Navbar from './Navbar';
import Modal from './Modal';
import { SkeletonGrid } from './Skeleton';

const Portfolio = () => {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<PortfolioProject[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await ApiService.fetchPortfolioData();
        setProjects(data);
        setFilteredProjects(data);
      } catch (error) {
        console.error('Failed to load portfolio data', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    let result = projects;

    if (filter !== 'all') {
      result = result.filter((project) => project.category === filter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query)
      );
    }

    setFilteredProjects(result);
  }, [filter, searchQuery, projects]);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Design' },
    { id: 'app', label: 'Mobile Apps' },
    { id: 'branding', label: 'Branding' },
    { id: '3d', label: '3D & Motion' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 py-24 md:py-32 flex-grow">
        <div className="text-center mb-12">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Work
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            A collection of digital experiences crafted with passion and precision.
          </motion.p>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === cat.id
                      ? 'bg-black text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 rounded-full border border-gray-200 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <SkeletonGrid count={6} type="project" />
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
                  onClick={() => setSelectedProject(project)}
                >
                  <div
                    className="h-64 relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${project.color}20 0%, ${project.color}60 100%)`,
                    }}
                  >
                    <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {project.category}
                    </div>
                    {/* Decorative geometric shapes */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="w-48 h-48 transform rotate-45 transition-transform duration-700 group-hover:rotate-90 group-hover:scale-110"
                        style={{
                          backgroundColor: project.color,
                          opacity: 0.3,
                          boxShadow: `0 20px 60px ${project.color}40`,
                        }}
                      />
                    </div>
                    <div
                      className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full opacity-20"
                      style={{ backgroundColor: project.color }}
                    />
                    <div
                      className="absolute -top-10 -left-10 w-32 h-32 rounded-full opacity-20"
                      style={{ backgroundColor: project.color }}
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-orange-500 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>

                    {/* Instructor Info */}
                    {project.instructor && (
                      <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
                        <img
                          src={project.instructor.avatar}
                          alt={project.instructor.name}
                          className="w-10 h-10 rounded-full mr-3 bg-gray-200"
                          loading="lazy"
                        />
                        <div>
                          <p className="text-sm font-bold text-gray-900">
                            {project.instructor.name}
                          </p>
                          <p className="text-xs text-gray-500">{project.instructor.role}</p>
                        </div>
                      </div>
                    )}

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.results?.slice(0, 2).map((result, i) => (
                        <span
                          key={i}
                          className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-md border border-green-100"
                        >
                          📈 {result}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <Footer />

      {/* Project Detail Modal */}
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title || ''}
      >
        {selectedProject && (
          <div className="space-y-6">
            <div
              className="h-64 rounded-xl overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${selectedProject.color}20 0%, ${selectedProject.color}60 100%)`,
              }}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <div
                  className="w-56 h-56 transform rotate-45"
                  style={{
                    backgroundColor: selectedProject.color,
                    opacity: 0.4,
                    boxShadow: `0 25px 70px ${selectedProject.color}50`,
                  }}
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">About the Project</h3>
              <p className="text-gray-600">{selectedProject.description}</p>
            </div>

            {selectedProject.instructor && (
              <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-4">
                <img
                  src={selectedProject.instructor.avatar}
                  alt={selectedProject.instructor.name}
                  className="w-16 h-16 rounded-full bg-gray-200"
                  loading="lazy"
                />
                <div>
                  <p className="font-bold text-lg">{selectedProject.instructor.name}</p>
                  <p className="text-gray-600">{selectedProject.instructor.role}</p>
                  <p className="text-sm text-gray-500 mt-1">{selectedProject.instructor.bio}</p>
                </div>
              </div>
            )}

            <div>
              <h3 className="text-xl font-bold mb-2">Key Results</h3>
              <ul className="space-y-2">
                {selectedProject.results?.map((result, i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2">✓</span>
                    {result}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4 pt-4">
              <button className="flex-1 bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors">
                View Live Site
              </button>
              <button className="flex-1 border border-gray-300 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors">
                Case Study
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Portfolio;
