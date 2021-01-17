import styled from "styled-components";
import { Button, Tooltip, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";

import { IDataQuery } from "models/common";

const CollectionData = styled(
  ({
    dataQuery,
    collectionData,
    ...props
  }: {
    dataQuery: IDataQuery;
    collectionData: any;
  }): JSX.Element => {
    const copy = () => {
      if (!collectionData) return;

      const str = JSON.stringify(collectionData, null, 2);

      const el = document.createElement("textarea");
      el.value = str;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);

      const selection = document.getSelection() as Selection;
      const selected =
        selection.rangeCount > 0 ? selection.getRangeAt(0) : false;
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);

      if (selected) {
        selection.removeAllRanges();
        selection.addRange(selected);
      }

      message.success("Copied data to clipboard");
    };

    return (
      <section className="collection-data" {...props}>
        <div className="collection-data-row">
          <p>
            {dataQuery.collectionKey}
            {dataQuery.collectionKey ? "/" : ""}
            {dataQuery.collectionValue}
            {dataQuery.subCollectionKey ? "/" : ""}
            {dataQuery.subCollectionKey}
            {dataQuery.subCollectionKey ? "/" : ""}
            {dataQuery.subCollectionValue}
          </p>
          <Tooltip title="copy">
            <Button type="primary" icon={<CopyOutlined />} onClick={copy} />
          </Tooltip>
        </div>
        <pre className="code-block">
          {collectionData && JSON.stringify(collectionData, null, 2)}
        </pre>
      </section>
    );
  }
)`
  margin: 1rem 0;
  padding: 1rem;
  background-color: rgba(250, 250, 250);

  .collection-data-row {
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .code-block {
    white-space: pre-wrap;
  }
`;

export default CollectionData;
