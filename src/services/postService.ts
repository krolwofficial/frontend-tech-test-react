import { PostWithAuthorAndImages } from "../../api/types";
/* I would think about moving types outside the api, to the src folder */
/* If the API is ours it is not big deal, but if it is 3rd party provider, it wont meet safety-first design */

async function fetchPostsWithAuthorAndImages(): Promise<
  PostWithAuthorAndImages[]
> {
  const response = await fetch(process.env.REACT_APP_API_URL + "posts");

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  let data = await response.json();

  if (Array.isArray(data)) {
    const promises = data.map(async (post) => {
      if ("images" in post) {
        const imagePromises = post.images.map(async (imageId: string) => {
          const imageResponse = await fetch(
            process.env.REACT_APP_API_URL + `images/${imageId}`
          );
          return imageResponse.json();
        });

        const images = await Promise.all(imagePromises);
        post.images = images;
      }

      if ("authors" in post) {
        const authorPromises = post.authors.map(async (authorId: string) => {
          const authorResponse = await fetch(
            process.env.REACT_APP_API_URL + `authors/${authorId}`
          );
          return authorResponse.json();
        });

        const authors = await Promise.all(authorPromises);
        post.authors = authors;
      }

      return post;
    });

    data = await Promise.all(promises);
  }

  return data;
}

/* I kept the naming convention form Type, but I will suggest fetchPostsWithAuthorsAndImage */
export default fetchPostsWithAuthorAndImages;
