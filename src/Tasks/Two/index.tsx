import React from "react";
import { Post } from "../../../api/types";
import useFetch from "../../utils/hooks/useFetch";
import Card from "../../Components/Card";
import "./grid.scss"; /* I imported it gere, but I would probably create own Grid Rows components */

export default function TaskTwo() {
  const { data, loading, error } = useFetch<Post[]>("posts");
  /* Here I decided to make 3 different API requests, than one as in task one */
  /* The implementation of the one endpoint will be easier, but it will make UI slow */
  /* Thanks to making only /posts request we already can display for users Cards, and inside they will call its /images / and authors */

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid">
      {/* I assume data array normally will be very long, rendering all posts at
      once could cause performance issues. We could use react-window or
      react-virtualized to only render only currently visible items */}
      {/* Also, the images are HUGE, we should do something about it. Maybe Responsive Images approach*/}
      {data &&
        data.map(
          ({ id, title, content, authors, publishDate, images }: Post) => (
            <Card
              key={id}
              id={id}
              title={title}
              content={content}
              authors={authors}
              publishDate={publishDate}
              images={images}
            />
          )
        )}
    </div>
  );
}
