import { Composer, PostList, TimelineTabs } from '../components/Feed';
import { Shell } from '../components/Shell';

export default function HomePage() {
  return (
    <Shell title="Home timeline">
      <header className="x-sticky-header"><h1>Home</h1></header>
      <TimelineTabs />
      <Composer />
      <PostList />
    </Shell>
  );
}
