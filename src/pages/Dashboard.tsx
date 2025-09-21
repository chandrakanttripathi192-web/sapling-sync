import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { FolderTree, MapPin, BarChart3, FileText, TrendingUp, Waves } from 'lucide-react';

interface DashboardStats {
  totalProjects: number;
  activeSites: number;
  recentReports: number;
  carbonCredits: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    activeSites: 0,
    recentReports: 0,
    carbonCredits: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch projects count
      const { count: projectsCount } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true });

      // Fetch sites count
      const { count: sitesCount } = await supabase
        .from('sites')
        .select('*', { count: 'exact', head: true });

      // Fetch recent reports count (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const { count: reportsCount } = await supabase
        .from('reports')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', thirtyDaysAgo.toISOString());

      // Fetch total verified carbon credits
      const { data: creditsData } = await supabase
        .from('reports')
        .select('carbon_credits_verified')
        .not('carbon_credits_verified', 'is', null);

      const totalCredits = creditsData?.reduce((sum, report) => {
        return sum + (parseFloat(report.carbon_credits_verified?.toString() || '0') || 0);
      }, 0) || 0;

      setStats({
        totalProjects: projectsCount || 0,
        activeSites: sitesCount || 0,
        recentReports: reportsCount || 0,
        carbonCredits: totalCredits,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Waves className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-8 bg-muted rounded w-1/2"></div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Waves className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        </div>
        <Badge variant="secondary" className="px-3 py-1">
          Blue Carbon MRV System
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderTree className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProjects}</div>
            <p className="text-xs text-muted-foreground">
              Active blue carbon initiatives
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monitoring Sites</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeSites}</div>
            <p className="text-xs text-muted-foreground">
              Mangroves, seagrass & salt marshes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.recentReports}</div>
            <p className="text-xs text-muted-foreground">
              Reports in the last 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Carbon Credits</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.carbonCredits.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">
              tCO2e verified
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to Blue Carbon MRV</CardTitle>
            <CardDescription>
              Your comprehensive system for monitoring, reporting, and verifying blue carbon ecosystems
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Key Features:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Project management and site monitoring</li>
                <li>• Data collection and analysis tools</li>
                <li>• Automated reporting and verification</li>
                <li>• Carbon credit calculation and tracking</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Get started with common tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-2">
              <button className="flex items-center space-x-2 text-sm text-left p-2 rounded hover:bg-accent">
                <FolderTree className="h-4 w-4" />
                <span>Create New Project</span>
              </button>
              <button className="flex items-center space-x-2 text-sm text-left p-2 rounded hover:bg-accent">
                <MapPin className="h-4 w-4" />
                <span>Add Monitoring Site</span>
              </button>
              <button className="flex items-center space-x-2 text-sm text-left p-2 rounded hover:bg-accent">
                <BarChart3 className="h-4 w-4" />
                <span>Record Monitoring Data</span>
              </button>
              <button className="flex items-center space-x-2 text-sm text-left p-2 rounded hover:bg-accent">
                <FileText className="h-4 w-4" />
                <span>Generate Report</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;