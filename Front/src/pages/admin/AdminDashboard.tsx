import HeaderAdminDashboard from "../../components/admin/HeaderAdminDashboard";
import ResumeDashboard from "../../components/admin/ResumeDashboard";
import QuickActions from "../../components/admin/QuickActions";
import "./AdminDashboard.css"

export default function AdminDashboard() {
    return(
        <main className="admin-dashboard-page">
            <HeaderAdminDashboard/>
            <ResumeDashboard/>
            <QuickActions/>
        </main>
    );
}