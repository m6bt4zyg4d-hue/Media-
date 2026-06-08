import { Image as ImageIcon, MoreHorizontal } from 'lucide-react';
import { demoFeed } from '@media/api';
import type { MediaAsset, Post } from '@media/types';
import { CreatePostForm, PostActions } from './SocialActions';

export function TimelineTabs() {
  return (
    <div className="x-timeline-tabs" role="tablist" aria-label="Timeline filters">
      <a className="is-selected" href="#for-you">For you</a>
      <a href="#following">Following</a>
    </div>
  );
}

export function StoryRail() {
  return null;
}

export function Composer() {
  return <CreatePostForm />;
}

function MediaTile({ media }: { media: MediaAsset }) {
  if (media.type === 'video') return <video className="x-post-media" src={media.url} controls playsInline preload="metadata" />;
  return <a href={media.url} target="_blank" rel="noreferrer"><img className="x-post-media" src={media.url} alt={media.altText ?? ''} /></a>;
}

function PostCard({ post }: { post: Post }) {
  return (
    <article className="x-post" id={`post-${post.id}`}>
      <a href={`/u/${post.author.username}`} className="x-post-avatar-link" aria-label={`${post.author.displayName} profile`}>
        {post.author.avatarUrl ? <img className="x-avatar" src={post.author.avatarUrl} alt="" /> : <span className="x-avatar" />}
      </a>
      <div className="x-post-content">
        <header className="x-post-header">
          <div className="x-post-byline">
            <a href={`/u/${post.author.username}`}><strong>{post.author.displayName}</strong></a>
            {post.author.verified && <span className="x-verified">✓</span>}
            <span>@{post.author.username}</span>
            <span>·</span>
            <time>{new Date(post.createdAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</time>
          </div>
          <button className="x-icon-button" aria-label="More post actions"><MoreHorizontal size={19} /></button>
        </header>
        {post.body && <p className="x-post-text">{post.body}</p>}
        {post.media.length > 0 && (
          <div className={post.media.length > 1 ? 'x-media-grid' : 'x-media-single'}>
            {post.media.map((media) => <MediaTile key={media.id} media={media} />)}
          </div>
        )}
        {post.media.length === 0 && post.type !== 'text' && <div className="x-empty-media"><ImageIcon size={20} /> Media unavailable</div>}
        <PostActions post={post} />
      </div>
    </article>
  );
}

export function PostList() {
  return <>{demoFeed.posts.map((post) => <PostCard key={post.id} post={post} />)}</>;
}
