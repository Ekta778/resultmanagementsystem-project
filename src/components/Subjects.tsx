import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, BookOpen } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Subject = Database['public']['Tables']['subjects']['Row'];

const Subjects: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    try {
      const { data, error } = await supabase
        .from('subjects')
        .select('*')
        .order('subject_code', { ascending: true });

      if (error) throw error;
      setSubjects(data || []);
    } catch (error) {
      console.error('Error loading subjects:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSubjects = subjects.filter(subject =>
    subject.subject_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.subject_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (subject.teacher_name && subject.teacher_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
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
        <h2 className="text-3xl font-bold text-gray-900">Subjects</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:from-blue-700 hover:to-purple-700 transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>Add Subject</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search subjects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubjects.map((subject) => (
          <div key={subject.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{subject.subject_name}</h3>
                  <p className="text-sm text-gray-500">{subject.subject_code}</p>
                </div>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(subject.status)}`}>
                {subject.status}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Class Level:</span>
                <span className="text-gray-900">Grade {subject.class_level}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Credits:</span>
                <span className="text-gray-900">{subject.credits}</span>
              </div>
              {subject.teacher_name && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Teacher:</span>
                  <span className="text-gray-900">{subject.teacher_name}</span>
                </div>
              )}
            </div>
            
            {subject.description && (
              <p className="text-sm text-gray-600 mb-4">{subject.description}</p>
            )}
            
            <div className="flex items-center justify-end space-x-2 pt-4 border-t border-gray-200">
              <button className="text-indigo-600 hover:text-indigo-900 p-1">
                <Edit className="h-4 w-4" />
              </button>
              <button className="text-red-600 hover:text-red-900 p-1">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredSubjects.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <div className="text-gray-500">No subjects found</div>
        </div>
      )}
    </div>
  );
};

export default Subjects;