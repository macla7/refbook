import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="text-3xl font-bold">Hello world!</h1>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Just making some adjustments, WOOORK!!!!
      </h1>

      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
