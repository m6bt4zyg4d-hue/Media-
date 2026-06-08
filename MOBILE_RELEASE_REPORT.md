# Mobile pre-merge release report

## Auth/session verification

- **Empty login cannot succeed:** the mobile auth form validates that email is non-empty, contains `@`, and that password is at least six characters before `mobileRepository.signIn` is called. The shared repository also rejects empty/invalid email and missing passwords before calling Supabase password auth.
- **Empty signup cannot succeed:** the mobile auth form validates email, password, username, and display name before signup. It then checks username availability before calling Supabase signup. The shared repository repeats the same required-field validation before hitting Supabase.
- **Protected screens require a valid authenticated session:** the mobile app renders `AuthScreen` instead of Home/Search/Create/Activity/Profile unless a candidate session is confirmed with `supabase.auth.getUser()`. Invalid/stale sessions are cleared and signed out before protected tabs are shown.

## Features using real Supabase data

- Authentication: login, signup, logout, reset password, session persistence, and session validation.
- Profiles: authenticated profile loading, profile editing, avatar/banner URL persistence, bio/display name/username persistence, username availability checks, and the 30-day username-change rule.
- Feeds: For You feed from `post_feed`, Following feed from `following_feed`, profile feed from `post_feed`, and real hashtag trends from `trending_hashtags`.
- Posting: text posts, uploaded image/video media records, post-media joins, and feed refresh after posting.
- Engagement: like/unlike, comment replies, repost/unrepost, native share sheet, and backend-derived counts/flags.
- Search/explore: real profile search and post search.
- Activity: notifications and conversation list reads.
- Follows: follow/unfollow relationship checks and writes.

## Features still using placeholder data

- No visible mobile production feature intentionally uses fake/demo/scraped placeholder data.
- Empty arrays such as the initial feed state are loading-safe defaults only; users see loading, empty, or error states until Supabase returns real data.

## Features hidden because they are unfinished

- Camera capture.
- GIF picker.
- Polls.
- Live / Go Live.
- Drafts.
- Stories.
- Premium/subscriptions.
- Admin/debug tabs.

## Remaining App Store blockers

- A native EAS/TestFlight build still must be run against production Supabase credentials.
- The production Supabase project must have the current schema, RLS policies, storage bucket, and storage policies applied before media posting is release-safe.
- Camera, GIFs, polls, live, drafts, stories, premium, and admin/debug mobile surfaces should remain hidden until each has complete backend, permission, and end-to-end UX support.
- Existing workspace dependency audit warnings remain outside this mobile button/session verification pass and should be handled with planned dependency upgrades.
