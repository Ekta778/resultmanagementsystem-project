import React, { useEffect, useState } from 'react';
import { Users, BookOpen, FileText, TrendingUp, Award, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { supabase } from '../lib/supabase';

interface DashboardStats {
  totalStudents: number;
  totalSubjects: number;
  totalResults: number;
  averageGrade: string;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalSubjects: 0,
    totalResults: 0,
    averageGrade: 'N/A'
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [studentsResult, subjectsResult, resultsResult] = await Promise.all([
        supabase.from('students').select('*', { count: 'exact' }),
        supabase.from('subjects').select('*', { count: 'exact' }),
        supabase.from('results').select('*', { count: 'exact' })
      ]);

      setStats({
        totalStudents: studentsResult.count || 0,
        totalSubjects: subjectsResult.count || 0,
        totalResults: resultsResult.count || 0,
        averageGrade: 'A-'
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const gradeDistribution = [
    { name: 'A+', value: 15, color: '#10B981' },
    { name: 'A', value: 25, color: '#3B82F6' },
    { name: 'B+', value: 20, color: '#8B5CF6' },
    { name: 'B', value: 18, color: '#F59E0B' },
    { name: 'C+', value: 12, color: '#EF4444' },
    { name: 'C', value: 10, color: '#6B7280' }
  ];

  const monthlyResults = [
    { month: 'Jan', results: 45 },
    { month: 'Feb', results: 52 },
    { month: 'Mar', results: 48 },
    { month: 'Apr', results: 61 },
    { month: 'May', results: 55 },
    { month: 'Jun', results: 67 }
  ];

  const statCards = [
    {
      title: 'Total Students',
      value: stats.totalStudents,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Active Subjects',
      value: stats.totalSubjects,
      icon: BookOpen,
      color: 'bg-emerald-500',
      change: '+8%'
    },
    {
      title: 'Results Recorded',
      value: stats.totalResults,
      icon: FileText,
      color: 'bg-purple-500',
      change: '+23%'
    },
    {
      title: 'Average Grade',
      value: stats.averageGrade,
      icon: Award,
      color: 'bg-amber-500',
      change: '+0.2'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>Academic Year 2024-25</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
                  <p className="text-sm text-emerald-600 mt-1">{card.change} from last month</p>
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Results Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Results</h3>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyResults}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="results" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Grade Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Grade Distribution</h3>
            <Award className="h-5 w-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={gradeDistribution}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {gradeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'New result added for Math - Grade 10', time: '2 hours ago', type: 'result' },
            { action: 'Student John Doe enrolled in Physics', time: '4 hours ago', type: 'enrollment' },
            { action: 'Subject Chemistry updated', time: '1 day ago', type: 'subject' },
            { action: 'Bulk results imported for Grade 12', time: '2 days ago', type: 'import' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;