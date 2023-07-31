import React, { useEffect, useState } from "react";
import "./documents.css";
import store from "../../../store/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import Document from "./document/document";

const Documents = observer(() => {
  const [isActive, setActive] = useState(true);
  const [nextTen, setNextTen] = useState(10);

  useEffect(() => {
    if (nextTen >= store.IDs.length) {
      setActive(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextTen]);

  useEffect(() => {
    setActive(false);
    if (store.IDs[0] !== undefined) {
      if (store.IDs.length <= 10) {
        store.getFirstDocuments();
        setActive(false);
        return;
      } else {
        let next = store.IDs.slice(0, nextTen);
        store.getNextDocuments(next);
        setActive(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.IDs]);

  const showNextTen = () => {
    let next = store.IDs.slice(nextTen, nextTen + 10);
    store.getNextDocuments(next);
    setNextTen(nextTen + 10);
  };

  if (!store.document) {
    setActive(false);
    return (
      <p className="search-result__error search-result-error__info">
        Что-то пошло не так :( <br />
        Попробуйте <Link to="/search">изменить параметры поиска</Link>
      </p>
    );
  }

  return (
    <div className="documents-wrapper">
      <h3 className="summary-title documents-title">Список документов</h3>
      <div className="documents">
        {store.document &&
          store.document.map((el) => (
            <Document
              issueDate={el.ok.issueDate
                .substring(0, 10)
                .split("-")
                .join(".")
                .split(".")
                .reverse()
                .join(".")}
              source={el.ok.source.name}
              title={el.ok.title.text}
              isTechNews={el.ok.attributes.isTechNews}
              isAnnouncement={el.ok.attributes.isAnnouncement}
              isDigest={el.ok.attributes.isDigest}
              content={el.ok.content.markup}
              link={el.ok.url}
              wordCount={el.ok.attributes.wordCount}
            />
          ))}
      </div>
      {store.isDocumentLoading ? (
        <button disabled className="document-button__active">
          <div className="lds-ellipsis search-loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </button>
      ) : (
        <button
          className={isActive ? "document-button__active" : "document-disabled"}
          onClick={showNextTen}
        >
          Показать больше
        </button>
      )}
    </div>
  );
});

export default Documents;
