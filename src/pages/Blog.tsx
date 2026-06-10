import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { blogPosts } from '@/lib/constants';

export default function Blog() {
  return (
    <>
      {/* Header */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-espresso pt-20">
        <div className="text-center content-max px-4">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-4">News & Updates</h1>
          <p className="text-text-muted text-lg">Stay updated with CityWest Hotel</p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-padding bg-espresso-light">
        <div className="content-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post, index) => (
              <article
                key={index}
                className="glass-panel hover:border-gold/30 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center gap-1.5 text-gold text-xs">
                    <Tag className="w-3 h-3" />
                    {post.category}
                  </span>
                </div>

                <h2 className="font-display text-xl sm:text-2xl text-white mb-3 group-hover:text-gold transition-colors">
                  {post.title}
                </h2>

                <p className="text-text-muted text-sm mb-4 line-clamp-3">{post.excerpt}</p>

                <div className="flex items-center justify-between pt-4 border-t border-glass-border">
                  <div className="flex items-center gap-4 text-text-muted text-xs">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <button className="text-gold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
