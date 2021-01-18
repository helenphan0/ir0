import { IData } from "models/common";

class DataApi {
  clipboard: string = "";

  copy(data: IData): void {
    this.clipboard = data && JSON.stringify(data, null, 2);
  }

  getClipboardJson(): IData {
    return this.clipboard ? JSON.parse(this.clipboard) : {};
  }
}

export default DataApi;
