export interface Testimonial {
  id: string;
  authorId: string;
  authorName: string; // ✅ Store the author's name at creation
  subjectUserId: string;
  subjectUserName: string; // ✅ Store the subject user’s name at creation
  message: string;
  authorPostion: string;
  authorConnection: string;
  authorWorkplace: string;
}
