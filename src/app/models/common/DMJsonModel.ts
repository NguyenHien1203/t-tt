export interface DMJsonModel{
    id?:number;
    cap?:number;
    label:string;
    children:DMJsonModel[];
}