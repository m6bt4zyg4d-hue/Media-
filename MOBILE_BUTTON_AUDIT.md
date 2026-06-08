# Mobile visible-button production audit

This audit covers every visible mobile button, tab, and post/profile action in `apps/mobile/App.tsx` after the X/Threads-style production pass. The production rule is: visible controls must perform a real Supabase-backed action or open a native platform action; unfinished controls are hidden.

## Implemented and visible

| Area | Button/tab/action | Production behavior |
| --- | --- | --- |
| Auth | Log in mode tab | Switches to login form only; no session bypass. |
| Auth | Sign up mode tab | Switches to signup form requiring email, password, username, and display name. |
| Auth | Reset mode tab | Switches to password-reset form requiring a valid email. |
| Auth | Log in | Validates email/password and calls Supabase password auth. |
| Auth | Create account | Validates email, password, username, display name, checks username availability, and calls Supabase signup. |
| Auth | Send reset email | Validates email and calls Supabase password reset. |
| Shell | Log out | Calls Supabase sign-out and returns to the auth gate. |
| Navigation | Home tab | Opens the protected authenticated home feed. |
| Navigation | Search tab | Opens real Supabase-backed user/post search. |
| Navigation | Create tab | Opens the protected composer. |
| Navigation | Activity tab | Opens real notifications and conversations, or safe empty states. |
| Navigation | Profile tab | Opens the authenticated user's real profile and profile feed. |
| Home | For You tab | Loads real posts from the Supabase `post_feed` view. |
| Home | Following tab | Loads real posts from the Supabase `following_feed` view. |
| Home/Search/Profile | Pull to refresh | Reloads the current Supabase data source. |
| Create post | Add media | Opens Expo ImagePicker for real image/video library selection, limited to four assets. |
| Create post | Post | Disabled until text or media exists; uploads media to Supabase storage when present and creates the post in Supabase. |
| Post | Comment/reply | Expands a real reply input; the Reply button writes to Supabase comments and is disabled for empty replies. |
| Post | Repost/unrepost | Toggles a real Supabase repost row and updates the visible count. |
| Post | Like/unlike | Toggles a real Supabase like row and updates the visible count. |
| Post | Share | Opens the native iOS/Android share sheet. |
| Search | Search input | Queries real profiles and posts; empty states replace fake trends. |
| Search users | Follow/following | Follows or unfollows real users through Supabase and hides itself for the current user. |
| Profile | Edit profile | Opens/closes the real profile edit form. |
| Profile | Save profile | Validates profile fields, enforces username availability and the 30-day username-change lock, then saves to Supabase. |

## Hidden from production UI

| Feature | Status | Reason |
| --- | --- | --- |
| Camera capture | Hidden | No production capture/review/upload flow is implemented; library upload remains supported. Camera permission/plugin were removed from Expo config. |
| GIF picker | Hidden | No backend-supported GIF provider or persistence model is wired. |
| Polls | Hidden | No poll tables, vote APIs, or results UI are wired. |
| Live / Go Live | Hidden | No mobile live creation flow is production-ready. |
| Drafts | Hidden | No local encrypted draft persistence or sync behavior is implemented. |
| Stories | Hidden | Not part of the current production bottom tabs. |
| Premium | Hidden | No subscription entitlement flow is implemented. |
| Admin/debug tabs | Hidden | Admin and debug surfaces are not exposed in the consumer mobile tab bar. |

## Remaining blockers

- Native TestFlight/App Store verification still requires an EAS build with production Supabase credentials and the deployed database schema/storage policies.
- Media posting requires the Supabase `media` bucket and table policies from the schema to exist in the target Supabase project.
- Camera, GIFs, polls, live, and drafts should stay hidden until their backend models, APIs, permissions, and end-to-end mobile UX are implemented.
