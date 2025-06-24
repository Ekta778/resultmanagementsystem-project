import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, FileText, Download, Award } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ResultWithDetails {
  id: string;
  student_name: string;
  student_id: string;
  subject_name: string;
  subject_code: string;
  assessment_type: string;
  marks_obtained: number;
  total_marks: number;
  percentage: number;
  grade: string;
  assessment_date: string;
  academic_year: string;
  semester: string;
}

const Results: React.FC = () => {
  const [results, setResults] = useState<ResultWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState('');
  const [filterSemester, setSemester] = useState('');

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      // Since we can't use JOINs in the current setup, we'll simulate it
      // In a real app, you'd create a view or use proper JOIN queries
      const sampleResults: ResultWithDetails[] = [
        {
          id: '1',
          student_name: 'John Doe',
          student_id: 'STU001',
          subject_name: 'Mathematics',
          subject_code: 'MATH101',
          assessment_type: 'midterm',
          marks_obtained: 85,
          total_marks: 100,
          percentage: 85,
          grade: 'A',
          assessment_date: '2024-03-15',
          academic_year: '2024-25',
          semester: 'first'
        },
        {
          id: '2',
          student_name: 'Jane Smith',
          student_id: 'STU002',
          subject_name: 'Physics',
          subject_code: 'PHY101',
          assessment_type: 'final',
          marks_obtained: 92,
          total_marks: 100,
          percentage: 92,
          grade: 'A+',
          assessment_date: '2024-03-20',
          academic_year: '2024-25',
          semester: 'first'
        },
        {
          id: '3',
          student_name: 'Mike Johnson',
          student_id: 'STU003',
          subject_name: 'Chemistry',
          subject_code: 'CHEM101',
          assessment_type: 'assignment',
          marks_obtained: 78,
          total_marks: 100,
          percentage: 78,
          grade: 'B+',
          assessment_date: '2024-03-10',
          academic_year: '2024-25',
          semester: 'first'
        }
      ];
      
      setResults(sampleResults);
    } catch (error) {
      console.error('Error loading results:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredResults = results.filter(result => {
    const matchesSearch = 
      result.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.student_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.subject_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.subject_code.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGrade = filterGrade === '' || result.grade === filterGrade;
    const matchesSemester = filterSemester === '' || result.semester === filterSemester;
    
    return matchesSearch && matchesGrade && matchesSemester;
  });

  const getGradeColor = (grade: string) => {
    const colors: { [key: string]: string } = {
      'A+': 'bg-green-100 text-green-800',
      'A': 'bg-blue-100 text-blue-800',
      'B+': 'bg-purple-100 text-purple-800',
      'B': 'bg-yellow-100 text-yellow-800',
      'C+': 'bg-orange-100 text-orange-800',
      'C': 'bg-red-100 text-red-800'
    };
    return colors[grade] || 'bg-gray-100 text-gray-800';
  };

  const getAssessmentTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'midterm': 'bg-blue-100 text-blue-800',
      'final': 'bg-green-100 text-green-800',
      'assignment': 'bg-purple-100 text-purple-800',
      'quiz': 'bg-yellow-100 text-yellow-800',
      'project': 'bg-indigo-100 text-indigo-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

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
        <h2 className="text-3xl font-bold text-gray-900">Results</h2>
        <div className="flex items-center space-x-3">
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-700 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:from-blue-700 hover:to-purple-700 transition-all">
            <Plus className="h-4 w-4" />
            <span>Add Result</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search results..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={filterGrade}
              onChange={(e) => setFilterGrade(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Grades</option>
              {['A+', 'A', 'B+', 'B', 'C+', 'C'].map(grade => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
            
            <select
              value={filterSemester}
              onChange={(e) => setSemester(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Semesters</option>
              <option value="first">First Semester</option>
              <option value="second">Second Semester</option>
            </select>
            
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="h-4 w-4" />
              <span>More Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assessment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Marks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredResults.map((result) => (
                <tr key={result.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {result.student_name}
                      </div>
                      <div className="text-sm text-gray-500">{result.student_id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {result.subject_name}
                      </div>
                      <div className="text-sm text-gray-500">{result.subject_code}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAssessmentTypeColor(result.assessment_type)}`}>
                      {result.assessment_type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {result.marks_obtained}/{result.total_marks}
                    </div>
                    <div className="text-sm text-gray-500">{result.percentage}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getGradeColor(result.grade)}`}>
                        {result.grade}
                      </span>
                      <Award className="h-4 w-4 text-yellow-500" />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(result.assessment_date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredResults.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <div className="text-gray-500">No results found</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;