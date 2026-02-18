import { MOCK_SUBJECTS } from "@/constants/mock-data";

import { createSimpleRestDataProvider } from "@refinedev/rest/simple-rest";

import { API_URL } from "./constants";
import {
  BaseRecord,
  DataProvider,
  GetListParams,
  GetListResponse,
} from "@refinedev/core";

export const { dataProvider, kyInstance } = createSimpleRestDataProvider({
  apiURL: API_URL,
});

export const dataProvider2: DataProvider = {
  getList: async <TData extends BaseRecord = BaseRecord>({
    resource,
  }: GetListParams): Promise<GetListResponse<TData>> => {
    if (resource !== "subjects") {
      return { data: [] as TData[], total: 0 };
    }
    return {
      data: MOCK_SUBJECTS as unknown as TData[],
      total: MOCK_SUBJECTS.length,
    };
  },
  getOne: async () => {
    throw new Error("Method not implemented in mock.");
  },
  create: async () => {
    throw new Error("Method not implemented in mock.");
  },
  update: async () => {
    throw new Error("Method not implemented in mock.");
  },
  deleteOne: async () => {
    throw new Error("Method not implemented in mock.");
  },
  getApiUrl: () => "",
};
