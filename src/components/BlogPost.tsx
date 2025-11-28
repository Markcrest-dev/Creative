import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import { ContentService, BlogPost as BlogPostType } from '../services/contentService';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const fetchedPost = await ContentService.getPostById(id);
        setPost(fetchedPost || null);
      } catch (error) {
        console.error('Failed to fetch post', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-orange-500 hover:underline">
            Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <article className="flex-grow">
        {/* Hero Image */}
        <div className="h-[400px] md:h-[500px] relative w-full overflow-hidden">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container mx-auto px-4 text-center text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider mb-6 inline-block">
                  {post.category}
                </span>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl mx-auto leading-tight">
                  {post.title}
                </h1>
                <div className="flex items-center justify-center space-x-6 text-sm md:text-base">
                  <div className="flex items-center">
                    <span className="font-bold mr-2">{post.author}</span>
                    <span className="opacity-75">{post.role}</span>
                  </div>
                  <span>•</span>
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm -mt-32 relative z-10">
            <div className="prose prose-lg max-w-none">
              {post.content ? (
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              ) : (
                <p className="lead text-xl text-gray-600 mb-8 font-medium">{post.excerpt}</p>
              )}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
              <Link to="/blog" className="text-orange-500 font-bold hover:underline">
                ← Back to Blog
              </Link>
              <div className="flex space-x-4">
                <button className="text-gray-400 hover:text-blue-500 transition-colors">
                  Share on Twitter
                </button>
                <button className="text-gray-400 hover:text-blue-700 transition-colors">
                  Share on LinkedIn
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
