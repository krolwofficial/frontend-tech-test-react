import React from "react";
import { PostWithAuthorAndImages } from "../../../api/types";
/* Here I would add aliases paths to TS config, like "@api/types' */

import fetchPostsWithAuthorAndImages from "../../services/postService";

export default function TaskOne() {
  const [posts, setPosts] = React.useState<PostWithAuthorAndImages[] | null>(
    null
  );

  React.useEffect(() => {
    fetchPostsWithAuthorAndImages().then((fetchedPosts) =>
      setPosts(fetchedPosts)
    );
  }, []);

  if (!posts) return <div>Loading...</div>;

  return <>{JSON.stringify(posts)}</>;
}
