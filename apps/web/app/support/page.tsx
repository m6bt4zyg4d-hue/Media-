import { SupportDashboard } from '../../components/Dashboards';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { Shell } from '../../components/Shell';
export default function SupportPage() { return <Shell title="Support"><header className="x-sticky-header"><h1>Support</h1><p>Ticket queue and account help.</p></header><ProtectedRoute><SupportDashboard /></ProtectedRoute></Shell>; }
