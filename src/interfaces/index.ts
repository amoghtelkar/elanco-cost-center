export interface IData {
  ConsumedQuantity: string;
  Cost: string;
  Date: string;
  InstanceId: string;
  Location: string;
  MeterCategory: string;
  ResourceGroup: string;
  ResourceLocation: string;
  ServiceName: string;
  Tags: {
    "app-name": string;
    "business-unit": string;
    environment: string;
  };
  UnitOfMeasure: string;
}
