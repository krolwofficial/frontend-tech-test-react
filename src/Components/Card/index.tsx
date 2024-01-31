import React from "react";
import "./card.scss";
import useFetch from "../../utils/hooks/useFetch";
import { Author, Image, Post } from "../../../api/types";
import { Link } from "react-router-dom";
import formatDate from "../../utils/formatDate";

function Card({ id, title, content, authors, publishDate, images }: Post) {
  /* To make Card more generic I would add Card wrapper with useFetch'es.
  It will still keep the UX nice, but Card will be more atomic component.
  However for this task implementation I coded all here */

  const { data: authorsData } = useFetch<Author[]>(`authors`);
  const { data: imagesData } = useFetch<Image>(`images/${images[0]}`);
  const [author, setAuthor] = React.useState<Author[] | null>(null);

  React.useEffect(() => {
    const postAuthors =
      authorsData &&
      authorsData.filter((author: Author) =>
        authors.some((id: string) => id === author.id)
      );
    setAuthor(postAuthors);
  }, [authorsData, authors]);

  return (
    <div className="card__container">
      <img
        className="card__image"
        src={
          (imagesData && imagesData.path) || ""
        } /* we should add default image */
        alt=""
      />
      <h2 className="card__title">
        <Link to={`/posts/${id}`}>{title}</Link>
      </h2>

      <p className="card__content">{content}</p>
      <p className="card__authors">
        <span className="card__spacing">Author:</span>{" "}
        {/* this should be some util className or component  for spacing */}
        {author &&
          author.map((author: Author) => {
            return (
              <Link
                className="card__spacing"
                key={author.id}
                to={`/authors/${id}`}
              >
                {author.name}
              </Link>
            );
          })}
      </p>
      <p className="card__published">Published: {formatDate(publishDate)}</p>
    </div>
  );
}

export default Card;
