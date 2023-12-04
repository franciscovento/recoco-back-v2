import { TeacherClass } from '@/lib/interfaces/teacher-class.interface';
import { recocoApi } from '../recocoApi';
import { Comment } from '@/lib/interfaces/comment.interface';

const teacherClassModel = recocoApi.injectEndpoints({
  endpoints: (builder) => ({
    getTeacherClass: builder.query<
      TeacherClass,
      { teacher_id: string; course_id: string }
    >({
      query: ({ teacher_id, course_id }) =>
        `/teacher-class/${teacher_id}/${course_id}`,
      providesTags: (result, error, { teacher_id, course_id }) => [
        { type: 'TeacherClass', teacher_id, course_id },
      ],
    }),
    getTeacherClassByCourse: builder.query<TeacherClass[], number>({
      query: (id) => `/teacher-class/by-course/${id}`,
      providesTags: (result, error, id) => [{ type: 'TeacherClass', id }],
    }),
    addTeacherClass: builder.mutation<
      void,
      {
        teacher_name: string;
        last_name: string;
        course_id: number;
        teacher_class_name: string;
        faculty_id: number;
      }
    >({
      query: (teacherClass) => ({
        url: '/teacher-class',
        method: 'POST',
        body: teacherClass,
      }),
      invalidatesTags: ['TeacherClass'],
    }),
    deleteTeacherClass: builder.mutation<
      void,
      { teacher_id: string; course_id: string }
    >({
      query: ({ teacher_id, course_id }) => ({
        url: `/teacher-class/${teacher_id}/${course_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TeacherClass'],
    }),
    getTeacherClassComments: builder.query<
      Comment[],
      { teacher_id: string; course_id: string }
    >({
      query: ({ teacher_id, course_id }) =>
        `/teacher-class/${teacher_id}/${course_id}/comments`,
      providesTags: (result, error, { teacher_id, course_id }) => [
        'Comment',
        { type: 'TeacherClass', teacher_id, course_id },
      ],
    }),
  }),
  overrideExisting: false,
});

export const { useGetTeacherClassByCourseQuery, useAddTeacherClassMutation } =
  teacherClassModel;
