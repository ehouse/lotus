
export interface IJSONContent {
    [index: string]: string
}
  
export interface IJSONSidecar {
    [index: string]: MetaData
}
  
interface MetaData {
    Title: string;
    Author: string;
    Date: string;
}