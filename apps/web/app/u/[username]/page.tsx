import { CalendarDays, Flag, MoreHorizontal, VolumeX } from 'lucide-react';
import { demoFeed } from '@media/api';
import { PostList } from '../../../components/Feed';
import { Shell } from '../../../components/Shell';

export default function PublicProfilePage({ params }: { params: { username: string } }) {
  const profile = demoFeed.posts.find((post) => post.author.username === params.username)?.author ?? demoFeed.posts[0].author;
  return (
    <Shell title={profile.displayName}>
      <header className="x-sticky-header"><h1>{profile.displayName}</h1><p>{profile.postsCount.toLocaleString()} posts</p></header>
      <section className="x-profile">
        <div className="x-profile-banner" style={profile.bannerUrl ? { backgroundImage: `url(${profile.bannerUrl})` } : undefined} />
        <div className="x-profile-body">
          <div className="x-profile-topline">
            {profile.avatarUrl ? <img className="x-profile-avatar" src={profile.avatarUrl} alt="" /> : <span className="x-profile-avatar" />}
            <div className="x-profile-actions"><a className="x-round-button" href={`/auth?next=/u/${profile.username}`}><MoreHorizontal size={20} /></a><a className="x-round-button" href={`/auth?next=/u/${profile.username}`}><VolumeX size={20} /></a><a className="x-round-button" href={`/auth?next=/u/${profile.username}`}><Flag size={20} /></a><a className="x-follow-cta" href={`/auth?next=/u/${profile.username}`}>Follow</a></div>
          </div>
          <h2>{profile.displayName} {profile.verified && <span className="x-verified">✓</span>}</h2>
          <p className="x-handle">@{profile.username}</p>
          <p className="x-bio">{profile.bio}</p>
          <div className="x-profile-meta"><span><CalendarDays size={16} /> Joined June 2026</span></div>
          <div className="x-profile-stats"><a><strong>{profile.followingCount.toLocaleString()}</strong> Following</a><a><strong>{profile.followersCount.toLocaleString()}</strong> Followers</a></div>
        </div>
        <nav className="x-profile-tabs"><a className="is-selected" href="#posts">Posts</a><a href="#replies">Replies</a><a href="#highlights">Highlights</a><a href="#media">Media</a><a href="#likes">Likes</a></nav>
      </section>
      <PostList />
    </Shell>
  );
}
