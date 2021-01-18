import { IData } from "models/common";

class DataApi {
  clipboard: string = "";
  saveData: string = "";

  copy(data: IData): void {
    this.clipboard = data && JSON.stringify(data, null, 2);
  };

  updateSaveData(data: string): void {
    this.saveData = data;
  };

  getSaveData(): IData {
    return this.saveData ? JSON.parse(this.saveData) : {};
  };
}

export default DataApi;
