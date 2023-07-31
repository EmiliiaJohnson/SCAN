import React from "react";
import "./document.css";
import { Link } from "react-router-dom";
import mock from "../../../../assets/images/mock-img.svg";

const Document = (props) => {
  let xmlImg = "";
  if (props.content.match(/https?:\/\/\S+"/g) === null) {
    xmlImg = mock;
  } else {
    xmlImg = props.content
      .match(/https?:\/\/\S+"/g)
      .toString()
      .replace('"', "");
  }

  return (
    <div className="document">
      <div className="document-top">
        <p className="issue-date">{props.issueDate}</p>
        <Link className="issue-date" to={props.link} target={"_blank"}>
          {props.source}
        </Link>
      </div>
      <div className="document__title-tag">
        <h3 className="document-title">{props.title}</h3>
        {props.isTechNews && (
          <span className="document-tag">Технические новости</span>
        )}
        {props.isAnnouncement && (
          <span className="document-tag announcement">Анонсы и события</span>
        )}
        {props.isDigest && (
          <span className="document-tag digest">Сводки новостей</span>
        )}
      </div>
      <img className="document-img" src={xmlImg} alt="" />
      <p className="document-content">
        {props.content
          .replace(/<.*?>/g, "")
          .replace(/;.*?;/g, "")
          .replace(/&.*?t/g, "")
          .replace(/s.*?;/g, "")
          .replace(/\?.*?\d/g, "")
          .replace(/\/.*?\s/g, "")
          .replace(/(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)/g, "")}
      </p>
      <div className="document-bottom">
        <Link className="document-link" to={props.link} target={"_blank"}>
          Читать в источнике
        </Link>
        <span className="issue-date">Слова: {props.wordCount}</span>
      </div>
    </div>
  );
};

export default Document;
