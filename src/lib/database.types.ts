export interface Database {
  public: {
    Tables: {
      students: {
        Row: {
          id: string;
          student_id: string;
          first_name: string;
          last_name: string;
          email: string;
          phone?: string;
          date_of_birth: string;
          class_level: string;
          section?: string;
          enrollment_date: string;
          status: 'active' | 'inactive' | 'graduated';
          avatar_url?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          first_name: string;
          last_name: string;
          email: string;
          phone?: string;
          date_of_birth: string;
          class_level: string;
          section?: string;
          enrollment_date: string;
          status?: 'active' | 'inactive' | 'graduated';
          avatar_url?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          student_id?: string;
          first_name?: string;
          last_name?: string;
          email?: string;
          phone?: string;
          date_of_birth?: string;
          class_level?: string;
          section?: string;
          enrollment_date?: string;
          status?: 'active' | 'inactive' | 'graduated';
          avatar_url?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      subjects: {
        Row: {
          id: string;
          subject_code: string;
          subject_name: string;
          description?: string;
          credits: number;
          class_level: string;
          teacher_name?: string;
          status: 'active' | 'inactive';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          subject_code: string;
          subject_name: string;
          description?: string;
          credits: number;
          class_level: string;
          teacher_name?: string;
          status?: 'active' | 'inactive';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          subject_code?: string;
          subject_name?: string;
          description?: string;
          credits?: number;
          class_level?: string;
          teacher_name?: string;
          status?: 'active' | 'inactive';
          created_at?: string;
          updated_at?: string;
        };
      };
      results: {
        Row: {
          id: string;
          student_id: string;
          subject_id: string;
          assessment_type: 'midterm' | 'final' | 'assignment' | 'quiz' | 'project';
          marks_obtained: number;
          total_marks: number;
          percentage: number;
          grade: string;
          remarks?: string;
          assessment_date: string;
          academic_year: string;
          semester: 'first' | 'second';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          subject_id: string;
          assessment_type: 'midterm' | 'final' | 'assignment' | 'quiz' | 'project';
          marks_obtained: number;
          total_marks: number;
          percentage: number;
          grade: string;
          remarks?: string;
          assessment_date: string;
          academic_year: string;
          semester: 'first' | 'second';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          student_id?: string;
          subject_id?: string;
          assessment_type?: 'midterm' | 'final' | 'assignment' | 'quiz' | 'project';
          marks_obtained?: number;
          total_marks?: number;
          percentage?: number;
          grade?: string;
          remarks?: string;
          assessment_date?: string;
          academic_year?: string;
          semester?: 'first' | 'second';
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}