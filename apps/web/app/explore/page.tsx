import { Search } from 'lucide-react';
import { demoFeed } from '@media/api';
import { PostList } from '../../components/Feed';
import { Shell } from '../../components/Shell';

export default function ExplorePage() {
  return (
    <Shell title="Explore">
      <header className="x-sticky-header x-search-header"><label className="x-search in-main"><Search size={19} /><input placeholder="Search" /></label></header>
      <section className="x-section-block">
        <h2>Trends for you</h2>
        {demoFeed.trendingHashtags.map((tag, index) => <a className="x-trend-row" href={`/explore?q=${encodeURIComponent(tag)}`} key={tag}><span>Trending · Social</span><strong>{tag}</strong><small>{(91 - index * 8).toLocaleString()}K posts</small></a>)}
      </section>
      <PostList />
    </Shell>
  );
}
