import { ChangeEvent, useContext, useMemo, useState } from "react";
import styled from "styled-components";
import { Button, Input, Tooltip, message } from "antd";
import { CopyTwoTone, EditTwoTone } from "@ant-design/icons";

import { DataContext } from "../Contexts";
import DataApi from "../dataApi/dataApi";
import { IDataQuery } from "../models/common";

const CollectionData = styled(
  ({
    dataQuery,
    collectionData,
    editable = false,
    ...props
  }: {
    dataQuery: IDataQuery;
    collectionData?: any;
    editable?: boolean;
  }): JSX.Element => {
    const [textarea, setTextArea] = useState("");
    const { dataApi } = useContext(DataContext) as { dataApi: DataApi };

    const dataString = useMemo(
      () => (collectionData ? JSON.stringify(collectionData, null, 2) : ""),
      [collectionData]
    );

    const onChangeTextarea = ({
      target: { value },
    }: ChangeEvent<HTMLTextAreaElement>): void => {
      setTextArea(value);
      dataApi.updateSaveData(value);
    };

    const copy = (): void => {
      if (!dataString) return;

      dataApi.copy(collectionData);
  
      const el = document.createElement("textarea");
      el.value = dataString;
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

    const paste = () => {
      setTextArea(dataApi.clipboard);
      dataApi.updateSaveData(dataApi.clipboard);
    };

    const onManualPaste = (ev: React.ClipboardEvent) => {
      const data = ev.clipboardData.getData("text");
      setTextArea(data);
      dataApi.updateSaveData(data);
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
          {!editable && dataString && (
            <Tooltip title="copy">
              <Button type="text" icon={<CopyTwoTone />} onClick={copy} />
            </Tooltip>
          )}
          {editable && (
            <Tooltip title="paste">
              <Button type="text" icon={<EditTwoTone />} onClick={paste} />
            </Tooltip>
          )}
        </div>
        {editable ? (
          <Input.TextArea
            rows={10}
            value={textarea}
            onChange={onChangeTextarea}
            onPaste={onManualPaste}
          />
        ) : (
          <pre className="code-block">{dataString}</pre>
        )}
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
