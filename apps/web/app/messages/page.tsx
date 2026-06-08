import { MessagesPanel } from '../../components/Dashboards';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { Shell } from '../../components/Shell';
export default function MessagesPage() { return <Shell title="Messages"><header className="x-sticky-header"><h1>Messages</h1></header><ProtectedRoute><MessagesPanel /></ProtectedRoute></Shell>; }
