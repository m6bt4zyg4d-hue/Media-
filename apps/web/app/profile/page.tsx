import { CalendarDays, Link as LinkIcon, MapPin } from 'lucide-react';
import { currentProfile } from '@media/api';
import { PostList } from '../../components/Feed';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { Shell } from '../../components/Shell';

export default function ProfilePage() {
  return (
    <Shell title="Profile">
      <header className="x-sticky-header"><h1>{currentProfile.displayName}</h1><p>{currentProfile.postsCount.toLocaleString()} posts</p></header>
      <ProtectedRoute>
        <section className="x-profile">
          <div className="x-profile-banner" style={{ backgroundImage: `url(${currentProfile.bannerUrl})` }} />
          <div className="x-profile-body">
            <div className="x-profile-topline">
              <img className="x-profile-avatar" src={currentProfile.avatarUrl} alt="" />
              <a className="x-outline-button" href="/settings">Edit profile</a>
            </div>
            <h2>{currentProfile.displayName} {currentProfile.verified && <span className="x-verified">✓</span>}</h2>
            <p className="x-handle">@{currentProfile.username}</p>
            <p className="x-bio">{currentProfile.bio}</p>
            <div className="x-profile-meta"><span><MapPin size={16} /> Global</span><span><LinkIcon size={16} /> media.example</span><span><CalendarDays size={16} /> Joined June 2026</span></div>
            <div className="x-profile-stats"><a><strong>{currentProfile.followingCount.toLocaleString()}</strong> Following</a><a><strong>{currentProfile.followersCount.toLocaleString()}</strong> Followers</a></div>
          </div>
          <nav className="x-profile-tabs"><a className="is-selected" href="#posts">Posts</a><a href="#replies">Replies</a><a href="#highlights">Highlights</a><a href="#media">Media</a><a href="#likes">Likes</a></nav>
        </section>
        <PostList />
      </ProtectedRoute>
    </Shell>
  );
}
